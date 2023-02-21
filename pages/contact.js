import { useState } from 'react';

import CustomSelect from '../components/CustomSelect';
import Notifications from '../components/Notification';
import Section from '../components/Section';
import DefaultLayout from '../layouts/DefaultLayout';
import { supabase } from '../utils/supabaseClient';
import styles from './Contact.module.css'

function Contact(props){
const [formData,setFormData] = useState();
const [loading,setLoading] = useState(false);
const [thankyou,setThankYou] = useState(false)
const [notificationText,setNotificationText] = useState();
const reasons = [
{
    title:'General',
    value:'general'
},
{
    title:'Admission',
    value:'admission'
},

{
    title:'Enquiry',
    value:'enquiry'
},

{
    title:'Complaint/Request',
    value:'complaintorequest'
},

{
    title:'Business Enquiry',
    value:'Business Enquiry'
},

{
    title:'Query',
    value:'Query'
},
{
    title:'Services Enquiry',
    value:'Services Enquiry'
},
]
function setNotification(de){

    setNotificationText(de);
    setTimeout(()=>{setNotificationText()},2500);
}
function validatePhone(phone) {
    const re =  /^(\+\d{1,4})?(?!0+\s+,?$)\d{10}\s*,?$/;
    return re.test(phone);
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

async function SubmitContact(){

    if(formData && formData.fullname && formData.email && formData.phone && validateEmail(formData.email) && validatePhone(formData.phone)){
        setLoading(true)
        const {data,error} = await supabase.from('leads').insert({
            name:formData.fullname,
email:formData.email,
phone:formData.phone,
subject:formData.subject,
message:formData.message,
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

    return <DefaultLayout>
         {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
         {thankyou ? <div className={styles.modaloverlay}><div className={styles.modal}><h2>Thank You for Submission</h2><p>Our Executive will get back to you shortly meanwhile you can browse our website or apply for more services or preparation plans.</p>
        <div>

            <a href='/'>Browse More</a>
            <a href="tel:+919044442989">Call Us</a>
        </div>
        </div></div>:''}
        <div className={styles.spacer}></div>
    <Section title={"Contact Us"}>
<div className={styles.parent}>

    <div className={styles.left}>
        <h2>Reach Us out at our Physical Office</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.5446772045625!2d80.98877671504361!3d26.85443078315282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUxJzE2LjAiTiA4MMKwNTknMjcuNSJF!5e0!3m2!1sen!2sin!4v1676965264887!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        
    </div>
    <div className={styles.right}>
<h2>Contact Details</h2>
        <a href='mailto:info@goeduabroad.com'><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 4h13.5a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75v-9.5a3.25 3.25 0 0 1 3.066-3.245L5.25 4h13.5-13.5ZM20.5 9.373l-8.15 4.29a.75.75 0 0 1-.603.043l-.096-.042L3.5 9.374v7.376a1.75 1.75 0 0 0 1.606 1.744l.144.006h13.5a1.75 1.75 0 0 0 1.744-1.607l.006-.143V9.373ZM18.75 5.5H5.25a1.75 1.75 0 0 0-1.744 1.606L3.5 7.25v.429l8.5 4.473 8.5-4.474V7.25a1.75 1.75 0 0 0-1.607-1.744L18.75 5.5Z" fill="#000"/></svg>info@goeduabroad.com</a>
        <a href="tel:+919044442989"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.056 2.418 1.167-.351a2.75 2.75 0 0 1 3.302 1.505l.902 2.006a2.75 2.75 0 0 1-.633 3.139L10.3 10.11a.25.25 0 0 0-.078.155c-.044.397.225 1.17.845 2.245.451.781.86 1.33 1.207 1.637.242.215.375.261.432.245l2.01-.615a2.75 2.75 0 0 1 3.034 1.02l1.281 1.776a2.75 2.75 0 0 1-.339 3.605l-.886.84a3.75 3.75 0 0 1-3.587.889c-2.754-.769-5.223-3.093-7.435-6.924-2.215-3.836-2.992-7.14-2.276-9.913a3.75 3.75 0 0 1 2.548-2.652Zm.433 1.437a2.25 2.25 0 0 0-1.529 1.59c-.602 2.332.087 5.261 2.123 8.788 2.033 3.522 4.222 5.582 6.54 6.23a2.25 2.25 0 0 0 2.151-.534l.887-.84a1.25 1.25 0 0 0 .154-1.639l-1.28-1.775a1.25 1.25 0 0 0-1.38-.464l-2.015.617c-1.17.348-2.232-.593-3.372-2.568C9 11.93 8.642 10.9 8.731 10.099c.047-.416.24-.8.546-1.086l1.494-1.393a1.25 1.25 0 0 0 .288-1.427l-.902-2.006a1.25 1.25 0 0 0-1.5-.684l-1.168.352Z" fill="#000"/></svg>Contact : +91 904 444 2989</a>
    
    
   
<h2>Submit Contact Request</h2>
<input name={"name"} className={styles.input} placeholder={"Enter your Full Name"} type={"text"} value={formData && formData.fullname} onChange={(e)=>{setFormData(res=>({...res,fullname:e.target.value})) }}/>
<input name={"email"} className={styles.input + " " + (validateEmail(formData ? formData.email : 'test@gm.co') ? '' : styles.fielderror)} placeholder={"Enter your Email Address"} type={"text"} value={formData && formData.email} onChange={(e)=>{setFormData(res=>({...res,email:e.target.value})) }}/>
<input name={"phone"} className={styles.input + " " + (validatePhone(formData ? formData.phone : '+918888888888') ? '' : styles.fielderror)} placeholder={"Enter your Phone Number"} type={"text"} value={formData && formData.phone} onChange={(e)=>{setFormData(res=>({...res,phone:e.target.value})) }}/>
<CustomSelect single={true} z={9} full="true" defaultText="Select Subject" noPadding={true} objects={reasons} setSelect={(r)=>{setFormData(res=>({...res,subject:r}))}}/>
<textarea placeholder='Write Message Here' className={styles.input} onChange={(e)=>{setFormData(res=>({...res,message:e.target.value}))}}></textarea>
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

    </Section>
    </DefaultLayout>
}

export default Contact;