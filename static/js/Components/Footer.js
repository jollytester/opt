import {
    isMobile
} from '../Utils/Utils'
import './Footer.css'

export default function Footer({
    dimensions
}) {
    return ( <
        div className = {
            isMobile(dimensions) ? 'footer footer-mobile' : 'footer'
        } >
        <
        div className = {
            isMobile(dimensions) ? 'footer-inner element flex' : 'footer-inner element flex row default'
        } >
        <
        section >
        <
        div className = 'flex default' >
        <
        h5 > Community < /h5> {
            !isMobile(dimensions) &&
                <
                h2 > Join Optimus ' thriving community on...</h2>
        } {
            isMobile(dimensions) &&
                <
                div className = 'flex default' >
                <
                a href = 'https://t.me/+milvSfipb3w5NjMx'
            alt = 'optimus telegram'
            target = 'new' >
                <
                h2 className = 'link' > Telegram < /h2> <
                /a> <
                a href = 'https://discord.gg/RGr6JynNrN'
            alt = 'optimus discord'
            target = 'new' >
                <
                h2 className = 'link' > Discord < /h2> <
                /a> <
                a href = 'https://twitter.com/optimusopt2'
            alt = 'optimus twitter'
            target = 'new' >
                <
                h2 className = 'link' > Twitter < /h2> <
                /a> <
                h2 className = 'link' > Medium < /h2> <
                /div>
        } <
        /div> {
            !isMobile(dimensions) &&
                <
                div className = 'flex row default' >
                <
                a href = 'https://t.me/+milvSfipb3w5NjMx'
            alt = 'optimus telegram'
            target = 'new' >
                <
                h2 className = 'link' > Telegram < /h2> <
                /a> <
                a href = 'https://discord.gg/RGr6JynNrN'
            alt = 'optimus discord'
            target = 'new' >
                <
                h2 className = 'link' > Discord < /h2> <
                /a> <
                a href = 'https://twitter.com/optimusopt2'
            alt = 'optimus twitter'
            target = 'new' >
                <
                h2 className = 'link' > Twitter < /h2> <
                /a> <
                h2 className = 'link' > Medium < /h2> <
                /div>
        } <
        /section> <
        section >
        <
        div className = 'flex default' >
        <
        h5 > FAQ < /h5> <
        h2 className = 'paragraph' > Find answers to frequently asked questions < span className = 'link' > here < /span>. {isMobile(dimensions) && "Still can't find what you're looking for?"}</h
        2 > {
            isMobile(dimensions) &&
            <
            a href = 'mailto:support.opt@proton.me'
            alt = 'optimus telegram'
            target = 'new' >
            <
            h2 className = 'link' > Contact us < /h2> <
            /a>
        } <
        /div> {
            !isMobile(dimensions) &&
                <
                div className = 'flex row between' >
                <
                h2 > Still can 't find what you'
            re looking
            for ? < /h2> <
            a href = 'mailto:support.opt@proton.me'
            alt = 'optimus telegram'
            target = 'new' >
                <
                h2 className = 'link' > Contact us < /h2> <
                /a> <
                /div>
        } <
        /section> <
        /div> <
        /div>
    )
}