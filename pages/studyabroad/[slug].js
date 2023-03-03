import DefaultLayout from '../../layouts/DefaultLayout'
import styles from './StudyAbroad.module.css'
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import CustomSelect from '../../components/CustomSelect';
import Notifications from '../../components/Notification';

function StudyAbroad({datac}){
    const [notificationText,setNotificationText] = useState();
    const router = useRouter();
    const [scrollPos,setScrollPos] = useState(0);
    const [loading,setLoading] = useState(false);
const [postData,setPostData] = useState();
const [thankyou,setThankYou] = useState(false)
const [formData,setFormData]  = useState();
function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke,page) {

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
    xhr.open("POST", "https://api.cronberry.com/cronberry/api/campaign/register-audience-data");
    xhr.setRequestHeader("Content-Type", "application/json");
  
  
    xhr.send(data);
  }
function setNotification(de){

    setNotificationText(de);
    setTimeout(()=>{setNotificationText()},2500);
}
const goals=[{title:'Main ',value:'yes'}]
const filterhtml = JSON.parse(postData ? postData.html : "[{}]");
useEffect(()=>{
setPostData(datac[0])
    window.addEventListener('scroll',(e)=>{

        setScrollPos(window.scrollY)
    })
})


async function SubmitContact(){


    if(formData && formData.fullname && formData.email && formData.phone && validateEmail(formData.email) && validatePhone(formData.phone)){
        setLoading(true)
        cronberryTrigger(formData.fullname,formData.email,formData.phone,formData.heading,formData.city,'https://goeduabroad.com','GoEduAbroad Study Abroad Page');
        const {data,error} = await supabase.from('leads').insert({
            name:formData.fullname,
email:formData.email,
phone:formData.phone,
country:postData.heading,
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
        {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
        {thankyou ? <div className={styles.modaloverlay}><div className={styles.modal}><h2>Thank You for Submission</h2><p>Our Executive will get back to you shortly meanwhile you can browse our website or apply for more services or preparation plans.</p>
        <div>

            <a href='/'>Browse More</a>
            <a href="tel:+919044442989">Call Us</a>
        </div>
        </div></div>:''}
        {postData != undefined ? <>
<div key={postData.heading} className={styles.parent}>
<img style={{filter:`blur(${scrollPos/50}px)`}} className={styles.hero} src={postData.featured_image}/>
<div className={styles.content}>

<div className={styles.left}>
    <div className={styles.breadcrumb}><a href='/'>Home {'>'} </a><p>Study Abroad {'>'}</p><p>{postData.heading}</p></div>
<h1>Study Abroad in {postData.heading}</h1>
<div className={styles.html} dangerouslySetInnerHTML={{__html:filterhtml}}></div>
    <h2>List of Universities in {postData.heading}</h2>
    <ul className={styles.universities} dangerouslySetInnerHTML={{__html:JSON.parse(postData.universities)}}></ul>
     </div>
<div className={styles.right}>
    <h3>Featured Image</h3>
<div><img className={styles.featured} src={postData.featured_image}/></div>
<div className={styles.col}><div className={styles.form}>
    <h2>Start your Career in {postData.heading} <img src={postData.flag}/></h2>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>

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


export default StudyAbroad;

export async function getServerSideProps(context){

const {data,error} = await supabase.from('studyabroad').select('*').eq('slug',context.query.slug)
let datac;
if(data){
datac = data;

}
else if(error){
console.log(error)
}

return { props: {datac: datac ? datac : {}} } 
}