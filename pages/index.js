import Head from 'next/head'
import Image from 'next/image'

import styles from './Home.module.css'
import {useState,useEffect} from 'react';
import DefaultLayout from '../layouts/DefaultLayout'
import Section from '../components/Section'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import Link from 'next/link'
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import CustomSelect from '../components/CustomSelect';
import Marquee from "react-fast-marquee";
import { supabase } from '../utils/supabaseClient';
import Notifications from '../components/Notification';
import axios from 'axios'
import { cbKey } from '../utils/cronBerryKey';
import {Button, Spacer} from '@nextui-org/react'
import GoogleReviews from '../components/GoogleReviews';
import HomepageBlogs from '../components/HomepageBlogs';
import { getCurrentYear } from '../utils/utilityfunctions';
const ResponsiveIFrame = ({ src }) => {
  return (
    <div className="video-container">
      <iframe
      aria-label='YouTube Video'
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height:"100%",
        }}
      />
    </div>
  );
};
export default function Home({datac,datad,posts}) {
  const [mobile,setMobile] = useState('desktop');
const [getstarted,setGet] = useState();
const [notificationText,setNotificationText] = useState();
const [thankyou,setThankYou] = useState(false);
const [courses,setCourses] = useState([]);
const [mentors,setMentors] = useState();
const [loading,setLoading] = useState(false);
function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke,page) {



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
              "paramValue": page ? page: '',
          }
      ]
  });
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {

      if (this.readyState === 4) {
          
          setLoading(false)
          setNotification('Submitted Successfully')
          

      }
  });
  xhr.open("POST", "https://register.cronberry.com/api/campaign/register-audience-data");
  xhr.setRequestHeader("Content-Type", "application/json");


  xhr.send(data);
}
const whyus =[
  {
    title:'Top Notch Service',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/v1680129484/manager-office-190723_1_keg50f.webp'
  },
  {
    title:'One-one-One Mentorship Sessions',
    image:'https://www.gettingsmart.com/wp-content/uploads/2020/10/Mentorship-.jpg'
  },
  {
    title:'Mentored by Experienced Professionals',
    image:'https://img.freepik.com/free-photo/successful-happy-business-team_53876-20936.jpg?w=2000'
  },
  {
    title:"Find what's right fit for you",
    image:'https://s3.us-east-1.amazonaws.com/co-assets/assets/images/_fbTw/pricing-models.jpg'
  },
  {
    title:'24x7 Support',
    image:'https://blog.hubspot.com/hubfs/customer-service-phrases.jpg'
  },
  {
    title:'Easy to Enroll & Get Started',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/v1680129484/How-to-Quickly-Understand-Mathematical-Ideas-in-Just-Three-EASY-STEPS_1_ujjivt.webp'
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
  collegeimage:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_127,q_15/v1680135246/harvard_ajtss6.webp',
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



setWidth();

    window.addEventListener("resize",(e)=>{
  setWidth()
    })
  
    window.addEventListener('load',()=>{
      setWidth();
    })
  },[])

  useEffect(()=>{
   
    {datac && datac.map((i,d)=>{
      setCourses(res=>([...res,{image:i.featured_image,title:i.heading,description:i.description,slug:i.slug}]))
    })}
    setMentors(datad)
  },[])

const logo1 = [
  {
    title:'News Company',
    src:'/l1.jpg'
  },
  {
    title:'News Company',
    src:'/l2.jpg'
  },
  {
    title:'News Company',
    src:'/l3.jpg'
  },
  {
    title:'News Company',
    src:'/l4.jpg'
  },
  {
    title:'News Company',
    src:'/l5.jpg'
  },
  {
    title:'News Company',
    src:'/l6.jpg'
  },
  {
    title:'News Company',
    src:'/l7.jpg'
  },
  {
    title:'News Company',
    src:'/l8.jpg'
  }
]

const logo2 = [
  {
    title:'News Company',
    src:'/l1.jpg'
  },
  {
    title:'News Company',
    src:'/l2.jpg'
  },
  {
    title:'News Company',
    src:'/l3.jpg'
  },
  {
    title:'News Company',
    src:'/l4.jpg'
  },
  {
    title:'News Company',
    src:'/l5.jpg'
  },
  {
    title:'News Company',
    src:'/l6.jpg'
  },
  {
    title:'News Company',
    src:'/l7.jpg'
  },
  {
    title:'News Company',
    src:'/l8.jpg'
  }
]
const herocountries = [
 
  {
    title:'USA',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_fill,h_44,w_44/v1680132882/us_qsodyv.webp',
    color:'skyblue',
  },
  {
    title:'UK',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_fill,h_44,q_10/v1680132881/uk_elgshi.webp',
    color:'skyblue',
  },
  {
    title:'Canada',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_44,q_10/v1680132882/circle-flag-of-canada-free-png_v9rzo9.webp',
    color:'skyblue',
  },
  {
    title:'Australia',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_fill,h_44,q_10,w_44/v1680132881/aus_poai3u.webp',
    color:'skyblue',
  },
  {
    title:'New Zealand',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_fill,h_44,q_10,w_44/v1680132881/Flag-New-Zealand_lgl97e.webp',
    color:'skyblue',
  },
  {
    title:'Ireland',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_44,q_10,w_44/v1680132881/FLAG-Ireland_mezg2t.webp',
    color:'skyblue',
  },
  {
    title:'Singapore',
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_fill,h_44,q_10,w_44/v1680132987/4320px-Flag_of_the_President_of_Singapore.svg_m5wp3u.webp',
    color:'skyblue',
  },

]

const partners=[{
  image: "MIT-Logo.png",
  image2: "/logo.jpg",
  title: "Massachusetts Institute of Technology",
  title2: "University Of Cambridge"
}, 
{
  image: "/oxford.png",
  image2: "/yale.png",
  title: "University of Oxford",
  title2: "Yale University"
}, 
{
  image: "/wharton.png",
  image2: "/lbs.png",
  title: "Wharton University of Pennsylvania",
  title2: "London Business School"
},
{
  image: "/unsw.png",
  image2: "/melbourne.png",
  title: "University of New South Wales",
  title2: "University of Melbourne"
},
{
  image: "https://res.cloudinary.com/dbnrwsxj1/image/upload/v1680129484/mcgill_1_wqwwzt.webp",
  image2: "https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_127,q_15/v1680135246/harvard_ajtss6.webp",
  title: "MCGill University ",
  title2: "Harvard University"
},
{
  image: "/toronto.png",
  image2: "/dublin.jpg",
  title: "University of Toronto",
  title2: "University College Dublin"
},
]
const countries = [
  
  {
title:'Australia',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
stars:4,
image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/v1680129484/shutterstock_1025960785-2560x1300_1_suhk9z.webp'
},
{
  title:'Canada',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  stars:4,
  image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_1423,q_31/v1680135399/canada_w23oxt.webp'
  },
  {
    title:'UK',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    stars:4,
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_726,q_23/v1680135059/London_Big_Ben_Phone_box_drho2j.webp'
    },
    {
      title:'United States of America',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      stars:4,
      image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/v1680129484/photo-1471306224500-6d0d218be372_1_ayi7ff.webp'
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
const fea = [
  {
    title:'Vedant Sagar',
    description:'Abhishek has helped me with improving my SAT score by 250 points, he has also helped me in writing and formatting essays for the college. Apart from that I got a lot of guidance about universities which I never knew before. He also helped me get job in University once I came to Northeastern University. In Boston he was working like a local guardian to me, if I have any issues I know whom to contact for solving those problems. Strongly recommend.',
    stars:4,
    image:'/r1.jpg',
    college:'Northeastern University',
    },
    {
      title:'Shruti Maheshwari',
      description:'For me who has no one in family ever been to USA getting admission to US university seems like an arduous and impossible task before we came in touch with Abhishek. He helped me from preparing for SAT to getting accommodation after I got admission. He helped me in all the steps of the process and continue to help with internship search using his networks of contacts in USA. I got admission in 6 schools out of 7 I applied, I got scholarship from 3 Universities. Currently, I am studying at University of Buffalo that offered me $48,000 scholarship.',
      stars:5,
      image:'/r2.jpg',
      college:'University of Bristol',
      },
]

const results = [
  

  {
    title:'Bhavya Mishra',
    description:'I am thankful to the team EduAbroad specially Dr. Swati Mishra. Dr. Swati always motivated me and all other students to work hard and stay focused. The faculty at EduAbroad is very hard working and it made my dream come true. Proud to be student of EduAbroad.',
    stars:4,
    image:'/r3.jpg',
    college:'University of BATH',
    country:"USA"
    },
    {
      title:'Titiksha Singh',
      description:'Mentors at EduAbroad are extremely dedicated and hard working. They make it a point for every student to be equally interactive in the training sessions. Mock interviews by experts from industry helped a lot.',
      stars:4,
      image:'/r4.jpg',
      college:'University of Buffalo',
      country:"USA"
      },
      {
        title:'Dr.Naman Tandon',
        description:'I would like to thank all the mentors of EduAbroad who helped me throughout my journey. They helped me by motivating me and getting all my doubts clear. They helped me in clearing all my concepts. The study materials of EduAbroad are very helpful and beneficial and the practice questions are of the level of actual IELTS exam.        ',
        stars:4,
        image:'/r5.png',
        college:'Universite de Paris',
        country:"France"
        },
        {
          title:'Anannya',
          description:'My experience with EduAbroad was truly memorable, the team was extremely supportive. They always made sure that all my doubts were cleared. It is for them that I have reached where I am now.',
          stars:5,
          image:'/r6.jpg',
          college:'SOAS  - University of London',
          country:"UK"
          },
          {
            title:'Prabal Muttoo',
            description:'I attribute my success in the IELTS Exam to the mentors at EduAbroad. They gave us personalized attention and developed a comfortable and accommodating environment inside the classroom. Their doubt session helped us very much in preparing. They were available 24/7 for clearing our doubts even at odd hours. Thanks for all the help and hard work.',
            stars:4,
            image:'/r9.jpeg',
            college:'The London University of Economics & Political Science',
            country:"UK"
            },
            {
              title:'Vishisht Tiwari',
              description:'I learned a lot of tips and tricks at EduAbroad which were really game changing and it boosted my perspective of learning along. Those little things are the key factors which help students like me achieve the goals.              ',
              stars:4,
              image:'/r10.jpg',
              college:'Cornell University',
              country:"USA"
              }

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

image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_775,q_22/v1680131251/camb_zlhcfl.webp'
},
{
  title:'Harvard University',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_691,q_19/v1680131252/harvard_fqewnf.webp'
  },
  {
    title:'John Hopkins',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    
    image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_1121,q_47/v1680131252/hopkins_erwtfv.webp'
    },
    {
      title:'MIT',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      
      image:'https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_738,q_37/v1680131080/mit_vauoak.webp'
      }

]

/* const courses = [
  
  {
title:'Academic Training',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

image:'https://blog.smartabroad.in/wp-content/uploads/2022/08/studying-student-on-desk.jpg'
},
{
  title:'General Training',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  image:'https://blog.advancementcourses.com/wp-content/uploads/2019/07/800x450-firsttimeteachers-header-ac.jpg'
  },
 

] */
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
 const sendLead = async (leadData) => {
    const { firstname, phone, email } = leadData;
  
    if (!firstname || !phone || !email) {
      throw new Error("Missing required fields: firstname, phone, and email are required.");
    }
  
    try {
      const response = await axios.post("/api/sendlead", leadData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error sending lead:", error);
      throw error;
    }
  };
async function SubmitContact() {
  if (
    formData &&
    formData.fullname &&
    formData.email &&
    formData.phone &&
    validateEmail(formData.email) &&
    validatePhone(formData.phone)
  ) {
    
    triggerInterakt();
    cronberryTrigger(
      formData.fullname,
      formData.email,
      formData.phone,
      formData.subject,
      formData.message,
      "https://goeduabroad.com",
      "GoEduAbroad Contact Page"
    );

    try {
      const response = await sendLead({
        firstname: formData.fullname,
        lastname: "", // Add if available
        phone: formData.phone,
        email: formData.email,
        city: formData.city || "", // Add if available
        state: formData.state || "", // Add if available
        country: formData.country || "", // Add if available
        message: formData.message,
      });

      if (response) {
        setNotification("Submitted Successfully");
        setThankYou(true);
      }
    } catch (error) {
      setNotification("Something went wrong");
    } finally {
      
    }
  } else {
    
    setNotification("Please fill all the fields correctly");
  }
}

function setNotification(de){

  setNotificationText(de);
  setTimeout(()=>{setNotificationText()},2500);
}

const marqueeContent = <><img src='/camblog.svg' width={120}/> OFFICIAL CAMBRIDGE LEARNING PARTNER</>

async function submitGetStarted(a){


  
  const {data,error} = await supabase.from('getstarted').insert({phone:a}).select()


  if(data){
    setNotification('Submitted Successfully');
    setGet()
  }else if(error){
    setNotification('Something went Wrong')
  }
}
  return (
    <>
      <Head>
        <title>EduAbroad | Best Study Abroad Consultant in India - Rated #1</title>
        <meta name="description" content="Study in Abroad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/edufavicon.svg" />
        
      </Head>
      <DefaultLayout scroll={300}>
      
      {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
         {thankyou ? <div className={styles.modaloverlay}><div className={styles.modal}><h2>Thank You for Submission</h2><p>Our Executive will get back to you shortly meanwhile you can browse our website or apply for more services or preparation plans.</p>
        <div>

            <a onClick={(e)=>{e.preventDefault(),setThankYou(false)}}>Browse More</a>
            <a href="tel:+919044442989">Call Us</a>
        </div>
        </div></div>:''}  
        <div className={styles.hero}>
          <video muted playsInline="true" poster='https://res.cloudinary.com/dbnrwsxj1/image/upload/c_scale,h_600,q_29/v1680131427/vidpost_v3pyun.jpg' autoplay="true" loop="true"><source src='/v3_comp.mp4'/></video>
<div className={styles.mask}></div>
<div
className={styles.content + " font-semibold"}>
  <h2><span className='b1'>An Initiative to</span><br/>Build Career Abroad</h2>
  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p> */}
<div className={styles.getstarted}><input value={getstarted} className={styles.input} placeholder="Enter your Phone" onChange={(e)=>{setGet(e.target.value)}}></input><button onClick={()=>{getstarted && getstarted.length > 6 ? submitGetStarted(getstarted) : setNotification('Please fill all the fields')}}>{loading? 
    <svg width="800px" height="800px" viewBox="0 0 256 256" id="Flat" fill="white">
  <path d="M64,136H32a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16ZM173.25488,90.74512a7.97769,7.97769,0,0,0,5.65723-2.34278l22.62695-22.62695a8.00052,8.00052,0,1,0-11.31445-11.31445l-22.627,22.627a8,8,0,0,0,5.65722,13.65723ZM65.77539,54.46094A8.00052,8.00052,0,0,0,54.46094,65.77539l22.627,22.62695A8.00052,8.00052,0,0,0,88.40234,77.08789Zm11.3125,113.13672-22.62695,22.627a8.00052,8.00052,0,0,0,11.31445,11.31445l22.62695-22.62695a8.00052,8.00052,0,0,0-11.31445-11.31445ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.08789,47.59766a8.00052,8.00052,0,0,0-11.31445,11.31445l22.627,22.62695a8.00052,8.00052,0,1,0,11.31445-11.31445ZM128,184a8.00039,8.00039,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8.00039,8.00039,0,0,0,128,184Zm0-160a8.00039,8.00039,0,0,0-8,8V64a8,8,0,0,0,16,0V32A8.00039,8.00039,0,0,0,128,24Z"/>
</svg>
:''}Get Started</button></div>
<div className={styles.top}>
  <h3>Top Countries to Study Abroad :</h3>
  <div className={styles.conts}>
{herocountries && herocountries.map((i,d)=>{

  return <div className={styles.cont}><img alt={i.title} src={i.image}/> <p>{i.title}</p></div>
})}</div>
</div>
</div>
        </div>
        <div className={styles.marquee}>
        <Marquee speed={100} gradientWidth={0}>{marqueeContent}  {marqueeContent}  {marqueeContent}  {marqueeContent}  {marqueeContent}  {marqueeContent}</Marquee></div>
      <Section title=":Who are we?" align="left" color="var(--brand-col1)" small>
{/* <img className={styles.right} src={'/rightimage.png'}/> */}
<div className={styles.who}>

  <div className={styles.col1}>
    <p>EduAbroad is founded by former Professor of IIM Lucknow, Dr. Swati Abhishek Mishra. She holds a Master’s in Management in a joint program with University of Cambridge and Massachusetts Institute of Technology, and a PhD. in Strategy and Marketing from University of Cambridge. She was the winner of ……… Read More on About Page</p>
  <Link href={'/about'}><button className={styles.mainbutton}>Open About Page</button></Link>
  </div>
  <div className={styles.col2}>
  <ResponsiveIFrame
      src="https://www.youtube.com/embed/W7rKLNk4FMU"
    />

  </div>
</div>
      </Section>
      <div className={styles.partner}>
      <img src='/emblem.svg' width={220} className={styles.emblem}/>
<img src='/emb2.svg' width={220} className={styles.emblem2}/>
<div className={styles.partnertext}>
<img src='/enl.svg' width={220} className={styles.partnerlogo}/>

<h2 className={styles.camtext}>CAMBRIDGE LEARNING PARTNER</h2>
<img src='/camnew.svg' width={220} className={styles.camblogo}/></div>
      </div>
      <CardSection></CardSection>
      <Section title="Testimonials" align="center" color="var(--brand-col1)">




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


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {results && results.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.rcard} >
      <img alt={i.college} src={i.image}/>
      <div className={styles.rbadge}>{i.college}</div>
      <div className={styles.cric} style={{backgroundImage:"url("+i.image+")"}}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title} <span className={styles.country}>{i.country? i.country : ''}</span></h2>
      
      <p>{i.description}</p>
      {i.video ? <ResponsiveIFrame
      src={i.video}
    />:''}
      <div className={styles.stars +  " flex flex-row items-center justify-start"}>
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
<Section>
<GoogleReviews></GoogleReviews>
</Section>
<Section title=":Media Features" id="media" align="center" color="var(--brand-col1)">
  
  <div className={styles.featured}>
  <Marquee speed={80}>
{logo1 && logo1.map((i,d)=>{
  return <img src={i.src} className={styles.newslogo}/>
})}
{logo1 && logo1.map((i,d)=>{
  return <img src={i.src} className={styles.newslogo}/>
})}
  </Marquee>
  <div className={styles.spacer}></div>
  <Marquee speed={80}>
  {Array(10).fill().map((i,d)=>{
  return <img src={`/c${d+1}.png`} className={styles.newslogo}/>
})}
{Array(10).fill().map((i,d)=>{
  return <img src={`/c${d+1}.png`} className={styles.newslogo}/>
})}
    </Marquee>
    </div>
    </Section>
      <Section title="Services" id="courses" align="center" color="var(--brand-col1)">




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


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {courses && courses.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.ccard} style={{backgroundImage:`url('${i.image}')`}}>
      <div className={styles.wt}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      {/* {i.description? <p>{i.description.substring(0,160)}...</p>:''} */}
   
    <div className={styles.buttons}>
<Link href="/contact">Contact Us</Link>
{/* <Link href={`/testpreps/${i.slug}`}>Read More</Link> */}

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
<Section title={`Top Countries of ${getCurrentYear()} to : Study Abroad`} align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ 
        el:".paginate3",
        
        clickable: true }}
      
      centeredSlides={false}
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


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {countries && countries.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars +   "  flex flex-row items-center justify-start"}>
      {Array(i.stars).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div></SwiperSlide>
  })

  }

 </Swiper>
 <div className={"paginate3"}></div>
</Section>{/* 
<div className={styles.students}>
<div className={styles.left}>
<h2>Join 9000+ students <br/>who joined <span className='b1'>EduAbroad</span></h2>
<button onClick={()=>{}}>Join Now</button>
</div>
<div className={styles.right}>
  <div className={styles.circle}><img src='/gras.png'/></div>
</div>
</div> */}

<Section title="Top Universities" align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 :10}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ 
        el:".paginate4",
        
        clickable: true }}
      
      centeredSlides={false}
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


     
      
      


   
{/* <div className={styles.cardhold}> */}
  {universities && universities.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.card} style={{backgroundImage:"url("+i.image+")"}}>
      <div className={styles.gradfill}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description.substring(0,260)}...</p>
      <div className={styles.stars +   "  flex flex-row items-center justify-start"}>
      {Array(i.stars ? i.stars : 0).fill().map((i,d)=>{
return <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.85 17.92" fill="#f7ae1e"><defs></defs><g id="Layer_1-2"><polygon class="cls-1" points="9.42 0 12.33 5.9 18.85 6.85 14.13 11.44 15.25 17.92 9.42 14.86 3.6 17.92 4.71 11.44 0 6.85 6.51 5.9 9.42 0"/></g></svg>

    })}</div></div>
    </div></SwiperSlide>
  })

  }

 </Swiper>
 <div className={"paginate4"}></div>
</Section>
<Section title="Featured Universities" align="center" color="var(--brand-col1)">
<Marquee speed={100} gradientWidth={80}>
  {partners && partners.map((i,d)=>{

    return <div className={styles.partners}>
      <div className={styles.university}><img alt={i.title} src={i.image}/><p>{i.title}</p></div>
      <div className={styles.university}><img alt={i.title2} src={i.image2}/><p>{i.title2}</p></div>
    </div>
  })}
</Marquee>
</Section>
<Section title=":Our Blogs" align="left" color="var(--brand-col1)">

<HomepageBlogs posts={posts}></HomepageBlogs>

</Section>

<Section title="Mentors" align="center" color="var(--brand-col1)">

<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={mobile === "mobile" ? 30 : mobile === "tablet" ?30 : 70}
      slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 4}
      loop={true}
      autoplay={true}
      
      pagination={{ 
        el:".paginate5",
        
        clickable: true }}
      
      centeredSlides={false}
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


     
      
      {mentors && mentors.map((item,index)=>{

return(<>

<SwiperSlide key={index}><div className={styles.dcard} style={{backgroundImage:"url("+item.image+")"}}>
  
  <div className={styles.dcardcontent}>
    <img alt={item.title} className={styles.colimg} src={item.collegeimage}/>
    <div>
  <h2>{item.title}</h2>
  <p>{item.role}</p></div>
  </div>
  <div className={styles.stars +   "  flex flex-row items-center justify-start"}>

  </div>
  </div></SwiperSlide>

</>)
})} 


    </Swiper>
    <div className={"paginate5"}></div>
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

<div className={styles.formhold} id="expert">
        
<div className={styles.formcontent}>
  
<h1>Kickstart your Career Journey in your<br/><span>Dream Country Abroad.</span></h1>
<p className={styles.para}>Includes benefits:</p>
<div className={styles.benefits}>
  {benefits && benefits.map((i,d)=>{
    return <div className={styles.benefit}><div className={styles.bimage}><img alt={i.benefit} src={i.image}/></div><p>{i.benefit}</p></div>
  })}
</div>
</div>
<div className={styles.formcont}>
<h1 className={styles.team_heading}>Plan your Career in Abroad with<strong> EduAbroad</strong>.</h1>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>

<CustomSelect single={true} z={9} full="true" defaultText="Select your Goal" noPadding={true} objects={goals} setSelect={(r)=>{setFormData(res=>({...res,goal:r}))}}/>
{formData  && formData.fullname && formData.phone && formData.email && formData.goal? '':<p className={styles.error}>Please fill all the fields</p>}
<div onClick={SubmitContact} className={styles.submit}>
{loading? 
    <svg width="800px" height="800px" viewBox="0 0 256 256" id="Flat" fill="white">
  <path d="M64,136H32a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16ZM173.25488,90.74512a7.97769,7.97769,0,0,0,5.65723-2.34278l22.62695-22.62695a8.00052,8.00052,0,1,0-11.31445-11.31445l-22.627,22.627a8,8,0,0,0,5.65722,13.65723ZM65.77539,54.46094A8.00052,8.00052,0,0,0,54.46094,65.77539l22.627,22.62695A8.00052,8.00052,0,0,0,88.40234,77.08789Zm11.3125,113.13672-22.62695,22.627a8.00052,8.00052,0,0,0,11.31445,11.31445l22.62695-22.62695a8.00052,8.00052,0,0,0-11.31445-11.31445ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.08789,47.59766a8.00052,8.00052,0,0,0-11.31445,11.31445l22.627,22.62695a8.00052,8.00052,0,1,0,11.31445-11.31445ZM128,184a8.00039,8.00039,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8.00039,8.00039,0,0,0,128,184Zm0-160a8.00039,8.00039,0,0,0-8,8V64a8,8,0,0,0,16,0V32A8.00039,8.00039,0,0,0,128,24Z"/>
</svg>
:''}
  SUBMIT</div>

</div>

        </div>
        <br/>
        <br/>

        <br/>
{/* <div className={styles.aitool}>
<img src='/collegpano.png'/>
  <h2>Our AI Tool will help you to choose suitable university for yourself</h2>
  <a href="https://www.applyboard.com/partners/354594/intake-form">Get Started, It's Free !!</a>
</div> */}

{/* <div id="applyboard" style={{display:'flex',alignContent:'center',alignItems:'center',justifyContent:'center'}} dangerouslySetInnerHTML={{__html:"<div style='max-width:1200px' id=\"ab-embedded-search\" data-host=\"https://www.applyboard.com\" data-rp-ref=\"17323\" data-orientation=\"horizontal\" data-default-countries=\"USA,Canada,United Kingdom,Australia,Ireland\"></div><script type=\"text/javascript\" src=\"https://www.applyboard.com/assets/embedded_search.js\"></script>"}}></div> */}
      </DefaultLayout>
    </>
  )
}


export async function getServerSideProps(context){

  const [datac,datad,po] = await Promise.all([supabase.from('services').select('*'),supabase.from('mentors').select('*'),
  supabase.from('blog_posts').select('*').eq('isActive',true).order('created_at',{ascending:false}).limit(4)
])
  
  
  return { props: {datac: datac ? datac.data : {}, datad:datad? datad.data : {},posts:po ? po.data : []} } 
  }

  
  const CardSection =()=>{

    return  <div className="w-full py-12 bg-white">
    <div className="container px-4 mx-auto md:px-6">
      <div className="flex font-sans flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-xl shadow-gray-600/10 rounded-3xl min-h-[60vh] sm:min-h-[40vh] bg-[#A51C30] p-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-heading font-semibold tracking-normal text-white sm:text-3xl md:text-4xl">
          Personalized Career Guidance <br/>Test Powered by AI
          </h2>
          <p className="text-white/90 md:text-lg">
          Career Aptitude Test for students from 10th to 12th, graduates & professionals
          </p>
          <div className='flex flex-row items-center justify-start'>
          <Button 
          href='https://www.bodhami.com/general/careerTest?token=-O2AvTjm4II7wR6rnO6Y_tpT0mZj6GKs'
          as={Link}
            className="bg-white text-[#A51C30] hover:bg-white/90"
          >
           Learn More
          </Button>
          <Spacer x={2}></Spacer>
          <Button 
          href='https://www.bodhami.com/customer/login?token=-O2AvTjm4II7wR6rnO6Y_tpT0mZj6GKs'
          as={Link}
            className="bg-white text-[#A51C30] hover:bg-white/90"
          >
           Take Test
          </Button></div>
        </div>
        <Image
            src="/careertest.png"
            alt="Study Abroad"
            width={400}
            height={300}
            className="rounded-lg absolute right-0 -bottom-0 sm:-bottom-[15%] h-auto sm:h-full w-full sm:w-auto object-contain"
          />
        <div className="flex-1 flex justify-center">
         
        </div>
      </div>
    </div>
  </div>
  }