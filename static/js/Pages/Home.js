import './Home.css'
import {
    useEffect
} from 'react'

//images
import liquidity from '../Images/liquidity.png'
import floor from '../Images/floor.png'
import dex from '../Images/dex.png'
import {
    isMobile
} from '../Utils/Utils'
import {
    Link
} from 'react-router-dom'

export default function Home({
    setPage,
    dimensions
}) {

    //set page
    useEffect(() => {
        setPage('home')
    }, [setPage])

    return ( <
        div className = 'page'
        id = 'home' >
        <
        div className = {
            isMobile(dimensions) ? 'banner banner-mobile' : 'banner'
        } >
        <
        div className = 'element' >
        <
        div className = 'group' > {
            isMobile(dimensions) ?
            <
            h5 className = 'mobiletitle' > Earn 1 % daily passive income < /h5> :
                <
                h5 > Earn 1 % daily passive income < /h5>
        } <
        ul className = 'includes' >
        <
        li > {
            isMobile(dimensions) ?
            <
            h2 > & #10004; &nbsp;AI trading generates revenue</h2>
                                    :
                                    <h2>&# 10004; & nbsp;AI trading generates revenue
            for holders < /h2>
        } <
        /li> <
        li > {
            isMobile(dimensions) ?
            <
            h2 > & #10004; &nbsp;Daily income direct to wallet</h2>
                                    :
                                    <h2>&# 10004; & nbsp;Daily income paid directly to your wallet < /h2>
        } <
        /li> <
        li >
        <
        h2 > & #10004; &nbsp;Zero fees</h2>
                            </li>
                        </ul>
                        <div className= {
            isMobile(dimensions) ? 'wide flex default' : undefined
        } >
        <
        Link to = 'migrate' >
        <
        button className = 'oversize' >
        <
        h3 > Migrate V3 < /h3> <
        /button> <
        /Link> {
            isMobile(dimensions) &&
                <
                Link to = 'account'
            className = 'unfilled oversize' >
                <
                h3 > Account < /h3> <
                /Link>
        } <
        /div> <
        /div> <
        /div> <
        /div> <
        div className = 'main' > {!isMobile(dimensions) &&
            <
            div >

            <
            /div>
        } <
        div className = {
            isMobile(dimensions) ? 'element stickers flex between' : 'element stickers flex row between'
        } > {
            isMobile(dimensions) &&
            <
            div >

            <
            /div>
        } <
        div className = {
            isMobile(dimensions) ? 'sticker-mobile' : 'sticker'
        } > {!isMobile(dimensions) &&
            <
            h5 className = 'note' > 01 < /h5>
        } <
        h1 className = 'bold' > AI Trading Bot < /h1> <
        p >
        Optimus is an AI trading bot that will generate revenue
        for OPT2 hodlers.Optimus earns about 1 % per day, just by trading the OPT2 token. <
        /p> <
        /div> <
        div className = {
            isMobile(dimensions) ? 'sticker-mobile' : 'sticker'
        } > {!isMobile(dimensions) &&
            <
            h5 className = 'note' > 02 < /h5>
        } <
        h1 className = 'bold' > Daily Income < /h1> <
        p >
        Holding OPT2 is the best way to earn passive income from AI bot trading.Earn daily compound interest simply by holding OPT2 in your wallet. <
        /p> <
        /div> <
        div className = {
            isMobile(dimensions) ? 'sticker-mobile' : 'sticker'
        } > {!isMobile(dimensions) &&
            <
            h5 className = 'note' > 03 < /h5>
        } <
        h1 className = 'bold' > Zero Fees < /h1> <
        p >
        We believe that passive income is
        for everyone.You shouldn 't have
        to pay crazy high fees.Optimus is 100 % free to use.You 're welcome! <
        /p> <
        /div> <
        /div> <
        div className = 'element' >
        <
        h5 className = 'center-text' >
        Experience bot trading that works <
        /h5> <
        /div> <
        div className = {
            isMobile(dimensions) ? undefined : 'element'
        } >
        <
        ul className = {
            isMobile(dimensions) ? 'items-mobile' : 'items'
        } >
        <
        li >
        <
        div className = 'image'
        style = {
            {
                backgroundImage: `url(${dex})`
            }
        } >

        <
        /div> <
        div className = 'item description' >
        <
        div >
        <
        h1 className = 'bold' > Optimus AI < /h1> <
        p >
        Optimus is an AI trading bot that was trained on real historical market data.Optimus automatically executes profitable trades, earning an average
        return of1 % every single day. <
            /p> <
            /div> <
            /div> <
            /li> <
            li >
            <
            div className = 'image'
        style = {
            {
                backgroundImage: `url(${floor})`
            }
        } >

        <
        /div> <
        div className = 'item description' >
        <
        div >
        <
        h1 className = 'bold' > Optimus holds the floor price < /h1> <
        p >
        Optimus can buy tokens back from the market to stop the price from falling.Optimus will always keep the price in a stable range and maintain an unbreakable floor. <
        /p> <
        /div> <
        /div> <
        /li> <
        li >
        <
        div className = 'image'
        style = {
            {
                backgroundImage: `url(${liquidity})`
            }
        } >

        <
        /div> <
        div className = 'item description' >
        <
        div >
        <
        h1 className = 'bold' > Deep liquidity < /h1> <
        p >
        Optimus uses a portion of the revenue it creates to buy up more liquidity over time.This creates resilience to liquidity shocks and creates additional revenue through swap fees. <
        /p> <
        /div> <
        /div> <
        /li> <
        /ul> <
        /div> {
            !isMobile(dimensions) &&
                <
                div >

                <
                /div>
        } <
        /div> <
        /div>   
    )
}