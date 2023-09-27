import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {useState,useEffect} from 'react'
import styles from './Register.module.css'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Notifications from '../components/Notification'
import YouTube from 'react-youtube';
import axios from 'axios';
import Section from '../components/Section'
import qs from 'qs';
const inter = Inter({ subsets: ['latin'] })
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import Switcher from '../components/Switcher'
import CustomSelect from '../components/CustomSelect'
import DefaultLayout from '../layouts/DefaultLayout'
import { supabase } from '../utils/supabaseClient'

export default function Home() {

const [isSubmitted,setSubmitted] = useState(false)
  const [scrolled,setScrolled] = useState();
const [favicon,setFavicon] = useState('/favicon_ipm.svg');
const [students,setStudents] = useState(5355)
const [loader,setLoader] = useState(false);
const [currentSub,setSub] = useState('Register Now')
const [activePopup,setActivePopup] = useState(false);
const [notificationText,setNotificationText] = useState();
const [timeoutId, setTimeoutId] = useState(null);
const [datahtml,setHtml] = useState();
const [formData,setFormData] = useState();
const [mentors,setMentors] = useState([]);
const years = [{
  title:'2023',
  value:'2023'
},
{
  title:'2024',
  value:'2024'
},
{
  title:'2025',
  value:'2025'
},
]

const testimonials =[{
  icon:'<svg width="44" height="44" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-.905.882a6.5 6.5 0 0 0-9.441 7.43l-3.96 2.082c-.99.52-2.147-.32-1.958-1.424l.9-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Zm3.49 10.872a2 2 0 0 1-1.441 2.497l-.584.144a5.729 5.729 0 0 0 .006 1.807l.54.13a2 2 0 0 1 1.45 2.51l-.187.632c.44.386.94.699 1.484.921l.494-.518a2 2 0 0 1 2.899 0l.498.525a5.281 5.281 0 0 0 1.483-.913l-.198-.686a2 2 0 0 1 1.441-2.496l.584-.144a5.716 5.716 0 0 0-.006-1.808l-.54-.13a2 2 0 0 1-1.45-2.51l.187-.63a5.278 5.278 0 0 0-1.484-.923l-.493.519a2 2 0 0 1-2.9 0l-.498-.525c-.544.22-1.044.53-1.483.912l.198.686ZM17.5 19c-.8 0-1.45-.672-1.45-1.5 0-.829.65-1.5 1.45-1.5.8 0 1.45.671 1.45 1.5 0 .828-.65 1.5-1.45 1.5Z" fill="#222F3D"/></svg>',
 heading:'Top Notch Service'

},
{
  icon:'<svg width="44" height="44" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 14.001a1.5 1.5 0 0 1 1.493 1.356L15 15.5v.17a1.75 1.75 0 0 0-1.988.345l-2.5 2.501a1.75 1.75 0 0 0 0 2.475l.683.681c-.897.233-1.84.327-2.695.327-2.722 0-6.335-.956-6.495-4.27L2 17.5v-2a1.5 1.5 0 0 1 1.356-1.493L3.5 14l10 .001Z" fill="#222F3D"/><path d="m14.78 17.783-1.219 1.22h6.878l-1.22-1.22a.75.75 0 0 1 1.061-1.06l2.5 2.502a.75.75 0 0 1 0 1.06l-2.5 2.499a.75.75 0 0 1-1.06-1.061l1.22-1.22h-6.88l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.498a.75.75 0 0 1 0-1.061l2.5-2.501a.75.75 0 1 1 1.06 1.06Z" fill="#222F3D"/><path d="M20.988 16.016 22 17.03V15.5l-.007-.145A1.5 1.5 0 0 0 20.5 14h-5.012l.113.162c.25.387.399.844.399 1.338v2l-.007.28a5.52 5.52 0 0 1-.015.223h2.19a1.75 1.75 0 0 1 2.82-1.987ZM8.5 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9ZM17.5 5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" fill="#222F3D"/></svg>',
 heading:'Mentored by Experienced Professionals'

}
,
{
  icon:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 3a1 1 0 0 0 0 2h12a1 1 0 1 0 0-2H6ZM10.354 13.701l.099.085.799.8v-1.957l-.002-.026V9.414l-.8.8-.097.085-.008.006a1 1 0 0 1-1.399-1.4l.006-.007.084-.098 2.354-2.357c.18-.273.505-.443.86-.443.324 0 .62.14.806.368l.005.007.046.064L15.465 8.8l.085.098.005.008a1 1 0 0 1 .01 1.177l-.006.008-.099.117-.106.091-.007.006a1 1 0 0 1-1.177.01l-.009-.007-.11-.093-.801-.801v1.957l.002.026v3.19l.794-.795a1 1 0 0 1 1.303-.097l.007.006.098.085.007.006a1 1 0 0 1 .096 1.302l-.005.008-.085.098-2.354 2.356a1.023 1.023 0 0 1-.86.444c-.356 0-.681-.17-.86-.443l-2.348-2.35a1 1 0 0 1 1.302-1.512l.008.006ZM5 20a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" fill="#222F3D"/></svg>',
 heading:"Find what's right fit for you"

},
{
  icon:'<svg width="44" height="44" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.25 13.5h-4a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 1.5 0V12h3.25a.75.75 0 0 1 0 1.5ZM12 2C6.478 2 2 6.478 2 12s4.478 10 10 10 10-4.478 10-10S17.522 2 12 2Z" fill="#222F3D"/></svg>',
 heading:'24x7 Support'

},
{
  icon:'<svg width="44" height="44" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.836 2.034c.112.038.222.084.329.136l1.283.632a1.25 1.25 0 0 0 1.104 0l1.283-.632a2.75 2.75 0 0 1 3.681 1.253l.074.162.063.167.46 1.353c.125.368.414.656.781.781l1.354.46a2.75 2.75 0 0 1 1.581 3.819l-.631 1.283a1.25 1.25 0 0 0 0 1.104l.631 1.283a2.75 2.75 0 0 1-1.581 3.818l-1.354.46a1.25 1.25 0 0 0-.78.781l-.461 1.354a2.75 2.75 0 0 1-3.818 1.581l-1.283-.631a1.25 1.25 0 0 0-1.104 0l-1.283.631a2.75 2.75 0 0 1-3.818-1.581l-.46-1.354a1.25 1.25 0 0 0-.782-.78l-1.353-.461a2.75 2.75 0 0 1-1.582-3.818l.632-1.283a1.25 1.25 0 0 0 0-1.104l-.632-1.283a2.75 2.75 0 0 1 1.582-3.818l1.353-.46a1.25 1.25 0 0 0 .781-.782l.46-1.353a2.75 2.75 0 0 1 3.49-1.718Zm5.633 6.935-5.419 5.42-1.974-2.37a.75.75 0 1 0-1.152.96l2.5 3a.75.75 0 0 0 1.106.051l6-6a.75.75 0 1 0-1.06-1.06Z" fill="#222F3D"/></svg>',
 heading:'Easy to Enroll & Get Started'

},
]

const heading=['Register Now','Its Free','Limited Seats','Best Abroad Career Consultancy']
function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke) {

  console.log(arguments)

  var id = Date.now();
  var data = JSON.stringify({
      "projectKey": "VW50aXRsZSBQcm9qZWN0MTY1MDAxMzUxMDU5MQ==",
      "audienceId": id,
      "name": username,
      "email": u_email,
      "mobile": u_mobile,
      "ios_fcm_token": "",
      "web_fcm_token": "",
      "android_fcm_token": "",
      "profile_path": "",
      "active": "",
      "audience_id": "",
      "paramList": [{
              "paramKey": "source",
              "paramValue": ""
          },
          {
              "paramKey": "city",
              "paramValue": u_city
          },
          {
              "paramKey": "postcode",
              "paramValue": ""
          },
          {
              "paramKey": "total_amount",
              "paramValue": ""
          },
          {
              "paramKey": "abondon_cart",
              "paramValue": true
          },
          {
              "paramKey": "preparing_for_which_year",
              "paramValue": u_year
          },
          {
              "paramKey": "subject",
              "paramValue": ""
          },
          {
              "paramKey": "formurl",
              "paramValue": linke
          },
          {
              "paramKey": "formname",
              "paramValue": "EduAbroad Main Landing Page"
          }
      ]
  });
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {

      if (this.readyState === 4) {
          
          setLoader(false)
          setNotification('Submitted Successfully')
          setSubmitted(true)

      }
  });
  xhr.open("POST", "https://api.cronberry.com/cronberry/api/campaign/register-audience-data");
  xhr.setRequestHeader("Content-Type", "application/json");


  xhr.send(data);
}

async function getMentors(){


    const {data,error} = await supabase.from('mentors').select('*');

    if(data){
console.log(data)
setMentors(data && data.map((i,d)=>{
    return {
        fullname:i.title,
        image:i.image,
        collegeimage:i.collegeimage
    }
}))

    }
    else if(error){
        setNotification('error getting mentors')
    }

}

useEffect(()=>{
    getMentors()
    console.log('d')
},[])

const slides = [
 
  {
  image:'/EduAbroad.webp',
  alt:"Edu Abroad Career Consultant "
},{
  image:'/rvw.webp',
  alt:'Edu Abroad Career Consultant'
}]
const faqs=[
  {
    question:"When to get started with the application process?", 
    answer:'If you want to take our suggestion, then you must start your application process 6-8 months in advance. As application deadlines for universities, programs and courses differ, you are advised to check the official website of the university or you may contact education experts who can guide you throughout your application process.    ',   
  },
  {
    question:"What are the basic documents required to make an application?", 
    answer:"<ul>\r\n\t<li style=\"list-style-type:disc\"><a href=\"https://leverageedu.com/blog/category/resume/\" style=\"text-decoration:none\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">CV</span></span></span></a></li>\r\n\t<li style=\"list-style-type:disc\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Work experience if any</span></span></span></li>\r\n\t<li style=\"list-style-type:disc\"><a href=\"https://leverageedu.com/blog/category/lor/\" style=\"text-decoration:none\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Letter of Recommendation (LOR</span></span></span></a><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">)</span></span></span></li>\r\n\t<li style=\"list-style-type:disc\"><a href=\"https://leverageedu.com/blog/category/sop/\" style=\"text-decoration:none\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Statement of Purpose (SOP)</span></span></span></a></li>\r\n\t<li style=\"list-style-type:disc\"><a href=\"https://leverageedu.com/blog/english-proficiency-test/\" style=\"text-decoration:none\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">English Proficiency Tests</span></span></span></a></li>\r\n\t<li style=\"list-style-type:disc\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Financial proof to bear living expenses, visa application fees and university tuition fees</span></span></span></li>\r\n\t<li style=\"list-style-type:disc\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Passport photograph, income proof residential proof, and photo ID</span></span></span></li>\r\n\t<li style=\"list-style-type:disc\"><span style=\"font-size:12pt\"><span style=\"font-family:Arial\"><span style=\"color:#000000\">Travel documents may include health insurance, passport, age proof, and vaccination proof</span></span></span></li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n",   
  },
  {
    question:"How will Edu Abroad guide me on my study abroad journey?", 
    answer:'Edu Abroad has an experienced team of international experts who’ve been helping students to pursue their dreams of studying abroad. Most of these students are international students thus we can help you with end-to-end assistance from the application process to accommodation.',   
  },
  {
    question:"Who accepts IELTS scores?", 
    answer:'IELTS is accepted by over 11,000 organizations in 140 countries.',   
  },
  {
    question:"Can I avail one on one clearing doubt sessions?", 
    answer:'Students should contact Edu Abroad to book a one-on-one doubt clearing session with a mentor.',   
  },
  {
    question:"How do I access live classes?", 
    answer:'On successful completion of enrolment process, students receive a Edu Abroad Zoom ID & password to join Edu Abroad live platform and to attend live, online classes.',   
  },
  {
    question:"Is there any contact number to reach you?", 
    answer:'Call us at 9044442989 to book a FREE 30-minutes counseling session today.',   
  }


]

const reviews=[{
  image:'/r4.jpg',
  fullname:'Titiksha Singh',
  college:'University of Buffalo',
  title:'Very Helpful Faculty',
  review:'Mentors at Edu Abroad are extremely dedicated and hard working. They make it a point for every student to be equally interactive in the training sessions. Mock interviews by experts from industry helped a lot.',
  country:'USA'
},{

  image:'/r6.jpg',
  fullname:'Anannya',
  college:'SOAS  - University of London',
  title:'Extremely Supportive Faculty',
  review:'My experience with Edu Abroad was truly memorable, the team was extremely supportive. They always made sure that all my doubts were cleared. It is for them that I have reached where I am now.',
  country:"UK"
},
{

  image:'/r5.png',
  fullname:'Dr.Naman Tandon',
  college:'Universite de Paris',
  country:'France',
  title:'Best Career Guidance',
  review:'I would like to thank all the mentors of Edu Abroad who helped me throughout my journey. They helped me by motivating me and getting all my doubts clear. They helped me in clearing all my concepts. The study materials of Edu Abroad are very helpful and beneficial and the practice questions are of the level of actual IELTS exam. '
}
]

function setNotification(de){
  if(timeoutId){
    clearTimeout(timeoutId)
  }

  setNotificationText(de);
   const id = setTimeout(()=>{setNotificationText(),setTimeoutId(null),console.log('notcall')},2500);
   setTimeoutId(id)
}
useEffect(()=>{
var index = 0;

const r = setInterval(()=>{
  if(index < heading.length - 1){
    index++;
  setSub(heading[index])}else{
    index = 0;
    setSub(heading[0])
  }
},1000)

setTimeout(()=>{
  setActivePopup(true)
},5000)
setTimeout(()=>{
setFavicon('/favicon_active.svg')



},1000)

return ()=>{
  clearInterval(r);
}
},[])
useEffect(() => {
  const interval = setInterval(() => {
    setStudents(students + 1);
  }, 8000); // 60000 milliseconds = 1 minute
  return () => clearInterval(interval);
}, [students]);

const opts ={
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls:0,
    modestbranding:1,
    rel:0,
    loop:1,
  },
}
async function handleAPI(a,b,c){
console.log("api")
 await axios.post('/api/hello',{
   fullname:a,
   event:"Free Consulation",
   user_id:c,
   recipient:b,
 }).then(res=>{
  setLoader(false)
 }).catch(res=>{
  setLoader(false)
 })
}

const features = [<>Complete<span className={styles.blue}>&nbsp;Assistance</span></>,<>Mentoring by<span className={styles.blue}>&nbsp;Experienced Professionals</span></>,<>Dedicated IELTS<span className={styles.blue}> Course</span></>,<>Properly Planned <span className={styles.blue}> Career Guidance</span></>];
const [mobile,setMobile] = useState("desktop");
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


useEffect(()=>{

  window.addEventListener('scroll',()=>{
  
      if(window.scrollY > 1080){
          setScrolled(true)
      }else{
          setScrolled(false)
      }
  })})



  async function triggerInterakt(){
    axios.post('./api/interakt',{
      userId: Date.now(),
      phoneNumber: formData.phone,
      countryCode: "+91",
      event: "Campaign Notification",
      name: formData.fullname,
      email: formData.email,
  
      tag: "Landing Page"
    }).then(res=>{
      console.log(res)
    }).catch(res=>{
      console.log(res)})
  }
async function SubmitContact(){

  if(formData == undefined){
    setNotification('All Fields are empty')
    return null
  }
  /* console.log(formData && Object.values(formData).filter((i,d)=> i.length > 2).length) */
  if (!formData.fullname || formData.fullname.trim() === '') {
    setNotification('Fullname field is empty');
    return null;
  }

  // Check email
  if (!formData.email || formData.email.trim() === '') {
    setNotification('Email field is empty');
    return null;
  }

  // Validate the email format using a regular expression
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(formData.email)) {
    setNotification('Email is not valid');
    return null;
  }

  // Check phone
  if (!formData.phone || formData.phone.trim() === '') {
    setNotification('Phone field is empty');
    return null;
  }

  // Validate the phone number
  const phoneRegex = /^[0-9]{10}$/; // Change the regex pattern as needed
  if (!phoneRegex.test(formData.phone)) {
    setNotification('Phone number is not valid');
    return null;
  }

  // Check year
  if (!formData.year || formData.year.trim() === '') {
    setNotification('Year field is empty');
    return null;
  }

  // Validate the year
  const year = parseInt(formData.year);
  if (isNaN(year) || year < 1900 || year > 2099) {
    setNotification('Year is not valid');
    return null;
  }

  // Check city
  if (!formData.city || formData.city.trim() === '') {
    setNotification('City field is empty');
    return null;
  }

    setLoader(true)
    
    /* TestApi(); */
  /*   triggerInterakt(); */
      /* await axios.post('/') */
triggerInterakt();
      cronberryTrigger(formData.fullname,formData.email,formData.phone,formData.year,formData.city,'https://goeduabroad.com');
      const {data,error} = await supabase.from('leads').insert({
        name:formData.fullname,
email:formData.email,
phone:formData.phone,

subject:formData.goal,
source:'Register Page'
    }).select();

  
 
 
}

async function TestApi(){
const data = {
  client_id:3158,
  security_code:'d1R9fF5mfiE=',
 course_id:35736,
 category_id:835941,
  action:'coursedetail',
  full_name:formData.fullname,
  city:formData.city,
  mobile_number:formData.phone,
  email:formData.email

};
  await axios.post('/api/tcy',data
    
  ).then(res=>{
    
    handleAPI(formData.fullname,formData.email,res.data)
  }).catch(res=>{
    handleAPI(formData.fullname,formData.email,res.data)
  })
}

async function studentlogin(d){

  await axios.post('https://www.tcyonline.com/api/erp_request.php',qs.stringify({
    client_id: 3158,
    security_code: 'd1R9fF5mfiE=',
    
    action: 'login',
    user_id:d,
  }
  ),{
    headers:{
      'Content-Type':'application-x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*'
    }
  }).then(res=>{
    
  }).catch(res=>{
    console.log(res)
  })
}
function validatePhone(phone) {
  const re =  /^(\+\d{1,4})?(?!0+\s+,?$)\d{10}\s*,?$/;
  return re.test(phone);
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
  return (
    <>
      <Head>
        <title>Edu Abroad | {currentSub}</title>
        <meta name="description" content="IPM Careers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
      <DefaultLayout hideAI={true} navbar>
      <main className={styles.main}>
        {isSubmitted? <div className={styles.modal}>
          <div className={styles.modalinner}>
          <h2>Thank You !!</h2>
          <h3>Choosing Us today is the best decision you could have made yet.</h3>
          <p>We've received your details</p>
          <p>Our Executive will get back to you shortly.
          </p>

          <p>For Quick Assitance you can call us on : <a href="tel:+919616383524">+91 96163 83524</a></p>
          <a href="/#courses" className={styles.submit}>Explore Our Courses</a><a className={styles.submit} href="/">Visit Our Website</a>
          </div></div>:''}
      {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
        
{loader? <div className={styles.loader}>

<svg width="197px" height="197px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="var(--brand-col2)" stroke-width="3" r="27" stroke-dasharray="127.23450247038662 44.411500823462205">
  
</circle>
</svg>
<p>Sending your wish to IIM Gods</p>
</div> :''}
        <div className={styles.hero}>
        <Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={true}
      speed={1200}
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


     
      
      {slides && slides.map((item,index)=>{

return(<>

<SwiperSlide key={index}><img alt={item.alt} className={styles.slideimage} src={item.image}/></SwiperSlide>

</>)
})} 


    </Swiper>


        </div>

        

          <section className={styles.maincont} id="form">

            <div className={styles.grad1}></div>
            <div className={styles.grad2}></div>
<div className={styles.c1}>
<h2>India's Leading Study Abroad Consultant</h2>
<p>Start your journey with us & start your career in abroad without any hassle.</p>
<div className={styles.trust}>TRUSTED BY THOUSANDS OF STUDENTS</div>
<Switcher features={features}/>
<div className={styles.hold}>
  <p>Students Registered <br/><span className={styles.numbers}>{students}</span></p>
  <p>Admissions<br/><span className={styles.numbers}>{Math.floor(students/3)}</span></p>
  <p>Hours Served<br/><span className={styles.numbers}>{students*3}</span></p>
</div>
<div>
  <div className={styles.progress}>
    <div className={styles.progress_inner} style={{width:formData ? Object.keys(formData).length*100/5 +"%" : '0%'}}><p>Form Progress : {formData ? Object.entries(formData).length*100/5 +"%" : '0%'}</p></div>
 {formData && Object.keys(formData).length*100/5 == 100 ?  <p style={{right:'0',left:'unset'}}>Done</p>:''}
  </div>
</div>
</div>
<div className={styles.c2}>
  <div className={styles.formcont}>
<h1 className={styles.team_heading}>Fill out the form to Schedule a FREE Consultation with our Expert.</h1>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>
<input name={"city"} className={styles.input} placeholder={"Enter your City"} type={"text"} value={formData && formData.city} onChange={(e)=>{setFormData(res=>({...res,city:e.target.value})) }}/>
<CustomSelect z={9} full="true" defaultText="When are you planning to move abroad for Studies?" noPadding={true} objects={years} setSelect={(r)=>{setFormData(res=>({...res,year:r}))}}/>
{formData && formData.city && formData.fullname && formData.phone && formData.email && formData.year? '':<p className={styles.error}>Please fill all the fields</p>}
{/* <div onClick={TestApi} className={styles.submit}>TEST</div> */}
<div onClick={SubmitContact} className={styles.submit}>SUBMIT</div>
<div className={styles.encrypt}>
<svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 93.63 122.88"
    
  >
    <defs>
      <style>{".cls-2{fill-rule:evenodd;fill:#36464e}"}</style>
    </defs>
    <title>{"padlock"}</title>
    <path
      d="M6 47.51h81.64a6 6 0 0 1 6 6v63.38a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V53.5a6 6 0 0 1 6-6Z"
      style={{
        fillRule: "evenodd",
        fill: "#fbd734",
      }}
    />
    <path
      className="cls-2"
      d="m41.89 89.26-6.47 16.95h22.79l-6-17.21a11.79 11.79 0 1 0-10.32.24ZM83.57 47.51H72.22v-9.42a27.32 27.32 0 0 0-7.54-19 24.4 24.4 0 0 0-35.73 0 27.32 27.32 0 0 0-7.54 19v9.42H10.06v-9.42a38.73 38.73 0 0 1 10.72-26.81 35.69 35.69 0 0 1 52.07 0 38.67 38.67 0 0 1 10.72 26.81v9.42Z"
    />
  </svg>
<p>Your Data is End-to-End Encrypted!</p>
</div>
</div>
</div>
          </section>
       

        <Section title={"Words by: Our Students"} color="var(--brand-col1)" align="left">
<div className={styles.parent}>
<div className={styles.col1}>
<h2>Listen what our students have to say about us.</h2>
<p>Our students are thrilled with the classes that we offer. They consistently express their satisfaction with the quality of the instruction, the engaging curriculum, and the supportive learning environment. They appreciate the individualized attention that they receive from our dedicated teachers, and they are making steady progress in their studies. Overall, our students are incredibly happy with the education that they are receiving, and it shows in their enthusiasm and dedication to their studies.</p>
{/* <ul className={styles.words}>
	<li>Many of our students have commented on how much they enjoy the interactive nature of the classes, with a variety of activities and group work that keeps them engaged and motivated.</li>
	<li>The feedback that we receive from our students consistently highlights the supportive and inclusive culture of our school. They feel welcomed and valued as members of our community, and they appreciate the inclusive and respectful atmosphere that our teachers create.</li>
	<li>In addition to the positive comments about the classes themselves, our students also often express appreciation for the extra support that is available to them. Whether it&#39;s through tutoring, office hours, or other resources, our students know that they can get the help that they need to succeed.</li>
	<li>Overall, our students are extremely satisfied with the education that they are receiving, and we are continually working to improve and enhance the learning experience for all of our students.</li>
</ul> */}


</div>
<div className={styles.col2}>
<div className={styles.yt}>
<YouTube className='embed-container' title='' videoId="3erxXGVy08Y" opts={opts}  /></div>
</div>
</div>

        </Section>
       
        <Section title={"Know : Your Mentors"} color="var(--brand-col1)" align="left">
        <div className={styles.parent2}>

        {mentors && mentors.map((i,d)=>{
return <div className={styles.card}>
    <div className={styles.circ}></div>
  {/* <div alt={i.role} className={styles.bg} style={{backgroundImage:"url("+i.bg+")"}}></div> */}
  <img alt={i.fullname} src={i.image}/>
  <h2>{i.fullname}</h2>
  {i.collegeimage ? <img className={styles.colimg} src={i.collegeimage}/>:''}
  {i.role ? <p className={styles.para}>{i.role}</p>:''}
  {i.role2 ? <p className={styles.para}>{i.role2}</p>:''}
</div>

})}
         
          
          </div></Section>
          
        
   
   
   <Section title={"Why choose: Edu Abroad?"} color="var(--brand-col1)" align="left" visible="true">
   <Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={mobile === "mobile" ? 1.3 : mobile === "tablet" ? 2.5 : 4.5}
      loop={true}
      autoplay={true}
      loopFillGroupWithBlank={false}
      pagination={{ clickable: true }}
      centeredSlides={mobile === "desktop" || mobile === "tablet" ? false : false}
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


     
      
      {testimonials && testimonials.map((i,index)=>{

return(<>

<SwiperSlide key={index}>
<div className={styles.testimonial_card}>

  <div dangerouslySetInnerHTML={{__html:i.icon}} style={{marginRight:"15px"}}></div>
  <h2>{i.heading}</h2>
  <div className={styles.grad1}></div>
  <div className={styles.grad2}></div>
</div>

</SwiperSlide>

</>)
})} 


    </Swiper>

   </Section>
   <Section title={":Testimonials"} color="var(--brand-col1)" align="left" visible="true">

<div className={styles.reviewholder}>

{reviews && reviews.map((i,d)=>{
  return <div className={styles.rcard} >
    <div className={styles.shape}></div>
    <div className={styles.shape2}></div>
<div className={styles.rcard_profile}>
  <img alt={i.fullname} src={i.image}/>
    <div>
    <h2>{i.fullname}</h2>
    <p>{i.college}</p>
    <p className={styles.country}>{i.country}</p>
    </div>
    </div>
    <div className={styles.rcontent}>
    <p className={styles.rtitle}>{i.title}</p>
    <p>{i.review}</p>
    
    </div>
  </div>
})}

</div>
  


   </Section>
   {/* <Section title={"Our Previous:Results"} color="var(--brand-col1)" align="center" visible="true">
 <img alt="EduAbroad Results"  className={styles.results}  src={'/'}/>

   </Section> */}
   <Section title={"Frequently:Asked Questions"} color="var(--brand-col1)" align="left" visible="true" >
   <FAQ items={faqs}/>
   </Section>

{/* <button onClick={()=>{handleAPI()}} >Test</button> */}

{/* <div dangerouslySetInnerHTML={{__html :datahtml}}></div> */}
<div className={styles.spacer}></div>
      </main>
      </DefaultLayout>
    </>
  )
}
