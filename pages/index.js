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
import Marquee from "react-fast-marquee";

export default function Home() {
  const [mobile,setMobile] = useState('desktop');



const slides2 =[
{
  title:'Mr.Rosewood',
  college:'Harvard',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
},
{
  title:'Mr.Rosewood',
  college:'Harvard',
  image:'https://fmipa.um.ac.id/wp-content/uploads/2015/11/team-1-200x200.jpg',
  collegeimage:'/1.png',
}

]

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
image:'/brazil.jpg'
},
{
  title:'Canada',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  stars:4,
  image:'/canada.jpg'
  },
  {
    title:'New York',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    stars:4,
    image:'/newyork.jpg'
    },
    {
      title:'Japan',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      stars:4,
      image:'/japan.jpg'
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

const universities = [
  
  {
title:'Cambridge University',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

image:'/camb.jpg'
},
{
  title:'Harvard University',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  image:'/harvard.jpg'
  },
  {
    title:'John Hopkins',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    
    image:'/hopkins.jpg'
    },
    {
      title:'MIT',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      
      image:'/mit.jpg'
      }

]

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
<div className={styles.mask}></div>
<div
className={styles.content}>
  <h2><span className='b1'>An Initiative to</span><br/>Build Career Abroad</h2>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
<div className={styles.getstarted}><input className={styles.input} placeholder="Enter your email address"></input><button>Get Started</button></div>
<div className={styles.top}>
  <h3>Top Countries to Study Abroad :</h3>
  <div className={styles.conts}>
{herocountries && herocountries.map((i,d)=>{

  return <div className={styles.cont}><img src={i.image}/> <p>{i.title}</p></div>
})}</div>
</div>
</div>
        </div>
      <Section title="About Us" align="left" color="var(--brand-col1)">
{/* <img className={styles.right} src={'/rightimage.png'}/> */}

      </Section>
<Section title="Top Cities of 2023 to : Study Abroad" align="center" color="var(--brand-col1)">

<div className={styles.cardhold}>
  {countries && countries.map((i,d)=>{

    return <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars}>
      {Array(i.stars).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div>
  })

  }

</div>
</Section>
<div className={styles.students}>
<div className={styles.left}>
<h2>Join 9000+ students <br/>who joined <span className='b1'>Edu Abroad</span></h2>
<button onClick={()=>{}}>Join Now</button>
</div>
<div className={styles.right}>
  <div className={styles.circle}><img src='/gras.png'/></div>
</div>
</div>
<Section title="Why Choose :Edu Abroad?" align="left" color="var(--brand-col1)"></Section>
<Section title="Top Universities of 2023" align="center" color="var(--brand-col1)">

<div className={styles.cardhold}>
  {universities && universities.map((i,d)=>{

    return <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars}>
      {Array(i.stars ? i.stars : 0).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div>
  })

  }

</div>
</Section>
<Section title="Partner Universities" align="center" color="var(--brand-col1)">
<Marquee speed={80}>
  {partners && partners.map((i,d)=>{

    return <div className={styles.partners}>
      <div className={styles.university}><img src={i.image}/><p>{i.title}</p></div>
      <div className={styles.university}><img src={i.image2}/><p>{i.title2}</p></div>
    </div>
  })}
</Marquee>
</Section>
<div className={styles.aitool}>
<img src='/collegpano.png'/>
  <h2>Our AI Tool will help you to choose suitable university for yourself</h2>
  <a href="#">Get Started, It's Free !!</a>
</div>
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
  
  <h2>{item.title}</h2>
  
  <div className={styles.stars}>

  </div>
  </a></SwiperSlide>

</>)
})} 


    </Swiper>

</Section>
<div className={styles.authorities}>
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
</div>
      </DefaultLayout>
    </>
  )
}
