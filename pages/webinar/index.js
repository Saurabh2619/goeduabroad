import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {useState,useEffect} from 'react'
import styles from './Webinar.module.css'
import FAQ from '../../components/FAQ'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Notifications from '../../components/Notification'
import YouTube from 'react-youtube';
import axios from 'axios';
import Section from '../../components/Section'
import qs from 'qs';
const inter = Inter({ subsets: ['latin'] })
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import Switcher from '../../components/Switcher'
import CustomSelect from '../../components/CustomSelect'
import DefaultLayout from '../../layouts/DefaultLayout'
import { supabase } from '../../utils/supabaseClient'
import GradientMarquee from '../../components/GradientMarquee'
import Marquee from 'react-fast-marquee'
import { cbKey } from '../../utils/cronBerryKey'
import Offer from '../../components/OfferPopup'
import { getCurrentAndNextTwoYears } from '../../utils/utilityfunctions'

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
const years = getCurrentAndNextTwoYears();

const testimonials =[{
  icon:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 8a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75H6.75Zm.75 3.5v-2h9v2h-9ZM13.75 14a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-3.5Zm.75 2.5v-1h2v1h-2Z" fill="#212121"/><path d="M4 3a2 2 0 0 0-1 3.732V20.25c0 .414.336.75.75.75h16.5a.75.75 0 0 0 .75-.75V6.732A2 2 0 0 0 20 3H4Zm15.5 4v12.5h-8v-4.75a.75.75 0 0 0-.75-.75h-4a.75.75 0 0 0-.75.75v4.75H4.5V7h15Zm-16-2a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5ZM10 19.5H7.5v-4H10v4Z" fill="#212121"/></svg>',
 heading:'2000+ Universities'

},
{
  icon:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999ZM14.939 16.5H9.06c.652 2.414 1.786 4.002 2.939 4.002s2.287-1.588 2.939-4.002Zm-7.43 0H4.785a8.532 8.532 0 0 0 4.094 3.411c-.522-.82-.953-1.846-1.27-3.015l-.102-.395Zm11.705 0h-2.722c-.324 1.335-.792 2.5-1.373 3.411a8.528 8.528 0 0 0 3.91-3.127l.185-.283ZM7.094 10H3.735l-.005.017a8.525 8.525 0 0 0-.233 1.984c0 1.056.193 2.067.545 3h3.173a20.847 20.847 0 0 1-.123-5Zm8.303 0H8.603a18.966 18.966 0 0 0 .135 5h6.524a18.974 18.974 0 0 0 .135-5Zm4.868 0h-3.358c.062.647.095 1.317.095 2a20.3 20.3 0 0 1-.218 3h3.173a8.482 8.482 0 0 0 .544-3c0-.689-.082-1.36-.236-2ZM8.88 4.09l-.023.008A8.531 8.531 0 0 0 4.25 8.5h3.048c.314-1.752.86-3.278 1.583-4.41ZM12 3.499l-.116.005C10.62 3.62 9.396 5.622 8.83 8.5h6.342c-.566-2.87-1.783-4.869-3.045-4.995L12 3.5Zm3.12.59.107.175c.669 1.112 1.177 2.572 1.475 4.237h3.048a8.533 8.533 0 0 0-4.339-4.29l-.291-.121Z" fill="#212121"/></svg>',
 heading:'30+ Countries'

}
,
{
  icon:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6Zm1.5 1.5h7v-1h-7v1Z" fill="#212121"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15ZM5.5 18H19V4.5a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1V18Z" fill="#212121"/></svg>',
 heading:"15000+ Programs"

},
{
  icon:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.209 3.103c-.495-1.004-1.926-1.004-2.421 0L8.43 7.88l-5.273.766c-1.107.161-1.55 1.522-.748 2.303l3.815 3.72-.9 5.25c-.19 1.103.968 1.944 1.959 1.424l4.715-2.48 4.716 2.48c.99.52 2.148-.32 1.96-1.424l-.902-5.25 3.816-3.72c.8-.78.359-2.142-.748-2.303l-5.273-.766-2.358-4.777ZM9.74 8.615l2.258-4.576 2.259 4.576a1.35 1.35 0 0 0 1.016.738l5.05.734-3.654 3.562a1.35 1.35 0 0 0-.388 1.195l.862 5.03-4.516-2.375a1.35 1.35 0 0 0-1.257 0l-4.516 2.374.862-5.029a1.35 1.35 0 0 0-.388-1.195l-3.654-3.562 5.05-.734c.44-.063.82-.34 1.016-.738ZM1.164 3.782a.75.75 0 0 0 .118 1.054l2.5 2a.75.75 0 1 0 .937-1.172l-2.5-2a.75.75 0 0 0-1.055.118Z" fill="#212121"/><path d="M22.836 18.218a.75.75 0 0 0-.117-1.054l-2.5-2a.75.75 0 0 0-.938 1.172l2.5 2a.75.75 0 0 0 1.055-.117ZM1.282 17.164a.75.75 0 1 0 .937 1.172l2.5-2a.75.75 0 0 0-.937-1.172l-2.5 2ZM22.836 3.782a.75.75 0 0 1-.117 1.054l-2.5 2a.75.75 0 0 1-.938-1.172l2.5-2a.75.75 0 0 1 1.055.118Z" fill="#212121"/></svg>',
 heading:'20+ Years of Experience'

},

]

const heading=['Register Now','Its Free','Limited Seats','Best Abroad Career Consultancy']
function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke) {

  

  var id = Date.now();
  var data = JSON.stringify({
      "projectKey": cbKey,

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
              "paramValue": "EduAbroad Webinar Page"
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
  xhr.open("POST", "https://register.cronberry.com/api/campaign/register-audience-data");
  xhr.setRequestHeader("Content-Type", "application/json");


  xhr.send(data);
}

async function getMentors(){


    const {data,error} = await supabase.from('mentors').select('*');

    if(data){

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
    
},[])

const slides = [{
  image:'/EduAbroad.webp',
  alt:"EduAbroad Career Consultant "
},{
  image:'/rvw.webp',
  alt:'EduAbroad Career Consultant'
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
    question:"How will EduAbroad guide me on my study abroad journey?", 
    answer:'EduAbroad has an experienced team of international experts who’ve been helping students to pursue their dreams of studying abroad. Most of these students are international students thus we can help you with end-to-end assistance from the application process to accommodation.',   
  },
  {
    question:"Who accepts IELTS scores?", 
    answer:'IELTS is accepted by over 11,000 organizations in 140 countries.',   
  },
  {
    question:"Can I avail one on one clearing doubt sessions?", 
    answer:'Students should contact EduAbroad to book a one-on-one doubt clearing session with a mentor.',   
  },
  {
    question:"How do I access live classes?", 
    answer:'On successful completion of enrolment process, students receive a EduAbroad Zoom ID & password to join EduAbroad live platform and to attend live, online classes.',   
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
  review:'Mentors at EduAbroad are extremely dedicated and hard working. They make it a point for every student to be equally interactive in the training sessions. Mock interviews by experts from industry helped a lot.',
  country:'USA'
},{

  image:'/r6.jpg',
  fullname:'Anannya',
  college:'SOAS  - University of London',
  title:'Extremely Supportive Faculty',
  review:'My experience with EduAbroad was truly memorable, the team was extremely supportive. They always made sure that all my doubts were cleared. It is for them that I have reached where I am now.',
  country:"UK"
},
{

  image:'/r5.png',
  fullname:'Dr.Naman Tandon',
  college:'Universite de Paris',
  country:'France',
  title:'Best Career Guidance',
  review:'I would like to thank all the mentors of EduAbroad who helped me throughout my journey. They helped me by motivating me and getting all my doubts clear. They helped me in clearing all my concepts. The study materials of EduAbroad are very helpful and beneficial and the practice questions are of the level of actual IELTS exam. '
}
]

function setNotification(de){
  if(timeoutId){
    clearTimeout(timeoutId)
  }

  setNotificationText(de);
   const id = setTimeout(()=>{setNotificationText(),setTimeoutId(null)},2500);
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
/* setFavicon('/favicon_active.svg') */



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

const features = [<>Best<span className={styles.blue}> Abroad Consultant</span></>,<>Mentoring by<span className={styles.blue}>&nbsp;Experienced Professionals</span></>,<>Dedicated Consultation for<span className={styles.blue}> Studying in Abroad</span></>,<>Top Notch<span className={styles.blue}> Abroad Career Guidance</span></>];
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
  })},[])


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
    
  }).catch(res=>{
    })
}


const countries = [
  
  {
title:'Australia',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
stars:4,
image:'https://www.state.gov/wp-content/uploads/2022/02/shutterstock_1025960785-2560x1300.jpg'
},
{
  title:'Canada',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  stars:4,
  image:'/canada.webp'
  },
  {
    title:'UK',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    stars:4,
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/London_Big_Ben_Phone_box.jpg/640px-London_Big_Ben_Phone_box.jpg'
    },
    {
      title:'United States of America',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      stars:4,
      image:'https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNhfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
      }

]

async function SubmitContact(){
  
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
    triggerInterakt();
      /* await axios.post('/') */
      cronberryTrigger(formData.fullname,formData.email,formData.phone,formData.year,formData.city,'https://goeduabroad.com');
      const {data,error} = await supabase.from('leads').insert({
        name:formData.fullname,
email:formData.email,
phone:formData.phone,
subject:formData.goal,
source:'Study Abroad Page'
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

const studentsz = [
    {
        image:'/vishist.png',
        name:'Vishist Tiwari',
        college:'University of Manchester, Cornell University',
    },
    {
        image:'/titik.png',
        name:'Titiksha Singh',
        college:'University of Buffalo',
    },
    {
        image:'/ananya.png',
        college:'University of London',
        name:'Annanya',
    },
    {
        image:'/naman.png',
        name:'Dr. Naman Tandon',
        college:'Kings College London,Universite de Paris',
    },
    {
        image:'/bhavya.png',
        name:'Bhavya Mishra',
        college:'The University of Warwick',
    }
    
]
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
        <title>Study Abroad Consultant | {currentSub}</title>
        <meta name="description" content="EduAbroad Study Abroad Consultant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet' />
      </Head>
      <DefaultLayout hideAI={true} navbar>
        
      <Offer data={formData} onClose={()=>{setSubmitted(false)}} submitted={isSubmitted}></Offer>
      <main className={styles.main}>
     {/*  {isSubmitted? <div className={styles.modal}>
          <div className={styles.modalinner}>
          <h2>Thank You !!</h2>
          <h3>Choosing EduAbroad is the best decision you have made.</h3>
          <p>We've received your details</p>
          <p>Our Executive will get back to you shortly.
          </p>

          <p>For Quick Assistance you can call us on : <a href="tel:+919044442989">+919044442989</a></p>
          <a href="/#courses" className={styles.submit}>Explore Our Courses</a><a className={styles.submit} href="/">Visit Our Website</a>
          </div></div>:''} */}
      {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
        
{loader? <div className={styles.loader}>

<svg width="197px" height="197px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="var(--brand-col2)" stroke-width="3" r="27" stroke-dasharray="127.23450247038662 44.411500823462205">
  
</circle>
</svg>
<p>Submitting your details</p>
</div> :''}
<img className={styles.logo} src="/edulogo.svg"/>
        <div className={styles.hero}>
          
       <div className={styles.dotgrid} />
<div className={styles.divider1}>
  <h2 className={styles.head}><span style={{color:'var(--brand-col1)',fontWeight:"700",fontFamily:"Playfair Display"}}>Do you want to Study Abroad </span><br/>but don't know where to start? </h2>
 <div className={styles.content}> <p style={{color:"black"}}>Join Us !<br/>
 <span style={{color:"var(--brand-col1)"}}>
 October 15th @ 6 PM </span></p>
  </div>
  <a href='#form' className={styles.btn}>Register Now</a>
</div>
<div className={styles.divider2}>
  <img src='/lp.png'/>
</div>

        </div>

        
<GradientMarquee text="Europe • USA • UK • Australia • Singapore • Germany • And Many More... •"></GradientMarquee>
          <section className={styles.maincont} id="form">
{/* <img src='/skyline.svg' className={styles.skyline}/> */}
            <div className={styles.grad1}></div>
            <div className={styles.grad2}></div>
<div className={styles.c1}>
<div className={styles.yt}>
<YouTube className='embed-container' title='' videoId="Srx7gFesyH8" opts={opts}  /></div>
</div>
<div className={styles.c2}>
  <div className={styles.formcont}>
<h1 className={styles.team_heading}>Register Now for the FREE Webinar</h1>
<input name={"name"} maxLength={40} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} maxLength={40} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>
<input name={"city"} maxLength={20} className={styles.input} placeholder={"Enter your City"} type={"text"} value={formData && formData.city} onChange={(e)=>{setFormData(res=>({...res,city:e.target.value})) }}/>
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
       
         
       
          <div className={styles.mar}>
<Marquee  speed={100} gradient={false}>
              {countries && countries.map((i,d)=>{
                return <div className={styles.country3} style={{backgroundImage:`url(${i.image})`}}>
<h2>{i.title}</h2>

                </div>
              })}
       
            </Marquee></div>
            <Section title={"Our Results"} color="var(--brand-col1)" align="left">
<div className={styles.cards}>
    {
        studentsz && studentsz.map((i,d)=>{
            return <div className={styles.card + " " + styles.scard}>
                <img src={i.image}/>
                <h2>{i.name}</h2>
                <p>{i.college}</p>
                </div>
        })
    }
</div>
            </Section>
            <div className={styles.spacer}></div>
            <div className={styles.spacer}></div>
            <div className={styles.spacer}></div>
        
       
        {/* <Section title={"Know : Your Mentors"} color="var(--brand-col1)" align="left">
        <div className={styles.parent2}>

        {mentors && mentors.map((i,d)=>{
return <div className={styles.card}>
    <div className={styles.circ}></div>
  
  <img alt={i.fullname} src={i.image}/>
  <h2>{i.fullname}</h2>
  {i.collegeimage ? <img className={styles.colimg} src={i.collegeimage}/>:''}
  {i.role ? <p className={styles.para}>{i.role}</p>:''}
  {i.role2 ? <p className={styles.para}>{i.role2}</p>:''}
</div>

})}
         
          
          </div></Section> */}
          
        
          
   
   <Section title={"Why choose: EduAbroad?"} color="var(--brand-col1)" align="left" visible="true">
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
      onSwiper={(swiper) => {}}
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
   <GradientMarquee text="Europe • USA • UK • Australia • Singapore • Germany • And Many More... •"></GradientMarquee>
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
