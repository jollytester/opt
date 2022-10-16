import './App.css';

//Router
import {
    Routes,
    Route
} from "react-router-dom"

//pages
import Home from './Pages/Home'
import Account from './Pages/Account'
import Wrap from './Pages/Wrap'
import Migrate from './Pages/Migrate'

//components
import Header from './Components/Header'
import Loader from './Components/Loader'
import Footer from './Components/Footer'

//hooks
import {
    useState,
    useEffect,
    useCallback
} from 'react'
import {
    fromWei,
    toWei
} from './Utils/Utils'

function App() {
    const [page, setPage] = useState('')
    const [network, setNetwork] = useState(undefined)
    const [contractRebaser_V2, setContractRebaser_V2] = useState(undefined)
    const [contractRebaser_V3, setContractRebaser_V3] = useState(undefined)
    const [contractWrapper, setContractWrapper] = useState(undefined)
    const [contractMigration, setContractMigration] = useState(undefined)
    const [account, setAccount] = useState(undefined)
    const [balanceOPT2, setBalanceOPT2] = useState(undefined)
    const [balanceOPT3, setBalanceOPT3] = useState(undefined)
    const [balanceWOPT, setBalanceWOPT] = useState(undefined)
    const [burned, setBurned] = useState(undefined)
    const [price, setPrice] = useState(undefined)
    const [rate, setRate] = useState(undefined)
    const [supply, setSupply] = useState(undefined)
    const [approvedAmount, setApprovedAmount] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(undefined)
    const [swapState, setSwapState] = useState('none')
    const [approvedMigration, setApprovedMigration] = useState(0)

    //dimensions
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    window.addEventListener("load", function() {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', function(networkId) {
                console.log('chainChanged', networkId);
                window.location.reload()
            });
        } else {
            console.log("No web3 detected.")
        }
    });

    //handle window resize (continuously)
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    //get price
    const getPriceUsd = useCallback(async () => {
        fetch("https://api.dexscreener.com/latest/dex/pairs/polygon/0xcfeadf2671f85674c6377e2fdd2593985adfa8c5")
            .then((res) => res.json())
            .then((json) => {
                setPrice(json.pair.priceUsd)
                console.log('price is', json.pair.priceUsd)

                setTimeout(getPriceUsd, 30000)
            })
    }, [])

    useEffect(() => {
        getPriceUsd()
    }, [getPriceUsd])

    async function onConnect() {
        //req. accounts from web3 provider
        const _accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        //return if no account found
        if (!_accounts) {
            window.alert('[ERROR]: unable to connect: account not found');
            return
        }

        //get account
        const atAddress = _accounts[0]

        //save in state
        setAccount(atAddress)

        //get user data (balances)
        getUserData(atAddress)

        //debug
        console.log('connected to account', atAddress, 'on', network, 'network')
    }

    async function getContractData(atContractV2, atContractV3) {
        if (!atContractV2) {
            console.log('V2 contract not defined');
            return;
        }
        if (!atContractV2) {
            console.log('V3 contract not defined');
            return;
        }

        const rewY = await atContractV3.methods.rewardYield().call()
        const rate = rewY / 1000
        setRate(Number(rate))

        const supplyWei = await atContractV3.methods.totalSupply().call()
        const supply = Number(fromWei(supplyWei))
        setSupply(supply)

        const burnedWei_V2 = await atContractV2.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
        const burnedWei_V3 = await atContractV3.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
        const burnedEth_V2 = fromWei(burnedWei_V2)
        const burnedEth_V3 = fromWei(burnedWei_V3)

        const total = Number(burnedEth_V2) + Number(burnedEth_V3)
        //console.log('total is', total)
        //console.log('total is', typeof total)

        setBurned(total)
    }

    async function getUserData(user) {
        if (!user) {
            console.log('not defined: user');
            return;
        }

        const _balanceOPT2 = await getBalanceOf(user, contractRebaser_V2)
        const _balanceOPT3 = await getBalanceOf(user, contractRebaser_V3)
        const _balanceWOPT = await getBalanceOf(user, contractWrapper)

        setBalanceOPT2(_balanceOPT2)
        setBalanceOPT3(_balanceOPT3)
        setBalanceWOPT(_balanceWOPT)
    }

    async function getBalanceOf(user, atContract) {
        if (!user) {
            console.log('not defined: user');
            return;
        }
        if (!atContract) {
            console.log('not defined: atContract');
            return;
        }

        const wei = await atContract.methods.balanceOf(user).call()
        const bal = fromWei(wei)

        return bal
    }

    async function approve(amount) {
        //account
        if (!account) {
            window.alert('Please connect to MetaMask');
            return
        }
        if (!contractRebaser_V3) {
            console.log('not found: rebaser');
            return
        }
        if (!contractWrapper) {
            console.log('not found: wrapper');
            return
        }

        const _spender = contractWrapper._address
        const _amount = toWei(amount)

        //execute
        setSwapState('pending confirmation')
        await contractRebaser_V3.methods.approve(_spender, _amount)
            .send({
                from: account
            })
            .on('transactionHash', hash => {
                setSwapState('has hash')
            })
            .then(res => {
                console.log('success', res);
                setApprovedAmount(amount);
                setSwapState('none')
            })
            .catch(err => {
                console.log(err);
                setSwapState('none')
            })

        console.log('approve', _spender, 'to transfer', amount, 'OPT2 from user')
    }

    async function wrapTokens(amount) {
        //account
        if (!account) {
            window.alert('Please connect to MetaMask');
            return
        }
        if (!contractWrapper) {
            console.log('not found: wrapper');
            return
        }

        const _amount = toWei(amount)

        //execute
        setSwapState('pending confirmation')
        await contractWrapper.methods.wrap(_amount)
            .send({
                from: account
            })
            .on('transactionHash', hash => {
                setSwapState('has hash')
            })
            .then(res => {
                console.log('success', res);
                setApprovedAmount(0);
                setSwapState('none');
                getUserData(account);
            })
            .catch(err => {
                console.log(err);
                setSwapState('none')
            })

        console.log('wrap', amount, 'OPT2')
    }

    async function unwrapTokens(amount) {
        //account
        if (!account) {
            window.alert('Please connect to MetaMask');
            return
        }
        if (!contractWrapper) {
            console.log('not found: wrapper');
            return
        }

        const _amount = toWei(amount)

        //execute
        setSwapState('pending confirmation')
        await contractWrapper.methods.unwrap(_amount)
            .send({
                from: account
            })
            .on('transactionHash', hash => {
                setSwapState('has hash')
            })
            .then(res => {
                console.log('success', res);
                setSwapState('none');
                getUserData(account);
            })
            .catch(err => {
                console.log(err);
                setSwapState('none')
            })

        console.log('unwrap', amount, 'wOPT')
    }

    async function addToMetamask(tokenAddress, tokenSymbol) {

        if (!tokenAddress) {
            console.log('token address not defined');
            return
        }
        console.log('add address is', tokenAddress, 'and symbol is', tokenSymbol)

        const atAddress = tokenAddress
        const atSymbol = tokenSymbol
        const atDecimals = 18
        let tokenImage = 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg'

        if (tokenSymbol === 'OPT3') {
            tokenImage = 'https://i.ibb.co/fdrTKDq/tokenimage-OPT2-Copy.png'
        }
        if (tokenSymbol === 'wOPT') {
            tokenImage = 'https://i.ibb.co/pJN063t/tokenimage-WOPT-Copy.png'
        }

        try {
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: atAddress,
                        symbol: atSymbol,
                        decimals: atDecimals,
                        image: tokenImage
                    },
                },
            });

            if (wasAdded) {
                //console.log('Token was added')
            } else {
                //console.log('Failed to add token')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function approveMigration() {
        //account
        if (!account) {
            window.alert('Please connect to MetaMask');
            return
        }
        if (!contractRebaser_V2) {
            console.log('not found: rebaser');
            return
        }
        if (!contractMigration) {
            console.log('not found: migration contract');
            return
        }

        const _spender = contractMigration._address
        const _amount = await contractRebaser_V2.methods.balanceOf(account).call()

        //execute
        await contractRebaser_V2.methods.approve(_spender, _amount)
            .send({
                from: account
            })
            .then(res => {
                console.log('success', res);
                setApprovedMigration(_amount);
            })
            .catch(err => {
                console.log(err);
            })

        console.log('approve spender', _spender, 'to migrate amount', _amount)
    }

    async function migrate() {
        //account
        if (!account) {
            window.alert('Please connect to MetaMask');
            return
        }
        if (!contractMigration) {
            console.log('not found: migration contract');
            return
        }

        //execute
        await contractMigration.methods.migrate()
            .send({
                from: account
            })
            .then(res => {
                console.log('success', res);
                setApprovedMigration(0);
            })
            .catch(err => {
                console.log(err);
            })

        console.log('migrate')
    }

    return ( <
        div className = "App" > { /* LOADER */ } <
        Loader setNetwork = {
            setNetwork
        }
        getContractData = {
            getContractData
        }
        setContractRebaser_V2 = {
            setContractRebaser_V2
        }
        setContractRebaser_V3 = {
            setContractRebaser_V3
        }
        setContractWrapper = {
            setContractWrapper
        }
        setExchangeRate = {
            setExchangeRate
        }
        setContractMigration = {
            setContractMigration
        }
        />

        { /* HEADER */ } <
        Header page = {
            page
        }
        price = {
            price
        }
        dimensions = {
            dimensions
        }
        exchangeRate = {
            exchangeRate
        }
        />

        { /* PAGE */ } <
        Routes >
        <
        Route path = '/'
        element = { <
            Home
            setPage = {
                setPage
            }
            rate = {
                rate
            }
            dimensions = {
                dimensions
            }
            />
        }
        /> <
        Route path = 'account'
        element = { <
            Account
            setPage = {
                setPage
            }
            account = {
                account
            }
            onConnect = {
                onConnect
            }
            network = {
                network
            }
            price = {
                price
            }
            rate = {
                rate
            }
            supply = {
                supply
            }
            balanceOPT3 = {
                balanceOPT3
            }
            burned = {
                burned
            }
            dimensions = {
                dimensions
            }
            />
        }
        /> <
        Route path = 'wrap'
        element = { <
            Wrap
            setPage = {
                setPage
            }
            wrapTokens = {
                wrapTokens
            }
            unwrapTokens = {
                unwrapTokens
            }
            approve = {
                approve
            }
            approvedAmount = {
                approvedAmount
            }
            setApprovedAmount = {
                setApprovedAmount
            }
            balanceOPT3 = {
                balanceOPT3
            }
            balanceWOPT = {
                balanceWOPT
            }
            exchangeRate = {
                exchangeRate
            }
            swapState = {
                swapState
            }
            setSwapState = {
                setSwapState
            }
            addToMetamask = {
                addToMetamask
            }
            contractRebaser_V3 = {
                contractRebaser_V3
            }
            contractWrapper = {
                contractWrapper
            }
            dimensions = {
                dimensions
            }
            onConnect = {
                onConnect
            }
            account = {
                account
            }
            network = {
                network
            }
            />
        }
        /> <
        Route path = 'migrate'
        element = { <
            Migrate
            setPage = {
                setPage
            }
            dimensions = {
                dimensions
            }
            onConnect = {
                onConnect
            }
            account = {
                account
            }
            network = {
                network
            }
            balanceOPT2 = {
                balanceOPT2
            }
            approveMigration = {
                approveMigration
            }
            migrate = {
                migrate
            }
            approvedMigration = {
                approvedMigration
            }
            />
        }
        /> <
        /Routes>

        { /* FOOTER */ } <
        Footer dimensions = {
            dimensions
        }
        /> <
        /div>
    );
}

export default App;