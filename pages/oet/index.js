import DefaultLayout from '../../layouts/DefaultLayout'
import styles from '../studyabroad/StudyAbroad.module.css'
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Notifications from '../../components/Notification';
import st from './TestPreparation.module.css'
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { cbKey } from '../../utils/cronBerryKey';
function OETExam(){
    const [notificationText,setNotificationText] = useState();
    const router = useRouter();
    const [scrollPos,setScrollPos] = useState(0);
    const [loading,setLoading] = useState(false);
const [postData,setPostData] = useState();
const [thankyou,setThankYou] = useState(false)
const [formData,setFormData]  = useState()
const [activeIndex,setactiveIndex] = useState(0);
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


const datac = {featured_image:'https://roeveragri.ac.in/wp-content/uploads/2021/01/examinationhall.jpg',
heading:'OET Exam Preparation'
}


function setNotification(de){

    setNotificationText(de);
    setTimeout(()=>{setNotificationText()},2500);
}
const goals=[{title:'Main ',value:'yes'}]
const filterhtml = JSON.parse(datac?.html ?? "[]");
useEffect(()=>{
setPostData(datac)
    window.addEventListener('scroll',(e)=>{

        setScrollPos(window.scrollY)
    })
},[])
const courses = [
    {
        title:'15 Days',
        badge:'Best for Personal Teacher Attention',
        benefits:'15 Hours of Live Classes, 10+ Mock Tests, Cambridge IELTS Book',
        price:'8000',
        date:'15th March',
        link:'/register',
        image:'https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg'
    },
    {
        title:'1 Month',
        badge:'Best for Personal Teacher Attention',
        benefits:'30 Hours of Live Classes, 20+ Mock Tests, Cambridge IELTS Book',
        price:'8000',
        date:'15th March',
        link:'/register',
        image:'https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg'
    },
    {
        title:'2 Months',
        badge:'Best for Group Based Learning',
        benefits:'60 Hours of Live Classes, 40+ Mock Tests, Cambridge IELTS Book',
        price:'8000',
        date:'15th March',
        link:'/register',
        image:'https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg'
    },
    {
        title:'3 Months',
        badge:'Best for Personal Teacher Attention',
        benefits:'90 Hours of Live Classes, 60+ Mock Tests, Cambridge IELTS Book',
        price:'8000',
        date:'15th March',
        link:'/register',
        image:'https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg'
    }
]
async function triggerInterakt(){
    axios.post('./api/interakt',{
      userId: Date.now(),
      phoneNumber: formData.phone,
      countryCode: "+91",
      event: "Campaign Notification",
      name: formData.fullname,
      email: formData.email,
  
      tag: "OET Landing Page"
    }).then(res=>{
      
    }).catch(res=>{
      })
  }
async function SubmitContact(){


    if(formData && formData.fullname && formData.email && formData.phone && formData.city && validateEmail(formData.email) && validatePhone(formData.phone)){
        setLoading(true)
triggerInterakt()
        cronberryTrigger(formData.fullname,formData.email,formData.phone,formData.heading,formData.city,'https://goeduabroad.com/oet','GoEduAbroad OET Page');
        const {data,error} = await supabase.from('leads').insert({
            name:formData.fullname,
email:formData.email,
phone:formData.phone,
test_name:postData.heading,
city:formData.city,
        }).select();

        if(data){
setNotification('Submitted Successfully');
setLoading(false)
setThankYou(true)
        }else if(error){
            setLoading(false)
setNotification('Something went Wrong')
        }
    }
    else{
        setLoading(false)
setNotification('Please Fill all the fields correctly')

    }
}
function validatePhone(phone) {
    const re =  /^(\+\d{1,4})?(?!0+\s+,?$)\d{10}\s*,?$/;
    return re.test(phone);
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
    return <DefaultLayout>
          <NextSeo
      title={"Best "+datac.heading + " Service | EduAbroad"}
      description={datac && datac?.metaDesc? `${datac.metaDesc} | Best Study Abroad Consultant in India` : `${datac.heading} | Best Study Abroad Consultant in India`}
      canonical={`https://www.goeduabroad.com/testpreps/${postData?.slug}`}
      openGraph={{
        type: "article",
        url: `https://www.goeduabroad.com/testpreps/${datac?.slug}`,
        title: datac.heading + " | EduAbroad Best Study Abroad Consultant",
        description : datac && datac.metaDesc? datac.metaDesc : datac?.heading,
        article: {
          publishedTime: datac.created_at,
          modifiedTime: datac.created_at,
          authors: ["Ashutosh Mishra"],
          tags: datac.tags? datac.tags :'',
        },
        images: [
          {
            url: datac.featured_image,
           
            alt: datac.heading + " | EduAbroad Best Study Abroad Consultant",
          },
        ],
      }}
    />
        {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
        {thankyou ? <div className={styles.modaloverlay}><div className={styles.modal}><h2>Thank You for Submission</h2><p>Our Executive will get back to you shortly meanwhile you can browse our website or apply for more services or preparation plans.</p>
        <div>

            <a href='/'>Browse More</a>
            <a href="tel:+919044442989">Call Us</a>
        </div>
        </div></div>:''}
        {postData != undefined ? <>
<div key={postData.heading} className={styles.parent}>
<img alt={datac && datac.metaDesc? datac.metaDesc : datac?.heading + " | EduAbroad"} style={{filter:`blur(${8-scrollPos/50}px)`}} className={styles.hero} src={postData.featured_image}/>
<div className={styles.content}>

<div className={styles.left}>
    <div className={styles.breadcrumb}><a href='/'>Home {'>'} </a><p>Test Preparation {'>'} OET </p></div>
<h1>Prepare for OET with EduAbroad</h1>
<h2>{postData.heading}</h2>
<div className={styles.html} dangerouslySetInnerHTML={{__html:filterhtml}}></div>
{postData && postData.id == 12? <div className={st.courses}>

{courses && courses.map((i,d)=>{

    return <div className={st.course}>
        
        <img alt={datac && datac.metaDesc? datac.metaDesc : datac?.heading + " | EduAbroad"} className={st.courseimage} src={i.image}/>
        <div className={st.coursecontent}>
<h2>{i.title} OET Course</h2>
<p className={st.badge}>{i.badge}</p>
<strong><p>Benefits Includes:</p></strong>
<ul>
{i.benefits && i.benefits.split(',').map((a,c)=>{
    return <li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><path d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50  l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z" fill="#43a047"/></svg>
        {a}</li>
})}</ul>
{i.date ? <p className={st.date}>New Batches Every Week</p>:''}
<a href={i.link} target="_blank">Enroll Now</a>
        </div>
    </div>
})}

</div>:''}
{/* <div className={st.tabs}>
{tabs && tabs.map((i,d)=>{
    return <div onClick={()=>{setactiveIndex(activeIndex != d ? d : 8)}} className={st.tab + " " + (activeIndex == d ? st.activeTab : '') }><div className={st.tabtn}><h2>{i.title}</h2>
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="black"/></svg>
    </div><div className={st.tabcontent} dangerouslySetInnerHTML={{__html:i.content}}></div></div>
})}</div> */}
   {/*  <h2>List of Universities in {postData.heading}</h2>
    <ul className={styles.universities} dangerouslySetInnerHTML={{__html:JSON.parse(postData.universities)}}></ul> */}
     </div>
<div className={styles.right}>
    
<div><img alt={datac && datac.metaDesc? datac.metaDesc :  datac?.heading + " | EduAbroad"} className={styles.featured} src={postData.featured_image}/></div>
<div className={styles.col}><div className={styles.form}>
    <h2>Enroll in our OET Course</h2>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>
<input name={"city"} className={styles.input + " " + (formData &&  formData.city && formData.city.length > 0 ? '' : styles.fielderror)} placeholder={"Enter your City"} type={"text"} value={formData && formData.city} onChange={(e)=>{setFormData(res=>({...res,city:e.target.value})) }}/>

{formData  && formData.fullname && formData.phone && formData.email? '':<p className={styles.error}>Please fill all the fields</p>}
<div onClick={SubmitContact} className={styles.submit}>{loading? 
    <svg width="800px" height="800px" viewBox="0 0 256 256" id="Flat" fill="white">
  <path d="M64,136H32a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16ZM173.25488,90.74512a7.97769,7.97769,0,0,0,5.65723-2.34278l22.62695-22.62695a8.00052,8.00052,0,1,0-11.31445-11.31445l-22.627,22.627a8,8,0,0,0,5.65722,13.65723ZM65.77539,54.46094A8.00052,8.00052,0,0,0,54.46094,65.77539l22.627,22.62695A8.00052,8.00052,0,0,0,88.40234,77.08789Zm11.3125,113.13672-22.62695,22.627a8.00052,8.00052,0,0,0,11.31445,11.31445l22.62695-22.62695a8.00052,8.00052,0,0,0-11.31445-11.31445ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.08789,47.59766a8.00052,8.00052,0,0,0-11.31445,11.31445l22.627,22.62695a8.00052,8.00052,0,1,0,11.31445-11.31445ZM128,184a8.00039,8.00039,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8.00039,8.00039,0,0,0,128,184Zm0-160a8.00039,8.00039,0,0,0-8,8V64a8,8,0,0,0,16,0V32A8.00039,8.00039,0,0,0,128,24Z"/>
</svg>
:''}SUBMIT</div>
    
    </div></div>

</div>
</div>
</div>

</>:''} </DefaultLayout>
}


export default OETExam;

