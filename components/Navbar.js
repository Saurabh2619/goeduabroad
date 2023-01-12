import styles from './Navbar.module.css'
import {useEffect, useState} from 'react'
import Link from 'next/link';
function Navbar(props){

const [active,setActive] = useState();
const [activeToggle,setActiveToggle] = useState();
    
const links = [{

    title:'Home',
    link:'/'
},
{

    title:'Countries',
    link:'/countries'
},
{

    title:'About',
    link:'/about'
},

{

    title:'Contact Us',
    link:'/contact'
},

]

function checkwidth(d){

    if(window.scrollY > window.outerHeight){
        setActive(true)
    }else{
        setActive(false)
    }
    
}

useEffect(()=>{

    window.addEventListener('scroll',checkwidth)
window.addEventListener('DOMContentLoaded',checkwidth)
    return ()=>{
        window.removeEventListener('scroll',checkwidth)
    }

},[])
return(<><div className={styles.navcont + " " + (active? styles.active : '')}>

    <Link href={'/'} legacyBehavior><a aria-label='Edu Abroad Official Logo' className={styles.navlogo + " " + (active? styles.invert  : '')}><img alt='Edu Abroad Site Logo' height={"100px"} width={"52.2px"} src='/edulogo.svg'/></a></Link>

<div className={styles.menuhold}><ul>
{links && links.map((i,d)=>{
    return <li><a href={i.link}>{i.title}</a></li>
})}
<a className={styles.button} href="/aitool">AI Tool</a>
</ul>
</div>
<div className={styles.toggle + " " + (activeToggle? styles.activetoggle : '')} onClick={()=>{activeToggle?setActiveToggle(false):setActiveToggle(true)}}><svg className={styles.ham} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 50 50">
<path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
</svg>
<svg className={styles.close} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 50 50">
<path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
</svg>
</div>
  
</div>
<div className={styles.mobmenu + " " + (activeToggle?styles.activemenu : '')}>
<ul>
{links && links.map((i,d)=>{
    return <li><a href={i.link}>{i.title}</a></li>
})}
<a className={styles.button} href="/aitool">AI Tool</a>
</ul>

</div>
</>)
}

export default Navbar;