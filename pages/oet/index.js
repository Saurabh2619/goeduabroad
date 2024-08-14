import DefaultLayout from '../../layouts/DefaultLayout'
import styles from '../studyabroad/StudyAbroad.module.css'
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Notifications from '../../components/Notification';
import st from './TestPreparation.module.css'
import { NextSeo } from 'next-seo';
import axios from 'axios';
import 'tailwindcss/tailwind.css' 
import { cbKey } from '../../utils/cronBerryKey';
import {Spacer,Divider,Button} from '@nextui-org/react'
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


const datac = {featured_image:'/oetartwork.png',
heading:'The leading English language test specifically for healthcare professionals'
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
const included = [
   { 
    title:'Listening',
className:'bg-[#EF5A6F]',
description:'approx 45 minutes'
},
 {
    title:'Reading',
className:'bg-[#FF8225]',
description:'60 minutes'
},
 {
    title:'Writing',
className:'bg-[#88D66C]',
description:'45 minutes'
},
 {
    title:'Speaking',
className:'bg-[#4F1787]',
description:'approx 20 minutes'
}

]
const fieldsLeft = [
    'Dentistry',
    'Dietetics',
    'Medicine',
    'Nursing',
    'Occupational Therapy',
    'Speech Pathology',
  ];

  const fieldsRight = [
    'Optometry',
    'Podiatry',
    'Pharmacy',
    'Physiotherapy',
    'Radiography',
    'Veterinary Science',
  ];
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
        <Spacer y={36}></Spacer>
<div key={postData.heading} className={styles.parent + "  leading-tight font-sans"}>
<img alt={datac && datac.metaDesc? datac.metaDesc : datac?.heading + " | EduAbroad"} className={'w-full max-w-[85%] mx-auto rounded-2xl shadow-md border-1 border-white'} src={postData.featured_image}/>
<div className={"w-full max-w-[85%] mx-auto flex flex-col md:flex-row"}>

<div className={styles.left}>
    <div className={styles.breadcrumb}><a href='/'>Home {'>'} </a><p>Test Preparation {'>'} OET </p></div>
<h1 className='font-semibold text-5xl font-heading text-primary'>Prepare for OET with EduAbroad</h1>
<h2 className='text-xl text-gray-600 my-4 font-sans font-bold  '>{postData.heading}</h2>
<div className='w-full bg-black p-8 rounded-2xl text-white'>

    <h2 className='text-3xl font-bold'>What is OET?</h2>
    <p className='text-gray-200 my-4'>
    OET is the leading English language test specifically for healthcare professionals. It assesses the language proficiency of healthcare professionals looking to register and practice in an English-speaking environment.

    </p>
    <Button className=' rounded-full bg-primary text-white' size='lg'>Learn More</Button>
</div>

     </div>
<div className={styles.right}>
    

<div className={styles.col + " sticky top"}><div className={styles.form}>
    <h2 className='font-semibold font-heading text-primary'>Enroll in our OET Course</h2>
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
<Divider className='my-8'></Divider>
<div className='w-full flex flex-col justify-start items-start max-w-[85%] mx-auto'>
    <h2 className='text-4xl font-sans font-bold text-primary mb-2'>Is OET the right test for me?</h2>
    <p>OET tests internationally educated healthcare professionals from the following 12 professions:</p>
    
<table className={'my-4 bg-white rounded-xl overflow-hidden border-1 border-gray-100 p-2 shadow-md'}>
      <thead className='bg-primary text-white p-4'>
        <tr>
          <th>Field of Study</th>
          <th>Field of Study</th>
        </tr>
      </thead>
      <tbody>
        {fieldsLeft.map((field, index) => (
          <tr className='border-1 border-gray-200 text-center' key={index}>
            <td className='border-1 border-gray-200 text-center'>{field}</td>
            <td className='border-1 border-gray-200 text-center'>{fieldsRight[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Spacer y={8}></Spacer>
<h2 className='text-4xl font-sans font-bold text-primary'>Who recognises OET?</h2>
<div className='my-4'>For the most up to date list of organisations recognising OET as proof of English proficiency visit: 
<br/>
<a className='text-primary cursor-pointer' href='https://oet.com/discover/who-recognises-oet'>oet.com/discover/who-recognises-oet </a>
</div>
<Spacer y={8}></Spacer>
<h2 className='text-4xl font-sans font-bold text-primary'>Healthcare Boards and Councils </h2>
<p className='my-4'>OET is accepted as proof of English proficiency for registration, accreditation and licensing purposes in:
<br/>
Australia, Canada, Dubai , Ireland , Malta , Namibia, New Zealand, SIngapore, UK , Ukraine , US
</p>
<Spacer y={16}></Spacer>
<h2 className='text-4xl font-sans font-bold text-primary'>Qualification Authorities</h2>
<p className='my-2'><strong>Dubai</strong> - The Dubai Knowledge and Human Development Authority (KHDA) accepts OET as a quality standard qualification for proof of English proficiency. </p>
<p className='my-2'><strong>New Zealand</strong> - The New Zealand Qualifications Authority (NZQA) accepts OET as an approved English Proficiency Assessment.</p>
<Spacer y={16}></Spacer>
    <h2 className='text-4xl font-sans font-bold text-primary'>What’s in the test?</h2>
    <p className='text-lg text-gray-700'>OET covers all four language skills with an emphasis on communication in a healthcare environment.</p>
   <Spacer y={4}></Spacer>
    <div className='w-full flex flex-col md:flex-row items-start justify-start'>
    {included && included.map((i,d)=>{
        return <div className='mr-2 w-full md:w-auto mb-2 md:mb-0 flex-1'><div className={'flex-1 rounded-xl p-4  min-h-[150px] '+ i.className}>
            <h2 className='text-white font-medium text-2xl'>{i.title}</h2>
            <p className='text-gray-50 font-thin'>{i.description}</p>
        </div></div>
    })}</div>
<p className=' text-gray-700 leading-tight text-medium my-4'>The Listening and Reading sub-tests are designed to assess your ability to understand spoken and written English, based on health-related topics and tasks common to all professions. The Writing and Speaking sub-tests are specific to the 12 individual healthcare professions – designed to reflect common tasks performed in the workplace
</p>
<Spacer y={4}></Spacer>
</div>

</div>

</>:''} </DefaultLayout>
}


export default OETExam;

