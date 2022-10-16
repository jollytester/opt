import './Wrap.css'

//React
import {
    useEffect,
    useState
} from 'react'

//icons
import {
    Add,
    ArrowDownward
} from '@mui/icons-material'

//packages
import {
    Oval,
    Watch
} from 'react-loader-spinner'

//images
import iconMetamask from '../Images/MetaMask_Fox.png'
import tokenimage_OPT3 from '../Images/tokenimage_OPT3.svg'
import tokenimage_WOPT from '../Images/tokenimage_WOPT.svg'

//utils
import {
    isMobile,
    abbreviate
} from '../Utils/Utils'

export default function Wrap({
    wrapTokens,
    unwrapTokens,
    approve,
    approvedAmount,
    setApprovedAmount,
    balanceOPT3,
    balanceWOPT,
    exchangeRate,
    swapState,
    addToMetamask,
    contractRebaser_V3,
    contractWrapper,
    setPage,
    dimensions,
    onConnect,
    account,
    network
}) {
    //set page
    useEffect(() => {
        setPage('wrap')
    }, [setPage])

    //interface
    const [swapMode, setSwapMode] = useState('wrap')

    //input
    const [unwrapAmount, setUnwrapAmount] = useState('')
    const [approveAmount, setApproveAmount] = useState('')

    function toggleSwapMode() {
        switch (swapMode) {
            case 'wrap':
                setSwapMode('unwrap')
                break;
            case 'unwrap':
                setSwapMode('wrap')
                break;
            default:
                setSwapMode('wrap')
                break;
        }
    }

    function onValidateApprove(e) {
        const valid = document.getElementById('approveForm').reportValidity()
        e.preventDefault()
        e.stopPropagation()

        valid ? approve(approveAmount) : console.log('form validation failed')
    }

    function onValidateWrap(e) {
        const valid = document.getElementById('wrapForm').reportValidity()
        e.preventDefault()
        e.stopPropagation()

        valid ? wrapTokens(approvedAmount) : console.log('form validation failed')
    }

    function onValidateUnwrap(e) {
        const valid = document.getElementById('unwrapForm').reportValidity()
        e.preventDefault()
        e.stopPropagation()

        valid ? unwrapTokens(unwrapAmount) : console.log('form validation failed')
    }

    function element1For(state) {
        let element

        switch (state) {
            case 'none':
                element = <
                    button className = 'oversize'
                onClick = {
                        e => onValidateApprove(e)
                    } >
                    Enable OPT3 <
                    /button>
                break;
            case 'pending confirmation':
                element = <
                    button disabled className = 'oversize' >
                    Pending...
                    <
                    /button>
                break;
            case 'has hash':
                element = <
                    button disabled className = 'oversize' >
                    Mining...
                    <
                    /button>
                break;

            default:
                break;
        }

        return element
    }

    function element2For(state) {
        let element

        switch (state) {
            case 'none':
                element = <
                    button className = 'oversize'
                onClick = {
                        e => onValidateWrap(e)
                    } >
                    Wrap <
                    /button>
                break;
            case 'pending confirmation':
                element = <
                    button disabled className = 'oversize' >
                    Pending...
                    <
                    /button>
                break;
            case 'has hash':
                element = <
                    button disabled className = 'oversize' >
                    Mining...
                    <
                    /button>
                break;

            default:
                break;
        }

        return element
    }

    function element3For(state) {
        let element

        switch (state) {
            case 'none':
                element = <
                    button className = 'oversize'
                onClick = {
                        e => onValidateUnwrap(e)
                    } >
                    Unwrap <
                    /button>
                break;
            case 'pending confirmation':
                element = <
                    button disabled className = 'oversize' >
                    Pending...
                    <
                    /button>
                break;
            case 'has hash':
                element = <
                    button disabled className = 'oversize' >
                    Mining...
                    <
                    /button>
                break;

            default:
                break;
        }

        return element
    }

    function stepElementFor(state) {
        let element

        switch (state) {
            case 'none':
                element = <
                    div className = 'step step-active' >
                    <
                    h3 className = 'small bold' > {
                        approvedAmount ? 2 : 1
                    } < /h3> <
                    /div>
                break;
            case 'pending confirmation':
                element = <
                    Oval
                height = "20"
                width = "20"
                color = 'var(--primary)'
                secondaryColor = 'var(--primary)'
                ariaLabel = 'loading' /
                    >
                    break;
            case 'has hash':
                element = <
                    div className = 'watch' >
                    <
                    Watch
                height = "20"
                width = "20"
                color = 'var(--primary)'
                ariaLabel = 'loading' /
                    >
                    <
                    /div>
                break;

            default:
                break;
        }

        return element
    }

    function formElementFor(mode) {
        let element

        switch (mode) {
            case 'wrap':
                if (approvedAmount) {
                    element = <
                        form id = 'wrapForm' >
                        <
                        div className = 'flex default' >
                        <
                        section className = 'flex pseudo center' >
                        <
                        div className = 'flex row wide' > {!isMobile(dimensions) &&
                            <
                            div className = 'tokenimage' >
                            <
                            img src = {
                                tokenimage_OPT3
                            }
                            alt = 'tokenimage OPT3' / >
                            <
                            /div>
                        } <
                        div className = {
                            swapState === 'none' ? 'field highlight' : 'field'
                        } >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'bold' > OPT3 < /h3> <
                        div className = 'icon-wrapper flex row' >
                        <
                        Add fontSize = 'small' / >
                        <
                        div className = {
                            contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                        }
                    onClick = {
                            () => {
                                addToMetamask(contractRebaser_V3._address, 'OPT3')
                            }
                        } >
                        <
                        img src = {
                            iconMetamask
                        }
                    alt = 'MetaMask Icon'
                    width = '100%'
                    height = '100%' / >
                        <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'flex row between flex-end' >
                        <
                        input
                    className = {
                        isMobile(dimensions) ? 'mobileinput' : undefined
                    }
                    type = 'number'
                    min = '0.1'
                    placeholder = '1'
                    step = '0.1'
                    value = {
                        approvedAmount ? approvedAmount : approveAmount
                    }
                    onChange = {
                        e => {
                            setApprovedAmount(0);
                            setApproveAmount(e.currentTarget.value)
                        }
                    }
                    disabled = {
                        swapState !== 'none'
                    }
                    required
                        /
                        >
                        <
                        h2 className = 'small note' > Balance: {
                            balanceOPT3 ? Math.floor(Number(balanceOPT3)) : '-'
                        } < /h2> <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'arrow-container' >
                        <
                        div className = 'arrow'
                    onClick = {
                            () => toggleSwapMode()
                        } >
                        <
                        ArrowDownward / >
                        <
                        /div> <
                        /div> <
                        div className = 'flex row wide' > {!isMobile(dimensions) &&
                            <
                            div className = 'tokenimage' >
                            <
                            img src = {
                                tokenimage_WOPT
                            }
                            alt = 'tokenimage WOPT' / >
                            <
                            /div>
                        } <
                        div className = 'field' >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'bold' > wOPT < /h3> <
                        div className = 'icon-wrapper flex row' >
                        <
                        Add fontSize = 'small' / >
                        <
                        div className = {
                            contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                        }
                    onClick = {
                            () => {
                                addToMetamask(contractWrapper._address, 'wOPT')
                            }
                        } >
                        <
                        img src = {
                            iconMetamask
                        }
                    alt = 'MetaMask Icon'
                    width = '100%'
                    height = '100%' / >
                        <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'flex row between flex-end' >
                        <
                        input
                    className = {
                        isMobile(dimensions) ? 'mobileinput' : undefined
                    }
                    type = 'number'
                    placeholder = {
                        exchangeRate ? Number(exchangeRate).toFixed(2) : ''
                    }
                    value = {
                        approvedAmount ? Number(approvedAmount * exchangeRate).toFixed(2) : ''
                    }
                    readOnly
                        /
                        >
                        <
                        h2 className = 'small note' > Balance: {
                            balanceWOPT ? Math.floor(Number(balanceWOPT)) : '-'
                        } < /h2> <
                        /div> <
                        /div> <
                        /div> <
                        /section> <
                        section >
                        <
                        div className = 'field' >
                        <
                        h3 className = 'bold' > 1 OPT3 = {
                            exchangeRate ? exchangeRate : '...'
                        }
                    wOPT < /h3> <
                        div >
                        <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Gross Output <
                        /h3> <
                        h3 className = 'small note' > {
                            approvedAmount ? Number(approvedAmount * exchangeRate).toFixed(3) : ''
                        }
                    wOPT
                        <
                        /h3> <
                        /div> <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Price Impact <
                        /h3> <
                        h3 className = 'small note redacted' >
                        0 %
                        <
                        /h3> <
                        /div> <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Slippage <
                        /h3> <
                        h3 className = 'small note redacted' >
                        0 %
                        <
                        /h3> <
                        /div> <
                        /div> <
                        div >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'small' >
                        Estimated Output(NET) <
                        /h3> <
                        h3 className = 'small' > {
                            approvedAmount ? Number(approvedAmount * exchangeRate).toFixed(3) : ''
                        }
                    wOPT
                        <
                        /h3> <
                        /div> <
                        /div> <
                        /div> <
                        /section> <
                        section className = 'flex default' >
                        <
                        div className = {
                            isMobile(dimensions) ? 'actions flex default' : 'actions flex default row between'
                        } >
                        <
                        button className = 'oversize'
                    disabled >
                        Enable OPT3 <
                        /button> {
                            element2For(swapState)
                        } <
                        /div> {
                            !isMobile(dimensions) &&
                                <
                                div className = 'flex default row center split' >
                                <
                                section >
                                <
                                div className = 'step step-passive' >
                                <
                                h3 className = 'small bold' > 1 < /h3> <
                                /div> <
                                /section> <
                                section > {
                                    stepElementFor(swapState)
                                } <
                                /section> <
                                /div>
                        } <
                        /section> <
                        /div> <
                        /form>
                } else {
                    element = <
                        form id = 'approveForm' >
                        <
                        div className = 'flex default' >
                        <
                        section className = 'flex pseudo center' >
                        <
                        div className = 'flex row wide' > {!isMobile(dimensions) &&
                            <
                            div className = 'tokenimage' >
                            <
                            img src = {
                                tokenimage_OPT3
                            }
                            alt = 'tokenimage OPT3' / >
                            <
                            /div>
                        } <
                        div className = {
                            swapState === 'none' ? 'field highlight' : 'field'
                        } >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'bold' > OPT3 < /h3> <
                        div className = 'icon-wrapper flex row' >
                        <
                        Add fontSize = 'small' / >
                        <
                        div className = {
                            contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                        }
                    onClick = {
                            () => {
                                addToMetamask(contractRebaser_V3._address, 'OPT3')
                            }
                        } >
                        <
                        img src = {
                            iconMetamask
                        }
                    alt = 'MetaMask Icon'
                    width = '100%'
                    height = '100%' / >
                        <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'flex row between flex-end default' >
                        <
                        input
                    className = {
                        isMobile(dimensions) ? 'mobileinput' : undefined
                    }
                    type = 'number'
                    min = '0.1'
                    placeholder = '1'
                    step = '0.1'
                    value = {
                        approveAmount
                    }
                    onChange = {
                        e => setApproveAmount(e.currentTarget.value)
                    }
                    disabled = {
                        swapState !== 'none'
                    }
                    required
                        /
                        >
                        <
                        h2 className = 'small note' > Balance: {
                            balanceOPT3 ? Math.floor(Number(balanceOPT3)) : '-'
                        } < /h2> <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'arrow-container' >
                        <
                        div className = 'arrow'
                    onClick = {
                            () => toggleSwapMode()
                        } >
                        <
                        ArrowDownward / >
                        <
                        /div> <
                        /div> <
                        div className = 'flex row wide' > {!isMobile(dimensions) &&
                            <
                            div className = 'tokenimage' >
                            <
                            img src = {
                                tokenimage_WOPT
                            }
                            alt = 'tokenimage WOPT' / >
                            <
                            /div>
                        } <
                        div className = 'field' >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'bold' > wOPT < /h3> <
                        div className = 'icon-wrapper flex row' >
                        <
                        Add fontSize = 'small' / >
                        <
                        div className = {
                            contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                        }
                    onClick = {
                            () => {
                                addToMetamask(contractWrapper._address, 'wOPT')
                            }
                        } >
                        <
                        img src = {
                            iconMetamask
                        }
                    alt = 'MetaMask Icon'
                    width = '100%'
                    height = '100%' / >
                        <
                        /div> <
                        /div> <
                        /div> <
                        div className = 'flex row between flex-end' >
                        <
                        input
                    className = {
                        isMobile(dimensions) ? 'mobileinput' : undefined
                    }
                    type = 'number'
                    placeholder = {
                        exchangeRate ? Number(exchangeRate).toFixed(2) : ''
                    }
                    value = {
                        approveAmount ? Number(approveAmount * exchangeRate).toFixed(2) : ''
                    }
                    readOnly
                        /
                        >
                        <
                        h3 className = 'small note' > Balance: {
                            balanceWOPT ? Math.floor(Number(balanceWOPT)) : '-'
                        } < /h3> <
                        /div> <
                        /div> <
                        /div> <
                        /section> <
                        section >
                        <
                        div className = 'field' >
                        <
                        h3 className = 'bold' > 1 OPT3 = {
                            exchangeRate ? exchangeRate : '...'
                        }
                    wOPT < /h3> <
                        div >
                        <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Gross Output <
                        /h3> <
                        h3 className = 'small note' > {
                            approveAmount ? Number(approveAmount * exchangeRate).toFixed(3) : ''
                        }
                    wOPT
                        <
                        /h3> <
                        /div> <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Price Impact <
                        /h3> <
                        h3 className = 'small note redacted' >
                        0 %
                        <
                        /h3> <
                        /div> <
                        div className = 'flex row between underline' >
                        <
                        h3 className = 'small note' >
                        Slippage <
                        /h3> <
                        h3 className = 'small note redacted' >
                        0 %
                        <
                        /h3> <
                        /div> <
                        /div> <
                        div >
                        <
                        div className = 'flex row between' >
                        <
                        h3 className = 'small' >
                        Estimated Output(NET) <
                        /h3> <
                        h3 className = 'small' > {
                            approveAmount ? Number(approveAmount * exchangeRate).toFixed(3) : ''
                        }
                    wOPT
                        <
                        /h3> <
                        /div> <
                        /div> <
                        /div> <
                        /section> <
                        section className = 'flex default' >
                        <
                        div className = {
                            isMobile(dimensions) ? 'actions flex default' : 'actions flex default row between'
                        } > {
                            element1For(swapState)
                        } <
                        button className = 'oversize'
                    disabled >
                        Wrap <
                        /button> <
                        /div> {
                            !isMobile(dimensions) &&
                                <
                                div className = 'flex default row center split' >
                                <
                                section > {
                                    stepElementFor(swapState)
                                } <
                                /section> <
                                section >
                                <
                                div className = 'step step-passive' >
                                <
                                h3 className = 'small bold' > 2 < /h3> <
                                /div> <
                                /section> <
                                /div>
                        } <
                        /section> <
                        /div> <
                        /form>
                }
                break;
            case 'unwrap':
                element = <
                    form id = 'unwrapForm' >
                    <
                    div className = 'flex default' >
                    <
                    section className = 'flex pseudo center' >
                    <
                    div className = 'flex row wide' > {!isMobile(dimensions) &&
                        <
                        div className = 'tokenimage' >
                        <
                        img src = {
                            tokenimage_WOPT
                        }
                        alt = 'tokenimage WOPT' / >
                        <
                        /div>
                    } <
                    div className = {
                        swapState === 'none' ? 'field highlight' : 'field'
                    } >
                    <
                    div className = 'flex row between' >
                    <
                    h3 className = 'bold' > wOPT < /h3> <
                    div className = 'icon-wrapper flex row' >
                    <
                    Add fontSize = 'small' / >
                    <
                    div className = {
                        contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                    }
                onClick = {
                        () => {
                            addToMetamask(contractWrapper._address, 'wOPT')
                        }
                    } >
                    <
                    img src = {
                        iconMetamask
                    }
                alt = 'MetaMask Icon'
                width = '100%'
                height = '100%' / >
                    <
                    /div> <
                    /div> <
                    /div> <
                    div className = 'flex row between flex-end' >
                    <
                    input
                className = {
                    isMobile(dimensions) ? 'mobileinput' : undefined
                }
                type = 'number'
                min = '0.1'
                placeholder = '1'
                step = '0.1'
                value = {
                    unwrapAmount
                }
                onChange = {
                    e => setUnwrapAmount(e.currentTarget.value)
                }
                disabled = {
                    swapState !== 'none'
                }
                required
                    /
                    >
                    <
                    h2 className = 'small note' > Balance: {
                        balanceWOPT ? Math.floor(Number(balanceWOPT)) : '-'
                    } < /h2> <
                    /div> <
                    /div> <
                    /div> <
                    div className = 'arrow-container' >
                    <
                    div className = 'arrow'
                onClick = {
                        () => toggleSwapMode()
                    } >
                    <
                    ArrowDownward / >
                    <
                    /div> <
                    /div> <
                    div className = 'flex row wide' > {!isMobile(dimensions) &&
                        <
                        div className = 'tokenimage' >
                        <
                        img src = {
                            tokenimage_OPT3
                        }
                        alt = 'tokenimage OPT3' / >
                        <
                        /div>
                    } <
                    div className = 'field' >
                    <
                    div className = 'flex row between' >
                    <
                    h3 className = 'bold' > OPT3 < /h3> <
                    div className = 'icon-wrapper flex row' >
                    <
                    Add fontSize = 'small' / >
                    <
                    div className = {
                        contractWrapper ? 'icon-metamask' : 'icon-metamask disabled'
                    }
                onClick = {
                        () => {
                            addToMetamask(contractRebaser_V3._address, 'OPT3')
                        }
                    } >
                    <
                    img src = {
                        iconMetamask
                    }
                alt = 'MetaMask Icon'
                width = '100%'
                height = '100%' / >
                    <
                    /div> <
                    /div> <
                    /div> <
                    div className = 'flex row between flex-end' >
                    <
                    input
                className = {
                    isMobile(dimensions) ? 'mobileinput' : undefined
                }
                type = 'number'
                placeholder = {
                    unwrapAmount ? Number(unwrapAmount / exchangeRate).toFixed(2) : Number(1 / exchangeRate).toFixed(2)
                }
                value = {
                    unwrapAmount ? Number(unwrapAmount / exchangeRate).toFixed(2) : ''
                }
                readOnly
                    /
                    >
                    <
                    h2 className = 'small note' > Balance: {
                        balanceOPT3 ? Math.floor(Number(balanceOPT3)) : '-'
                    } < /h2> <
                    /div> <
                    /div> <
                    /div> <
                    /section> <
                    section >
                    <
                    div className = 'field' >
                    <
                    h3 className = 'bold' > 1 wOPT = {
                        exchangeRate ? 1 / exchangeRate : '...'
                    }
                OPT3 < /h3> <
                    div >
                    <
                    div className = 'flex row between underline' >
                    <
                    h3 className = 'small note' >
                    Gross Output <
                    /h3> <
                    h3 className = 'small note' > {
                        unwrapAmount ? Number(unwrapAmount / exchangeRate).toFixed(3) : ''
                    }
                OPT3
                    <
                    /h3> <
                    /div> <
                    div className = 'flex row between underline' >
                    <
                    h3 className = 'small note' >
                    Price Impact <
                    /h3> <
                    h3 className = 'small note redacted' >
                    0 %
                    <
                    /h3> <
                    /div> <
                    div className = 'flex row between underline' >
                    <
                    h3 className = 'small note' >
                    Slippage <
                    /h3> <
                    h3 className = 'small note redacted' >
                    0 %
                    <
                    /h3> <
                    /div> <
                    /div> <
                    div >
                    <
                    div className = 'flex row between' >
                    <
                    h3 className = 'small' >
                    Estimated Output(NET) <
                    /h3> <
                    h3 className = 'small' > {
                        unwrapAmount ? Number(unwrapAmount / exchangeRate).toFixed(3) : ''
                    }
                OPT3
                    <
                    /h3> <
                    /div> <
                    /div> <
                    /div> <
                    /section> {
                        element3For(swapState)
                    } <
                    /div> <
                    /form>
                break;
            default:
                element = < h1 > swapMode not defined < /h1>
                break;
        }

        return element
    }

    return ( <
        div className = 'stage' >
        <
        div className = 'element' >
        <
        div className = 'flex default' >
        <
        div className = 'subtitle' >
        <
        div className = 'flex row between' >
        <
        h3 > & #127791; &nbsp;Wrap</h3>
                            <h3>{account && ('[' + abbreviate(account) + ']')}</h3>
                        </div>
                    </div>
                    <div className= {
            isMobile(dimensions) ? undefined : 'panel padded'
        } > {
            account ?
            formElementFor(swapMode) :
                <
                div className = {
                    isMobile(dimensions) ? 'connect-mobile' : 'connect'
                } > {
                    isMobile(dimensions) ?
                    network === 'Polygon' ?
                    <
                    button className = 'oversize'
                    onClick = {
                        onConnect
                    }
                    disabled = {!network
                    } >
                    <
                    h3 > Connect Wallet < /h3> <
                    /button> :
                    <
                    h3 > Wrong Network < /h3> :
                        network === 'Polygon' ?
                        <
                        button onClick = {
                            onConnect
                        }
                    disabled = {!network
                    } >
                    <
                    h3 > Connect Wallet < /h3> <
                    /button>:
                        <
                        h3 > Wrong Network < /h3>
                } <
                /div>
        } <
        /div> <
        /div> <
        /div> <
        /div>
    )
}