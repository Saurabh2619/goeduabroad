import styles from './Navbar.module.css'
import {useState} from 'react'
import Link from 'next/link';
function Navbar(props){

const [active,setActive] = useState();
    function handleHover(data){
       
    }
return(<div className={styles.navcont + " " + (props.active? styles.active : '')}>
    <Link href={'/'} legacyBehavior><a aria-label='Edu Abroad Official Logo' className={styles.navlogo + " " + (props.active? styles.invert  : '')}><img alt='Edu Abroad Site Logo' height={"100px"} width={"52.2px"} src='/edulogo.svg'/></a></Link>

{/* Navbar Mobil */}
<div className={styles.navmob + " " + (active? styles.activemob : '')}>
<div className={styles.tgbutton} onClick={()=>{active? setActive(false) : setActive(true)}}>
<svg className={styles.navoff} width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17h18a1 1 0 0 1 .117 1.993L21 19H3a1 1 0 0 1-.117-1.993L3 17h18H3Zm0-6 18-.002a1 1 0 0 1 .117 1.993l-.117.007L3 13a1 1 0 0 1-.117-1.993L3 11l18-.002L3 11Zm0-6h18a1 1 0 0 1 .117 1.993L21 7H3a1 1 0 0 1-.117-1.993L3 5h18H3Z" fill="#212121"/></svg>
<svg className={styles.navon} width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" fill="#212121"/></svg>
</div>
<div className={styles.navhold}>
<><ul>
<Link href="/"><li>Home</li></Link>
      
        <li className={styles.hasChild} onMouseOver={()=>{handleHover(true)}} onMouseOut={()=>handleHover(false)}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z"/></svg>Categories 
        
        <ul className={styles.navsub}>
        
        {props.categories? props.categories.map((item,index)=>{
              
            return(<li  key={index}><Link href={`/category/${item.slug}`}>{item.title}</Link></li>)

        }):''}</ul></li>
        <li ><Link href={'/About'} target={'_blank'}>About</Link></li>
        
        <li><Link href="/contact">Contact</Link></li>
        
        
        </ul></>    

</div>

</div>
    {/* NavBar Desktop */}
  
</div>)
}

export default Navbar;