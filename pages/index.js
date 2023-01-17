import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './Home.module.css'
import {useState,useEffect} from 'react';
import DefaultLayout from '../layouts/DefaultLayout'
import Section from '../components/Section'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import CustomSelect from '../components/CustomSelect';
import Marquee from "react-fast-marquee";

export default function Home() {
  const [mobile,setMobile] = useState('desktop');


const whyus =[
  {
    title:'Top Notch Service',
    image:'https://www.theladders.com/wp-content/uploads/manager-office-190723.jpg'
  },
  {
    title:'Broker Free',
    image:'https://top10stockbroker.com/wp-content/uploads/2017/09/Full-Service-Broker-vs-Discount-Broker.jpg'
  },
  {
    title:'Mentored by Experienced Professionals',
    image:'https://img.freepik.com/free-photo/successful-happy-business-team_53876-20936.jpg?w=2000'
  },
  {
    title:'Competitive Pricing',
    image:'https://s3.us-east-1.amazonaws.com/co-assets/assets/images/_fbTw/pricing-models.jpg'
  },
  {
    title:'24x7 Support',
    image:'https://www.klipfolio.com/gatsby-files/static/795e3663f48593aafe53635bcc62c0b9/25-must-have-kpis-for-call-centre-managers-banner.jpg'
  },
  {
    title:'Easy to Enroll & Get Started',
    image:'https://scottflansburg.com/wp-content/uploads/2021/07/How-to-Quickly-Understand-Mathematical-Ideas-in-Just-Three-EASY-STEPS.jpg'
  }
]
const slides2 =[
{
  title:'Mr.Rosewood',
  college:'Harvard',
  role:'Executive Director',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  role:'Executive Director',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  role:'Executive Director',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  role:'Executive Director',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
}

]
const [formData,setFormData] = useState();
function validatePhone(phone) {
  const re =  /^(\+\d{1,4})?(?!0+\s+,?$)\d{10}\s*,?$/;
  return re.test(phone);
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const benefits=[{
  image:'/precise.svg',
  benefit:'Precise Plan'
},
{
  image:'/award.svg',
  benefit:'Top Notch Services'
},
{
  image:'/gift.svg',
  benefit:'FREE Consulation'
},
{
  image:'/shield.svg',
  benefit:'Trusted'
}]
  useEffect(()=>{
  
    function setWidth(){
      
      if(window.innerWidth < 768){
        setMobile('mobile');
      
      }
      else if(window.innerWidth < 968){
        setMobile('tablet')
      }
      else{
        setMobile('desktop');
      }
    }
    window.addEventListener("resize",(e)=>{
  setWidth()
    })
  
    window.addEventListener('load',()=>{
      setWidth();
    })
  },[])
const herocountries = [
  {
    title:'Antarctica',
    image:'/ant.png',
    color:'skyblue',
  },
  {
    title:'Australia',
    image:'/aus.png',
    color:'skyblue',
  },
  {
    title:'United Kingdom',
    image:'/uk.png',
    color:'skyblue',
  },
  {
    title:'Japan',
    image:'/jp.png',
    color:'skyblue',
  },
  {
    title:'London',
    image:'/uk.png',
    color:'skyblue',
  },
  {
    title:'United States',
    image:'/us.png',
    color:'skyblue',
  },

]

const partners=[
  {
    image:'/1.png',
    title:'XYZ University',
    image2:'/2.png',
    title2:'XYZ University',
  },
  {
    image:'/3.png',
    title:'XYZ University',
    image2:'/4.png',
    title2:'XYZ University',
  },
  {
    image:'/5.png',
    title:'XYZ University',
    image2:'/6.png',
    title2:'XYZ University',
  },
  {
    image:'/7.png',
    title:'XYZ University',
    image2:'/8.png',
    title2:'XYZ University',
  },
  {
    image:'/9.png',
    title:'XYZ University',
    image2:'/10.png',
    title2:'XYZ University',
  },
  {
    image:'/11.png',
    title:'XYZ University',
    image2:'/12.png',
    title2:'XYZ University',
  },
  {
    image:'/13.png',
    title:'XYZ University',
    image2:'/14.png',
    title2:'XYZ University',
  }
]
const countries = [
  
  {
title:'Brazil',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
stars:4,
image:'/brazil.webp'
},
{
  title:'Canada',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  stars:4,
  image:'/canada.webp'
  },
  {
    title:'New York',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    stars:4,
    image:'/newyork.webp'
    },
    {
      title:'Japan',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      stars:4,
      image:'/japan.webp'
      }

]
const authorities =[

  {
    image:'https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png',
    title:'NASA'
  },
  {
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_of_India_logo.svg/1200px-Government_of_India_logo.svg.png',
    title:'Indian Government'
  },
  {
    image:'https://www.un.org/youthenvoy/wp-content/uploads/2014/09/unesco-logo-260px.jpg',
    title:'UNESCO'
  },

]

const goals = [
  {
  
    title:'Study in Abroad',
     value:'Study in Abroad',
    
  },
  
  {
  
    title:'VISA Application',
     value:'VISA Application',
    
  },
  {
  
    title:'Career Counselling',
     value:'Career Counselling',
    
  },
  {
  
    title:'Profile Design',
     value:'Profile Design',
    
  },
  {
  
    title:'Test & Interview Preparation',
     value:'Test & Interview Preparation',
    
  },
  {
  
    title:'Scholarship & Financing',
     value:'Scholarship & Financing',
    
  }
  ]


const universities = [
  
  {
title:'Cambridge University',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

image:'/camb.webp'
},
{
  title:'Harvard University',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  image:'/harvard.webp'
  },
  {
    title:'John Hopkins',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    
    image:'/hopkins.webp'
    },
    {
      title:'MIT',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      
      image:'/mit.webp'
      }

]
async function SubmitContact(){

}
  return (
    <>
      <Head>
        <title>Edu Abroad | Study in Abroad</title>
        <meta name="description" content="Study in Abroad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/edufavicon.svg" />
        
      </Head>
      <DefaultLayout>
        <div className={styles.hero}>
          <video muted playsInline="true" autoplay="true" loop="true"><source src='/v2.mp4'/></video>
<div className={styles.mask}></div>
<div
className={styles.content}>
  <h2><span className='b1'>An Initiative to</span><br/>Build Career Abroad</h2>
  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p> */}
<div className={styles.getstarted}><input className={styles.input} placeholder="Enter your Phone"></input><button>Get Started</button></div>
<div className={styles.top}>
  <h3>Top Countries to Study Abroad :</h3>
  <div className={styles.conts}>
{herocountries && herocountries.map((i,d)=>{

  return <div className={styles.cont}><img src={i.image}/> <p>{i.title}</p></div>
})}</div>
</div>
</div>
        </div>
      <Section title="Who are we?" align="left" color="var(--brand-col1)">
{/* <img className={styles.right} src={'/rightimage.png'}/> */}
<div className={styles.who}>

  <div className={styles.col1}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
  <div className={styles.col2}></div>
</div>
      </Section>
      
      <Section title="Results" align="center" color="var(--brand-col1)">




      <Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      loopedSlides={5}
      autoplay={true}
      slidesPerGroup={1}
      simulateTouch={true}
      pagination={{ 
        el:".paginate2",
        
        clickable: true }}
      
      centeredSlides={false}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {countries && countries.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.rcard} >
      <img src={i.image}/>
      <div className={styles.cric} style={{backgroundImage:"url("+i.image+")"}}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,160)}...</p>
      <div className={styles.stars}>
      {Array(i.stars ? i.stars : 0).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div>
    
    </div>
    </div></SwiperSlide>
  })

  }

 </Swiper>

<div className={"paginate2"}></div>









      </Section>
      <Section title="Courses" align="center" color="var(--brand-col1)">




      <Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      loopedSlides={5}
      autoplay={true}
      slidesPerGroup={1}
      simulateTouch={true}
      pagination={{ 
        el:".paginate",
        
        clickable: true }}
      
      centeredSlides={false}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {universities && universities.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.ccard} >
      <img src={i.image}/>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,160)}...</p>
      <div className={styles.stars}>
      {Array(i.stars ? i.stars : 0).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div>
    <div className={styles.buttons}>
<a>Enroll Now</a>
<a>Read More</a>

    </div>
    </div>
    </div></SwiperSlide>
  })

  }

 </Swiper>

<div className={"paginate"}></div>






      </Section>
      <Section title="You are in :Safe Hands" align="left" color="var(--brand-col1)">
<div className={styles.whyus}>
{whyus && whyus.map((i,d)=>{

  return <div className={styles.why} style={{backgroundImage:"url("+i.image+")"}}>
    <div className={styles.mask2}></div>
    <div className={styles.mask3}></div>
    <p>{i.title}</p></div>
})}
</div>
</Section>
<Section title="Top Cities of 2023 to : Study Abroad" align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ clickable: true }}
      
      centeredSlides={false}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {countries && countries.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars}>
      {Array(i.stars).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div></SwiperSlide>
  })

  }

 </Swiper>
</Section>{/* 
<div className={styles.students}>
<div className={styles.left}>
<h2>Join 9000+ students <br/>who joined <span className='b1'>Edu Abroad</span></h2>
<button onClick={()=>{}}>Join Now</button>
</div>
<div className={styles.right}>
  <div className={styles.circle}><img src='/gras.png'/></div>
</div>
</div> */}

<Section title="Top Universities of this month : to Study Abroad" align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ clickable: true }}
      
      centeredSlides={false}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {universities && universities.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars}>
      {Array(i.stars ? i.stars : 0).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div></SwiperSlide>
  })

  }

 </Swiper>
</Section>
<Section title="Partner Universities" align="center" color="var(--brand-col1)">
<Marquee speed={80} gradientWidth={80}>
  {partners && partners.map((i,d)=>{

    return <div className={styles.partners}>
      <div className={styles.university}><img src={i.image}/><p>{i.title}</p></div>
      <div className={styles.university}><img src={i.image2}/><p>{i.title2}</p></div>
    </div>
  })}
</Marquee>
</Section>

<Section title="Mentors" align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 : 70}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ clickable: true }}
      
      centeredSlides={true}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      {slides2 && slides2.map((item,index)=>{

return(<>

<SwiperSlide key={index}><a href={`/courses/${item.slug}`} className={styles.dcard} style={{backgroundImage:"url("+item.image+")"}}>
  
  <div className={styles.dcardcontent}>
    <img className={styles.colimg} src={item.collegeimage}/>
    <div>
  <h2>{item.title}</h2>
  <p>{item.role}</p></div>
  </div>
  <div className={styles.stars}>

  </div>
  </a></SwiperSlide>

</>)
})} 


    </Swiper>

</Section>
{/* <div className={styles.authorities}>
<h2 className={styles.heading}>Trusted by Giant Authorities</h2>
<div className={styles.marqueecont}>
<Marquee speed={80}>
  {authorities && authorities.map((i,d)=>{

    return <div className={styles.partners}>
      <div className={styles.university}><img src={i.image}/><p>{i.title}</p></div>
      
    </div>
  })}
  {authorities && authorities.map((i,d)=>{

return <div className={styles.partners}>
  <div className={styles.university}><img src={i.image}/><p>{i.title}</p></div>
  
</div>
})}
</Marquee>
</div>
</div> */}

<div className={styles.formhold}>
        
<div className={styles.formcontent}>
  
<h1>Kickstart your Career Journey in your<br/><span>Dream Country Abroad.</span></h1>
<p className={styles.para}>Includes benefits:</p>
<div className={styles.benefits}>
  {benefits && benefits.map((i,d)=>{
    return <div className={styles.benefit}><div className={styles.bimage}><img src={i.image}/></div><p>{i.benefit}</p></div>
  })}
</div>
</div>
<div className={styles.formcont}>
<h1 className={styles.team_heading}>Plan your Career in Abroad with<strong> Edu Abroad</strong>.</h1>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>

<CustomSelect single={true} z={9} full="true" defaultText="Select your Goal" noPadding={true} objects={goals} setSelect={(r)=>{setFormData(res=>({...res,goal:r}))}}/>
{formData  && formData.fullname && formData.phone && formData.email && formData.goal? '':<p className={styles.error}>Please fill all the fields</p>}
<div onClick={SubmitContact} className={styles.submit}>SUBMIT</div>

</div>
        </div>
<div className={styles.aitool}>
<img src='/collegpano.png'/>
  <h2>Our AI Tool will help you to choose suitable university for yourself</h2>
  <a href="#">Get Started, It's Free !!</a>
</div>
      </DefaultLayout>
    </>
  )
}
