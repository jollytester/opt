import './Header.css'

//images
import logo from '../Images/logo.svg'
import tokenimage_OPT3 from '../Images/tokenimage_OPT3.svg'
import tokenimage_WOPT from '../Images/tokenimage_WOPT.svg'

//components
import {
    Link
} from "react-router-dom"
import {
    isMobile
} from '../Utils/Utils'

export default function Header({
    page,
    price,
    dimensions,
    exchangeRate
}) {
    return ( <
        div className = {
            isMobile(dimensions) ? 'header header-mobile' : 'header'
        }
        style = {
            page === 'home' ? {
                backgroundColor: 'rgb(212, 234, 255)'
            } : {
                backgroundColor: 'rgb(244, 244, 245)'
            }
        } >
        <
        div className = 'element flex row' >
        <
        section >
        <
        div className = 'logo' >
        <
        Link to = '/' > {
            isMobile(dimensions) && page !== 'home' &&
            <
            h1 className = 'goback' > & larr; < /h1>
        } <
        img src = {
            logo
        }
        alt = 'optimus logo' / >
        <
        /Link> <
        /div> {
            !isMobile(dimensions) &&
                <
                section >
                <
                div className = 'nav' > {
                    /* <Link to='/'>
                                                        <h3>Home</h3>
                                                    </Link> */
                } <
                Link to = 'account' >
                <
                h3 > Account < /h3> <
                /Link> <
                Link to = 'wrap' >
                <
                h3 > Wrap < /h3> <
                /Link> <
                Link to = 'migrate' >
                <
                div className = 'flex row pseudo baseline' >
                <
                h3 > V3 < /h3> <
                h3 className = 'small new' > new < /h3> <
                /div> <
                /Link> <
                a href = './whitepaper.pdf'
            alt = 'whitepaper'
            target = 'new' >
                <
                h3 > Whitepaper < /h3> <
                /a> <
                a href = 'https://polygonscan.com/address/0xcf630283e8ff2e30c29093bc8aa58cadd8613039'
            alt = 'contract'
            target = 'new' >
                <
                h3 > Contract < /h3> <
                /a> <
                /div> <
                /section>
        } <
        /section> <
        section className = 'end' > {
            price &&
            <
            a href = 'https://dexscreener.com/polygon/0xcfeadf2671f85674c6377e2fdd2593985adfa8c5'
            alt = 'OPT2 price chart'
            target = 'new' >
            <
            div className = 'flex row center pseudo' >
            <
            img className = 'tokensmall'
            src = {
                tokenimage_OPT3
            }
            alt = 'OPT2' / >
            <
            h3 > {
                '$' + Number(price).toFixed(2)
            } < /h3> <
            /div> <
            /a>
        } {
            price && exchangeRate && !isMobile(dimensions) &&
                <
                a href = 'https://www.mexc.com/landings/DefiDude?handleDefaultLocale=keep&inviteCode=mexc-1UBDB'
            alt = 'WOPT on mexc'
            target = 'new' >
                <
                div className = 'flex row center pseudo' >
                <
                img className = 'tokensmall'
            src = {
                tokenimage_WOPT
            }
            alt = 'WOPT' / >
                <
                h3 > {
                    price && '$' + Number(price / exchangeRate).toFixed(2)
                } < /h3> <
                /div> <
                /a>
        } {
            !isMobile(dimensions) &&
                <
                a href = 'https://quickswap.exchange/#/swap?currency0=0xc2132d05d31c914a87c6611c10748aeb04b58e8f&currency1=0xCf630283E8Ff2e30C29093bC8aa58CADD8613039'
            alt = 'Buy OPT3'
            target = 'new' >
                <
                button >
                <
                h3 > Buy OPT3 < /h3> <
                /button> <
                /a>
        } <
        /section> <
        /div> <
        /div>
    )
}