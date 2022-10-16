import './Migrate.css'

//React
import {
    useEffect
} from 'react'

//Utils
import {
    isMobile,
    abbreviate
} from '../Utils/Utils'

export default function Migrate({
    setPage,
    dimensions,
    onConnect,
    account,
    network,
    balanceOPT2,
    approveMigration,
    migrate,
    approvedMigration
}) {
    //set page
    useEffect(() => {
        setPage('migrate')
    }, [setPage])

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
        h3 > & #128042; &nbsp;Migrate</h3>
                            {!isMobile(dimensions) &&
                                <h3>{account && ('[' + abbreviate(account) + ']')}</h3>
                            }
                        </div>
                    </div>
                    <div className= {
            isMobile(dimensions) ? undefined : 'panel padded'
        } > {
            account ?
            <
            div className = 'flex default' >
            <
            div className = 'flex row between' >
            <
            h5 > OPT2 < /h5> <
            h5 > & rarr; < /h5> <
            h5 > OPT3 < /h5> <
            /div> <
            p className = 'single' >
            The Optimus V3 migration has now begun. < br / > That means it 's time to turn your dusty old 
            OPT2 tokens into shiny new OPT3 ones!
            <
            /p> <
            div className = 'flex pseudo' >
            <
            div className = 'flex row between single' >
            <
            h3 > You have : < /h3> <
                h3 > {
                    Number(balanceOPT2).toLocaleString()
                }
            OPT2 < /h3> <
            /div> <
            div className = 'flex row between single' >
            <
            h3 > You will receive: < /h3> <
                h3 > {
                    Number(balanceOPT2).toLocaleString()
                }
            OPT3 < /h3> <
            /div> <
            /div> <
            div / >
            <
            div / > {
                approvedMigration ?
                <
                button className = 'oversize'
                disabled = {!balanceOPT2
                }
                onClick = {
                    migrate
                } >
                Migrate <
                /button> :
                    <
                    button className = 'oversize'
                disabled = {!balanceOPT2
                }
                onClick = {
                    approveMigration
                } >
                Enable OPT2 <
                /button>
            } <
            /div>:
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