import styles from './Footer.module.css';

function Footer(){


    const socials = [
{
    link:'#',
    title:'Facebook',
},
{
    link:'#',
    title:'LinkedIn',
},
{
    link:'#',
    title:'Instagram',
},
{
    link:'#',
    title:'WhatsApp',
},
{
    link:'#',
    title:'YouTube',
},
    ]
    const quicks = [
        {
            link:'#',
            title:'Home',
        },
        {
            link:'#',
            title:'Countries',
        },
        {
            link:'#',
            title:'About',
        },
        {
            link:'#',
            title:'Careers',
        },
        {
            link:'#',
            title:'Contact',
        },
            ]

            const resources = [
                {
                    link:'#',
                    title:'Privacy Policy',
                },
                {
                    link:'#',
                    title:'Terms & Conditions',
                },
                {
                    link:'#',
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
{quicks && quicks.map((i,d)=>{
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
            <button className={styles.expert}>Talk to an Expert</button></div>
            <div className={styles.inner}>
                <span><a href="tel:+919999999999">Contact : +91 999 999 9999</a> | <a href="mailto:info@goeduabroad.com">Email : info@goeduabroad.com</a></span>
            </div>
        </div>
        <div className={styles.bottom}>
            <p>2023© All Rights Reserved | Edu Abroad</p>
            <a href="https://blog.nmnvisuals.com">Developed & Designed by NMN Visuals</a>
        </div>
        </div></footer>
}

export default Footer;