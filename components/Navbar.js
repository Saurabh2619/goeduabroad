import styles from './Navbar.module.css'
import {useEffect, useState} from 'react'
import Link from 'next/link';
function Navbar(props){

const [active,setActive] = useState();
const [activeToggle,setActiveToggle] = useState();
const [toggle,setToggle] = useState();
const [timeouta,setTimeoutA] = useState(null);
const [isHovering,setHovering] = useState(false);
const [positionModal,setPositionModal] = useState({
    x:0,
    y:0,
});
    

const studyabroad = [
    {
        title:'USA',
        slug:'studyabroad/usa',
        icon:'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png'

    },
    {
        title:'United Kingdom',
        slug:'studyabroad/uk',
        icon:'https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg'
    },
    {
        title:'Australia',
        slug:'studyabroad/australia',
        icon:'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'
    },
    {
        title:'New Zealand',
        slug:'studyabroad/newzealand',
        icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/800px-Flag_of_New_Zealand.svg.png'
    },
    {
        title:'Singapore',
        slug:'studyabroad/singapore',
        icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png'
    },
    {
        title:'Canada',
        slug:'studyabroad/canada',
        icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png'
    },
    {
        title:'Germany',
        slug:'studyabroad/germany',
        icon:'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png'
    }
]
const services = [
   
    {
        title:'Career Counselling',
        slug:'services/careercounselling'
    },
    {
        title:'Profile Design',
        slug:'services/profiledesign'
    },
   
    {
        title:'Interview Preparation',
        slug:'services/interview'
    },
    {
        title:'Scholarship & Financing',
        slug:'services/scholarship'
    },
    {
        title:'Visa & Travel Assistance',
        slug:'services/visaandtravel'
    },
    {
        title:'Schooling Abroad & Summer School',
        slug:'services/schooling'
    }
]
/* const testprep = [

    {
        title:'CAT',
        slug:'testpreps/cat'
    },
    {
        title:'GMAT',
        slug:'testpreps/gmat'
    },
    {
        title:'GRE',
        slug:'testpreps/gre'
    },
    {
        title:'SAT',
        slug:'testpreps/sat'
    },
    {
        title:'ACT',
        slug:'testpreps/act'
    },
    {
        title:'IELTS',
        slug:'testpreps/ielts'
    },
    {
        title:'TOEFL',
        slug:'testpreps/toefl'
    }
] */

const sublinks = [[{}],[{}],
    studyabroad,[{}],services,[{}]
]

const links = [{

    title:'Home',
    link:'/',
    dropdown:false,
},
{

    title:'About',
    link:'/about',
    dropdown:false,
},
{

    title:'Study Abroad',
    link:'/study-abroad',
    dropdown:true,
},

{

    title:'IELTS GURU',
    link:'/testpreps/ielts',
    dropdown:false,
},
{

    title:'Services',
    link:'/services',
    dropdown:true,
},
{

    title:'Contact Us',
    link:'/contact',
    dropdown:false,
},

]

function checkwidth(d){

    if(window.scrollY > window.outerHeight){
        setActive(true)
    }else{
        setActive(false)
    }
    
}

function handleSwitchON(a){

    setActiveToggle(a)
    setToggle()
}
function handleToggle(a,b){
    setToggle();

    clearTimeout(timeouta);
    setTimeoutA(null);
    b.preventDefault();
    setToggle(a)
}
useEffect(()=>{

    window.addEventListener('scroll',checkwidth)
window.addEventListener('DOMContentLoaded',checkwidth)
    return ()=>{
        window.removeEventListener('scroll',checkwidth)
    }

},[])


useEffect(()=>{
    return () => {
        clearTimeout(timeouta);
      }

},[timeouta])
function handleOut(){

    const id = setTimeout(() => {
        if(isHovering){}else{
            clearTimeout(timeouta)
            setTimeoutA(null)
            setToggle()
        }
      }, 800);
      setTimeoutA(id);
}
function setPos(e){
const rect = e.target.getBoundingClientRect();
    
    setPositionModal({
        x:rect.left,
        y:rect.top+30
    })
}
function handleClear(){

    clearTimeout(timeouta);
    setTimeoutA(null);
    setToggle();
}
return(<>
{toggle ? 
<div onMouseOver={()=>{setHovering(true)}} onMouseEnter={()=>{setHovering(true),clearTimeout(timeouta),setTimeoutA(null)}} onMouseLeave={()=>{setHovering(false),setToggle()}} className={styles.desknav} style={{top:positionModal.y,left:positionModal.x}}>
<ul>
{sublinks && toggle && sublinks[toggle].map((i,d)=>{
    return <Link href={`/${i.slug}`}><li style={{animationDelay:`${d*20}ms`}}>{i.icon ? <img src={i.icon}/>:''}{i.title}</li></Link>
})}

</ul>

</div>:''}
<div className={styles.navcont + " " + (active && !activeToggle? styles.active : '')}>

    <Link href={'/'} legacyBehavior><a aria-label='Edu Abroad Official Logo' className={styles.navlogo + " " + (active? styles.invert  : '')}><img alt='Edu Abroad Site Logo' height={"100px"} width={"52.2px"} src='/edulogo.svg'/></a></Link>

<div className={styles.menuhold}><ul>
{links && links.map((i,d)=>{
    return <li key={i.title} onClick={(e)=>{i.dropdown ? handleToggle(d,e) : ''}} onMouseEnter={(e)=>{setPos(e),i.dropdown ? handleToggle(d,e) : handleClear()}} onMouseLeave={()=>{handleOut()}} ><a href={i.link}>{i.title}</a>
    {i.dropdown ? 
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.22 8.47a.75.75 0 0 1 1.06 0L12 15.19l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L4.22 9.53a.75.75 0 0 1 0-1.06Z" fill="#000"/></svg>
    :''}
    </li>
})}
<a className={styles.button} href="/#applyboard">AI Tool</a>
</ul>
</div>
<div className={styles.toggle + " " + (activeToggle? styles.activetoggle : '')} onClick={()=>{activeToggle?handleSwitchON(false):handleSwitchON(true)}}><svg className={styles.ham} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
<div className={styles.mobmenu + " " + (activeToggle?styles.activemenu : '') + " " + (toggle && toggle != undefined ? styles.sub :'')}>
<ul>
{links && links.map((i,d)=>{
    return <li className={toggle == d ? styles.togactive : ''}><a href={i.link} onClick={(e)=>{i.dropdown ? handleToggle(d,e) : handleSwitchON(false)}}>{i.title}</a>
    {i.dropdown ? <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" fill="#000"/></svg>:''}
    </li>
})}
<a onClick={()=>{setActiveToggle(false)}} className={styles.button} href="/#applyboard">AI Tool</a>
</ul>

</div>
<div className={styles.submenu + " " + (toggle ? styles.activesub : '')} >
    <div className={styles.closesub} onClick={()=>{setToggle()}}>
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" fill="#ffffff"/></svg>
    </div>

    {sublinks && toggle && sublinks[toggle].map((i,d)=>{
return <Link href={`/${i.slug}`}><li onClick={()=>{activeToggle?handleSwitchON(false):handleSwitchON(true)}} style={{animationDelay:`${d+3}00ms`}}>{i.icon ? <img src={i.icon}/>:''}{i.title}</li></Link>
    })}
</div>
</>)
}

export default Navbar;