import { use, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './DefaultLayout.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router';
function DefaultLayout(props){


    const router = useRouter();
    const phone = "9044442989";
    const [wa,setWa] = useState();
    const [active,setActive] = useState('');
    const [loading,setLoading] = useState(false);

useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
        setLoading(true)
    })
    router.events.on('routeChangeComplete',()=>{
        setLoading(false)
    })
    router.events.on('routeChangeError',()=>{
        setLoading(false)
    })

},[])



    return <div className={styles.maincont}>
     {loading?    <div className={styles.loaderoverlay}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="#fff">
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff"/>
<path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="#fff"/>
</svg>
            <p>Loading...</p></div>
        </div>:''}
       {props.navbar ?'': <Navbar customScroll={props.scroll} hideAI={props.hideAI}/>} 

        
      {props.hideAI ? '' :  <div onClick={()=>{router.push('/#applyboard')}} className={styles.ai}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 15.707a1 1 0 0 0 1.414 0L12 9.414l6.293 6.293a1 1 0 0 0 1.414-1.414l-7-7a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 0 1.414Z" fill="#DDE6E8"/></svg>Try Our AI Tool</div>}
        <Link aria-label='Contact Us Button' title='Contact Us Button' href={`tel:+91${phone}`}><div className={styles.phone}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.772 2.439 1.076-.344c1.01-.322 2.087.199 2.52 1.217l.859 2.028c.374.883.167 1.922-.514 2.568L9.819 9.706c.116 1.076.478 2.135 1.084 3.177a8.678 8.678 0 0 0 2.271 2.595l2.275-.76c.863-.287 1.802.044 2.33.821l1.233 1.81c.615.904.505 2.15-.258 2.916l-.818.821c-.814.817-1.977 1.114-3.052.778-2.539-.792-4.873-3.143-7.003-7.053-2.133-3.916-2.886-7.24-2.258-9.968.264-1.148 1.081-2.063 2.149-2.404Z" fill="white"/></svg>

        </div></Link>
<div className={styles.wa}>
    
<div className={styles.waicon + " " + (active?styles.activeIcon:'')} onClick={()=>{active ? setActive(false) : setActive(true)}}>
    <img alt='WhatsApp' src="/WhatsApp.svg"/>
    {active? <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="white"/></svg>:''}
</div>

{active? 
<div className={styles.wawin}>
    <input value={wa} onChange={(e)=>{setWa(e.target.value)}} placeholder="Send Blank or Enter your Message"></input>
    <Link href={`https://wa.me/91${phone}?text=${wa && wa.length > 2 ? encodeURIComponent(wa) : encodeURIComponent('Hi! Want to Enquire.')}`} target={"_blank"} ><button><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" fill="white"/></svg></button></Link>
</div>:''}
</div>
<div className={styles.content}>

    {props.children}
</div>
        <Footer/>
    </div>
}


export default DefaultLayout;