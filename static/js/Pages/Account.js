import {
    abbreviate
} from '../Utils/Utils'
import './Account.css'
import {
    useState,
    useEffect
} from 'react'
import {
    isMobile
} from '../Utils/Utils'

export default function Account({
    setPage,
    account,
    onConnect,
    network,
    price,
    rate,
    supply,
    balanceOPT3,
    burned,
    dimensions
}) {
    const [days, setDays] = useState(30)
    const [amountHeld, setAmountHeld] = useState('')

    //set page
    useEffect(() => {
        setPage('account')
    }, [setPage])

    function labelFor(days) {
        if (days < 30) {
            return Number(days).toFixed() + (days !== 1 ? ' Days' : ' Day')
        } else if (days < 365) {
            const months = Number(days / 30).toFixed()
            return months + (months !== '1' ? ' Months' : ' Month')
        } else {
            const years = Number(days / 365).toFixed()
            return years + (years !== '1' ? ' Years' : ' Year')
        }
    }

    function projectedAmount(amount, rate, days) {
        let p = amount
        let r = rate
        let t = days

        return p * (1 + r) ** t
    }

    return ( <
            div className = 'page' >
            <
            div className = {
                isMobile(dimensions) ? 'stage stage-mobile' : 'stage'
            } >
            <
            div className = 'element dashboard' > { /* GLOBAL METRICS */ } <
            div className = 'flex default' >
            <
            div className = 'subtitle' >
            <
            h3 > & #127760; &nbsp;Global Metrics</h3>
                        </div>
                        <div className= {
                isMobile(dimensions) ? 'flex default' : 'flex row between default'
            } >
            <
            div className = 'flex default panel padded single' >
            <
            h3 > Market Cap < /h3> <
            h1 > {
                Number(supply * price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })
            } < /h1> <
            /div> <
            div className = 'flex default panel padded single' >
            <
            h3 > Total OPT3 Burned < /h3> <
            h1 > {
                Number(burned).toLocaleString(undefined, {
                    maximumFractionDigits: '2'
                })
            } < /h1> <
            /div> <
            div className = 'flex default panel padded single' >
            <
            h3 > Total Revenue < /h3> <
            h1 > {
                Number(burned * price * 2).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })
            } < /h1> <
            /div> <
            /div> <
            /div> { /* ACCOUNT */ } <
            div className = 'flex default' >
            <
            div className = 'flex row default' >
            <
            section className = 'flex default single' >
            <
            div className = 'subtitle' >
            <
            h3 > & #128104; &nbsp;Account {account && ('[' + abbreviate(account) + ']')}</h3>
                                </div>
                                {account ?
                                    <div className= 'flex default' >
            <
            div className = 'flex default panel padded' >
            <
            h3 > Your Wallet < /h3> <
            div className = {
                isMobile(dimensions) ? 'flex close' : 'flex row baseline between'
            } >
            <
            div className = 'flex row baseline' >
            <
            h1 > {
                Number(balanceOPT3).toLocaleString(undefined, {
                    maximumFractionDigits: '2'
                })
            } & nbsp; < /h1> <
            h3 > OPT3 < /h3> <
            /div> <
            h3 className = 'note' > & #8776; {Number(balanceOPT3 * price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} USD</h3>
                                            </div>
                                        </div>
                                        <div className= 'flex default panel padded' >
            <
            h3 > Earn per Day < /h3> <
            div className = {
                isMobile(dimensions) ? 'flex close' : 'flex row baseline between'
            } >
            <
            div className = 'flex row baseline' >
            <
            h1 > {
                Number(balanceOPT3 * rate).toLocaleString(undefined, {
                    maximumFractionDigits: '2'
                })
            } & nbsp; < /h1> <
            h3 > OPT3 < /h3> <
            /div> <
            h3 className = 'note' > & #8776; {Number(balanceOPT3 * rate * price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} USD</h3>
                                            </div>
                                        </div>
                                        <div className= 'flex default panel padded' >
            <
            h3 > Earn per Month < /h3> <
            div className = {
                isMobile(dimensions) ? 'flex close' : 'flex row baseline between'
            } >
            <
            div className = 'flex row baseline' >
            <
            h1 > {
                Number(projectedAmount(balanceOPT3, rate, 30) - balanceOPT3).toLocaleString(undefined, {
                    maximumFractionDigits: '2'
                })
            } & nbsp; < /h1> <
            h3 > OPT3 < /h3> <
            /div> <
            h3 className = 'note' > & #8776; {Number((projectedAmount(balanceOPT3, rate, 30) - balanceOPT3) * price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} USD</h3>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    isMobile(dimensions) ?
                                        network = == 'Polygon' ?
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
            h3 > Wrong Network < /h3>

            :
            <
            div className = 'flex default panel padded center' > {
                network === 'Polygon' ?
                <
                button onClick = {
                    onConnect
                }
                disabled = {!network
                } >
                <
                h3 > Connect Wallet < /h3> <
                /button> :
                    <
                    h3 > Wrong Network < /h3>
            } <
            /div>
        } <
        /section> { /* CALCULATE EARNINGS */ } {
            !isMobile(dimensions) &&
                <
                section className = 'flex default double' >
                <
                div className = 'subtitle' >
                <
                h3 > & #128197; &nbsp;Calculate earnings</h3>
                                    </div>
                                    <div className= 'flex default panel' >
                <
                div className = 'flex row default' >
                <
                div className = 'flex default padded internal' >
                <
                div className = 'flex default ' >
                <
                h3 > Principle amount < /h3> <
                div className = 'flex row baseline default' >
                <
                input
            className = 'principle'
            type = 'number'
            min = '1'
            max = '1000000'
            step = '1'
            placeholder = '1000'
            value = {
                amountHeld
            }
            onChange = {
                e => setAmountHeld(e.currentTarget.value)
            }
            /> <
            h3 > OPT3 < /h3> <
                /div> <
                /div> <
                /div> <
                div className = 'flex default padded internal' >
                <
                div className = 'flex default' >
                <
                h3 > Daily interest rate < /h3> <
                h1 > {
                    rate * 100
                } % < /h1> <
                /div> <
                /div> <
                /div> <
                div className = 'flex row default' >
                <
                div className = 'flex default padded internal' >
                <
                div className = 'flex default' >
                <
                h3 > Held
            for period < /h3> <
                div className = 'slidecontainer' >
                <
                input
            type = "range"
            min = "1"
            max = "730"
            value = {
                days
            }
            className = 'slider'
            id = "myRange"
            onChange = {
                e => setDays(e.currentTarget.value)
            }
            /> <
            /div> <
            /div> <
            /div> <
            div className = 'flex default padded internal' >
                <
                div className = 'flex default' >
                <
                h3 > & nbsp; < /h3> <
            h1 > {
                    labelFor(days)
                } < /h1> <
                /div> <
                /div> <
                /div> <
                div className = 'flex row default result' >
                <
                div className = 'flex default padded internal' >
                <
                div className = 'flex default' >
                <
                h3 > Projected amount < /h3> <
                div className = 'flex row baseline' >
                <
                h1 > {
                    Number(projectedAmount(amountHeld ? amountHeld : 1000, rate, days)).toFixed(2)
                } & nbsp; < /h1> <
            h3 > OPT3 < /h3> <
                /div> <
                /div> <
                /div> <
                div className = 'flex default padded internal' >
                <
                div className = 'flex default' >
                <
                h3 > Projected value < /h3> <
                h1 > $ {
                    Number(projectedAmount(amountHeld ? amountHeld : 1000, rate, days) * price).toFixed(2)
                } < /h1> <
                /div> <
                /div> <
                /div> <
                /div> <
                /section>
        } <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>
)
}