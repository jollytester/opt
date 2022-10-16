import React from 'react'

//import misc Web3
import detectEthereumProvider from '@metamask/detect-provider'

//import contracts json
import contract_json from '../Contracts/Rebaser.json'
import wrapper_json from '../Contracts/Wrapper.json'
import migration_json from '../Contracts/MigrationV3.json'

//import web3
var Web3 = require('web3');

class Loader extends React.Component {

    async componentDidMount() {
        //get provider (eg MetaMask)
        const provider = await detectEthereumProvider()

        if (provider) {
            // From now on, this should always be true:
            // provider === window.ethereum
            // this.props.setProvider(provider)
        } else {
            console.log('No web3 provider detected. Please install MetaMask!')
        }

        //get web3
        const web3 = new Web3(provider)

        //get network id
        const netId = await web3.eth.net.getId()

        //empty contract instances
        let contract_rebaser_V2
        let contract_rebaser_V3
        let contract_wrapper
        let contract_migration

        //Polygon Mainnet
        if (netId === 137) {
            //get rebaser contracts /////////////////////////////////////////////
            const contract_abi = contract_json.abi
            const contract_addrV2 = '0x9E25126EBCD57C8eb6eb6c2ffC67810d365CFC3E'
            const contract_addrV3 = '0xCf630283E8Ff2e30C29093bC8aa58CADD8613039'
            contract_rebaser_V2 = new web3.eth.Contract(contract_abi, contract_addrV2)
            contract_rebaser_V3 = new web3.eth.Contract(contract_abi, contract_addrV3)
            /////////////////////////////////////////////////////////////////////

            //get wrapper contract //////////////////////////////////////////////
            const wrapper_abi = wrapper_json.abi
            const wrapper_addr = '0x676fcD577d0C8705F9f81577C4bFC4cc7979E69B'
            contract_wrapper = new web3.eth.Contract(wrapper_abi, wrapper_addr)
            /////////////////////////////////////////////////////////////////////

            //get migration contract ////////////////////////////////////////////
            const migration_abi = migration_json.abi
            const migration_addr = '0xEcB03Cf508A24064950704e3201B22b2465d6698'
            contract_migration = new web3.eth.Contract(migration_abi, migration_addr)
            /////////////////////////////////////////////////////////////////////


            this.props.setNetwork('Polygon')
        }

        if (contract_rebaser_V2) {
            const name = await contract_rebaser_V2.methods.name().call()
            if (name) {
                console.log('Connected to', name, 'at net id', netId)
            }
            if (!name) {
                window.alert('contract_rebaser_V2 not found at ' + netId)
            }

            //set ref to rebaser contract in state
            this.props.setContractRebaser_V2(contract_rebaser_V2)
        } else {
            console.log('contract_rebaser_V2 not found at net id', netId)
        }

        if (contract_rebaser_V3) {
            const name = await contract_rebaser_V3.methods.name().call()
            if (name) {
                console.log('Connected to', name, 'at net id', netId)
            }
            if (!name) {
                window.alert('contract_rebaser_V3 not found at ' + netId)
            }

            //set ref to rebaser contract in state
            this.props.setContractRebaser_V3(contract_rebaser_V3)
        } else {
            console.log('contract_rebaser_V3 not found at net id', netId)
        }

        if (contract_rebaser_V2 && contract_rebaser_V3) {
            //get data
            this.props.getContractData(contract_rebaser_V2, contract_rebaser_V3)
        } else {
            console.log('contract_rebaser_V2 OR contract_rebaser_V3 not found at net id', netId)
        }

        if (contract_wrapper) {
            const name = await contract_wrapper.methods.name().call()
            if (name) {
                console.log('Connected to', name, 'at net id', netId)
            }
            if (!name) {
                window.alert('contract_wrapper not found at ' + netId)
            }

            //set ref to contract_wrapper in state
            this.props.setContractWrapper(contract_wrapper)
        } else {
            console.log('contract not found at net id', netId)
        }

        if (contract_rebaser_V3 && contract_wrapper) {

            //get exchange ratio
            const bigInt = await contract_wrapper.methods.divisor().call()
            const divisor = await contract_rebaser_V3.methods.divisor().call()
            const ratio = 1 * divisor / bigInt

            this.props.setExchangeRate(ratio)
        }

        if (contract_migration) {
            const addressV2 = await contract_migration.methods.addressV2().call()
            if (addressV2) {
                console.log('Connected to migration contract at net id', netId)
            }
            if (!addressV2) {
                window.alert('migration contract not found at ' + netId)
            }

            this.props.setContractMigration(contract_migration)
        }
    }

    render() {
        return ( <
            title > loader < /title>
        )
    }
}

export default Loader;