import styles from './Footer.module.css';

function Footer(props){

const contacts = props?.contacts
    const socials = [
{
    link:'https://www.facebook.com/profile.php?id=100089557687518',
    title:'Facebook',
},
{
    link:'https://www.linkedin.com/company/goeduabroad/',
    title:'LinkedIn',
},
{
    link:'https://www.instagram.com/goeduabroad/',
    title:'Instagram',
},
{
    link:'https://wa.me/919044442989',
    title:'WhatsApp',
},
{
    link:'https://www.youtube.com/@eduabroad6658',
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

function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }

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
            <div className={styles.badge}><img alt='Edu Abroad Label' src="/label.svg"/></div>
            <div className={styles.footerlogo}>
            <img alt='Edu Abroad Logo' className={styles.logo} src='/enl.svg'/>
            <img alt='Cambridge Logo' width={120} className={styles.cambridge} src='/cambridge.svg'/></div>
            <div className={styles.cols}>
<div className={styles.col}>
<h2>Quick Links</h2>
{quicks && quicks.filter((i,d)=>{
    if(d == 0 || d == 1 || d == 5){
        return i
    }
}).map((i,d)=>{
    
    return <a className={styles.link} href={i.link}>{i.title}</a>
})}
</div>
<div className={styles.col}>
<h2>Useful Resources</h2>
{resources && resources.map((i,d)=>{
    return <a className={styles.link} href={i.link}>{i.title}</a>
})}
</div>
<div className={styles.col}>
<h2>Social Links</h2>
{socials && socials.map((i,d)=>{
    return <a target="_blank" className={styles.link} href={i.link}>{i.title}</a>
})}
</div>

<div className={styles.col}>
<h2>Our Branches</h2>
{contacts && contacts.map((i,d)=>{
    return <a className={styles.link} href={`/${i.slug}`}>{i.title}</a>})}
</div>

            </div>
            <div className={styles.third}>
            <a href="/contact" className={styles.expert}>Talk to an Expert</a></div>
            <div className={styles.inner}>
                <span><a href="tel:+919044442989">Contact : +91 904 444 2989</a> | <a href="mailto:info@goeduabroad.com">Email : info@goeduabroad.com</a></span>
            </div>
        </div>
        <div className={styles.bottom}>
            <p>{getCurrentYear()}© All Rights Reserved | Edu Abroad</p>
            
        </div>
        </div></footer>
}

export default Footer;