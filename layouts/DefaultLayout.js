import { use, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './DefaultLayout.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router';
import { supabase } from '../utils/supabaseClient';
function DefaultLayout(props){


const [contacts,setContacts] = useState([])
const [promo,setPromo]= useState(false);
const [animating,setAnimating]= useState(false)
    async function getContacts(){

        const {data,error} = await supabase.from('franchise').select("id,title,slug")
        
        if(data && data?.length > 0){
            setContacts(data.map((i,d)=>{
                return {
                    title:i?.title,
                    slug:`contact/${i?.slug}`
                }
            }))
        }
        else{}
        
        
        }
        
        
        useEffect(()=>{
            getContacts()
        },[])


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

function handleAnimateClose(){
    setAnimating(true)
    setTimeout(()=>{setAnimating(false),setPromo(false)},1500)

}

    return <div className={styles.maincont}>
     {loading?    <div className={styles.loaderoverlay}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="#fff">
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff"/>
<path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="#fff"/>
</svg>
            <p>Loading...</p></div>
        </div>:''}
       {props.navbar ?'': <Navbar contacts={contacts} customScroll={props.scroll} hideAI={props.hideAI}/>} 

        
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
<div className={styles.promoholder + "  " + (promo ? styles.activepromo : '') + " " + (animating ? styles.animating : '')}>
    <div className={styles.close}>
<svg
onClick={()=>{handleAnimateClose()}}
      xmlns="http://www.w3.org/2000/svg"
      height={44}
      viewBox="0 -960 960 960"
      width={44}
      
    >
      <path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224z" fill='white'/>
    </svg>

   
    </div>
    <div className={styles.promocontent}>
<p>We are proudly</p>
<h1>Official Cambridge Learning Partners</h1>
<h2>(Makers of IELTS Exam)</h2>
<img width={120} alt='Golden Graduation Cap' src='/gradgold.svg'/>

    </div>
    <img alt='Cambridge University Campus' src='/campus.png' className={styles.bottomimage}/>
</div>
<div className={styles.badge + " " + (promo  ? styles.closed : '')}>
    <div className={styles.badgeinner} onClick={()=>{setPromo(true)}}>
    <svg
    width={24}
    height={24}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 511.03 334.3"
     
    >
      <defs>
        <linearGradient
          id="a"
          x1={48.32}
          y1={-65.57}
          x2={565.65}
          y2={580.2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#e3b95d" />
          <stop offset={0.03} stopColor="#dfb459" />
          <stop offset={0.07} stopColor="#d5a54b" />
          <stop offset={0.11} stopColor="#c38c33" />
          <stop offset={0.15} stopColor="#ac6e29" />
          <stop offset={0.17} stopColor="#995524" />
          <stop offset={0.19} stopColor="#995524" />
          <stop offset={0.22} stopColor="#b2762a" />
          <stop offset={0.26} stopColor="#c99945" />
          <stop offset={0.3} stopColor="#ddb55f" />
          <stop offset={0.33} stopColor="#e8c46f" />
          <stop offset={0.36} stopColor="#edcb76" />
          <stop offset={0.38} stopColor="#d69f35" />
          <stop offset={0.39} stopColor="#d69f35" />
          <stop offset={0.42} stopColor="#fbf4db" />
          <stop offset={0.52} stopColor="#f5e182" />
          <stop offset={0.59} stopColor="#f4c665" />
          <stop offset={0.6} stopColor="#edbf5f" />
          <stop offset={0.61} stopColor="#deae53" />
          <stop offset={0.63} stopColor="#c39138" />
          <stop offset={0.64} stopColor="#b07c2b" />
          <stop offset={0.65} stopColor="#bf933e" />
          <stop offset={0.67} stopColor="#d4b25a" />
          <stop offset={0.68} stopColor="#e2c96f" />
          <stop offset={0.7} stopColor="#edda7e" />
          <stop offset={0.72} stopColor="#f3e385" />
          <stop offset={0.74} stopColor="#f5e688" />
          <stop offset={0.83} stopColor="#f4f1ac" />
          <stop offset={0.86} stopColor="#f5f3d6" />
          <stop offset={0.88} stopColor="#f2f3f9" />
          <stop offset={0.91} stopColor="#d39729" />
          <stop offset={0.95} stopColor="#fbeda3" />
          <stop offset={1} stopColor="#f8c95e" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={33.45}
          y1={-53.66}
          x2={550.78}
          y2={592.12}
          xlinkHref="#a"
        />
      </defs>
      <path
        d="M0 109.67v-8.47c.15.35.31.69.53 1.2.41-1.36.85-2.48 1.49-3.51 1.99-3.17 4.92-5.05 8.35-6.4 21-8.25 41.98-16.55 62.96-24.85 30.1-11.9 60.2-23.82 90.29-35.73 21.17-8.38 42.34-16.76 63.52-25.14 5.1-2.02 10.12-4.26 15.56-5.27 2.07-.38 4.12-.8 6.22-1.07-.79-.28-1.66 0-2.4-.45h19.96c-1.06.76-2.36-.11-3.48.49.37.33.8.31 1.19.35 3.65.39 7.23 1.16 10.66 2.47 6.95 2.64 13.86 5.39 20.78 8.13 22.26 8.79 44.53 17.59 66.79 26.4 19.82 7.85 39.64 15.71 59.46 23.56 24.42 9.67 48.85 19.33 73.26 29.03 3.12 1.24 6.37 2.19 9.29 3.93 4.71 2.82 7.36 8.45 6.42 13.84-.95 5.44-4.23 8.96-9.28 10.96-19.71 7.8-39.41 15.6-59.12 23.4-16.11 6.38-32.22 12.76-48.34 19.14-26.9 10.64-53.8 21.27-80.69 31.91-11.67 4.62-23.33 9.26-35.01 13.85-7.74 3.04-15.77 4.59-24.11 4.46-7.57-.12-14.84-1.76-21.85-4.53-14.62-5.76-29.21-11.57-43.82-17.35-20.1-7.95-40.2-15.87-60.3-23.82-18.97-7.51-37.94-15.04-56.91-22.56-1.34-.53-1.43-.48-1.45.91v1c0 24.3.01 48.6-.03 72.91 0 1.4.46 2.26 1.54 3.12 6.93 5.52 10.33 12.84 10.09 21.63-.2 7.35-3.3 13.56-8.71 18.55-.77.71-1.03 1.41-.82 2.41 2.53 12.15 5.08 24.29 7.55 36.45.86 4.26 2.22 8.41 2.13 12.86-.19 9.64-7.59 18.53-17.14 20.07-5.98.96-12.05.96-18.02.14-12.18-1.67-20.1-13.07-17.7-25.15 1.16-5.86 2.5-11.68 3.68-17.55 1.81-9.07 3.76-18.12 5.67-27.18.16-.75.02-1.23-.56-1.74-12.41-10.96-12.06-29.78.78-40.29 1.21-.99 1.71-2 1.71-3.57-.04-28.21-.03-56.41-.03-84.62q0-2.36-2.2-3.22c-8.89-3.5-17.79-6.99-26.68-10.52-2.08-.83-4.19-1.64-5.97-3.06-2.19-1.77-3.76-3.97-4.54-6.7-.09-.31 0-1.04-.7-.44z"
        fill="url(#a)"
      />
      <path
        d="M414.51 217.97v36.77c0 4.46-.27 8.9-1.64 13.17-2.02 6.31-5.46 11.81-9.88 16.72-9.21 10.23-20.68 17.26-32.97 23.09-12.52 5.94-25.62 10.22-39.06 13.5-9.12 2.22-18.32 4.12-27.64 5.31-8.77 1.12-17.57 2.05-26.4 2.65-9.88.68-19.77.84-29.66.61-9.09-.22-18.17-.8-27.22-1.84-7.01-.81-14.04-1.51-20.99-2.76-11.71-2.1-23.29-4.72-34.63-8.36-11.67-3.74-22.98-8.3-33.64-14.4-8.45-4.84-16.27-10.5-22.78-17.83-5.1-5.74-9.04-12.11-10.63-19.73-.6-2.85-.84-5.76-.84-8.66-.05-26.01-.03-52.01-.04-78.02v-.75c-.01-1.06.41-1.29 1.4-.89 3.69 1.51 7.41 2.97 11.12 4.44 18.75 7.4 37.5 14.79 56.24 22.21 18.55 7.35 37.07 14.75 55.62 22.09 6.54 2.59 13.16 4.94 20.14 6.05 11.19 1.78 22.35 1.65 33.43-.94 6.58-1.54 12.84-4 19.1-6.49 15.18-6.03 30.38-12.01 45.56-18.02 15.42-6.1 30.83-12.22 46.25-18.33 9.27-3.67 18.55-7.34 27.82-11.01 1.17-.46 1.33-.3 1.33 1.29v40.13z"
        fill="url(#b)"
      />
    </svg>
    <p>CAMBRIDGE PARTNER</p></div></div>
<div className={styles.content}>

    {props.children}
</div>
        <Footer contacts={contacts}/>
    </div>
}


export default DefaultLayout;