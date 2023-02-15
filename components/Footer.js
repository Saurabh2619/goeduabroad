import styles from './Footer.module.css';

function Footer(){


    const socials = [
{
    link:'https://www.facebook.com/profile.php?id=100089557687518',
    title:'Facebook',
},
{
    link:'https://www.linkedin.com/in/edu-abroad-b92079262/',
    title:'LinkedIn',
},
{
    link:'https://www.instagram.com/go_eduabroad/',
    title:'Instagram',
},
{
    link:'https://wa.me/919044442989',
    title:'WhatsApp',
},
{
    link:'https://www.youtube.com/@eduabroad121',
    title:'YouTube',
},
    ]
    
const quicks = [{

    title:'Home',
    link:'/'
},
{

    title:'About',
    link:'/about'
},
{

    title:'Study Abroad',
    link:'/study-abroad'
},

{

    title:'Test Prep',
    link:'/testprep'
},
{

    title:'Services',
    link:'/services'
},
{

    title:'Contact Us',
    link:'/contact'
},

]

            const resources = [
                {
                    link:'/legals/privacy',
                    title:'Privacy Policy',
                },
                {
                    link:'/legals/tnc',
                    title:'Terms & Conditions',
                },
                {
                    link:'/legals/refund',
                    title:'Refund Policy',
                },
                {
                    link:'#',
                    title:'Sitemap',
                },
               
                    ]
    return <footer className={styles.footerouter}><div className={styles.footer}>
        <div className={styles.top}>
            <div className={styles.badge}><img src="/label.svg"/></div>
            <img className={styles.footerlogo} src='/edulogo.svg'/>
            <div className={styles.cols}>
<div className={styles.col}>
<h2>Quick Links</h2>
{quicks && quicks.filter((i,d)=>{
    if(d == 0 || d == 1 || d == 5){
        return i
    }
}).map((i,d)=>{
    
    return <a className={styles.link} href={i.link}><li>{i.title}</li></a>
})}
</div>
<div className={styles.col}>
<h2>Useful Resources</h2>
{resources && resources.map((i,d)=>{
    return <a className={styles.link} href={i.link}><li>{i.title}</li></a>
})}
</div>
<div className={styles.col}>
<h2>Social Links</h2>
{socials && socials.map((i,d)=>{
    return <a className={styles.link} href={i.link}><li>{i.title}</li></a>
})}
</div>

            </div>
            <div className={styles.third}>
            <a href="/contact" className={styles.expert}>Talk to an Expert</a></div>
            <div className={styles.inner}>
                <span><a href="tel:+919044442989">Contact : +91 904 444 2989</a> | <a href="mailto:info@goeduabroad.com">Email : info@goeduabroad.com</a></span>
            </div>
        </div>
        <div className={styles.bottom}>
            <p>2023© All Rights Reserved | Edu Abroad</p>
            <a href="https://blog.nmnvisuals.com">Developed & Designed by NMN Visuals</a>
        </div>
        </div></footer>
}

export default Footer;