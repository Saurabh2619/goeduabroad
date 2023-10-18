import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import styles from './Quiz.module.css';
import Switch from '../../components/Switch';
import axios from 'axios';
import { cbKey } from '../../utils/cronBerryKey';


const formFields = [
    {
      type: 'text',
      key: 'fullname',
      placeholder: 'Full Name',
      label: 'Full Name',
    },
    {
      type: 'email',
      key: 'email',
      placeholder: 'Email',
      label: 'Email',
    },
    {
      type: 'text',
      key: 'phone',
      placeholder: 'Phone Number (Indian)',
      label: 'Phone Number (Indian)',
    },
    {
      type: 'checkbox',
      key: 'studyabroad',
      label: 'Planning to Study Abroad ?',
    },
    {
      type: 'text',
      key: 'city',
      placeholder: 'City',
      label: 'City',
    },
  ];

const Game = (props)=>{

const [currentLevel,setCurrentLevel] = useState(0);
const [questions,setQuestions] = useState(props.questions);
const [scoreCount,setScoreCount] = useState(0);


async function submitScore(){
    const {error} = await supabase.from('quiz_submissions').insert({
        name:props?.details?.fullname,
        email:props?.details?.email,
        score:scoreCount,
        phone:props?.details?.phone
    })

    if(!error){
        props.onComplete("Score Submitted")
    }
}

function handleAnswer(a){
setCurrentLevel(res=>res+1);



if(a == true){
    setScoreCount(res=>res+1);
    
}else{

}
}

useEffect(()=>{
    if(currentLevel == questions?.length ){

        
        submitScore()
        }
},[scoreCount])


return <div className={styles.questions}>
    

{currentLevel < questions?.length  ? 
<><div className={styles.score}>Your Score : {scoreCount}</div>
<h3>Hi {props.details.fullname}, <br/> Please select correct answers to score as much as you can.</h3>
    {currentLevel != undefined && questions != undefined && questions.map((i,d)=>{

        return <div className={styles.question + " " + (currentLevel == d ? styles.activeQuestion : '')}>
           <h2> {i.question}</h2>
           <p>Choose the correct answer</p>
          <div className={styles.options}> {i.options && i.options.map((z,v)=>{
            return <div className={styles.option} onClick={()=>{handleAnswer(z.isCorrect)}}>{z.option}</div>
           })}</div>
        </div>
    })}</>:
    <div>
<h1 className={styles.scoreMain}>
      Congratulations,<br/> Your Score is </h1>
      <div className={styles.green}>{scoreCount}</div>
      <p className={styles.det}>If you are eligible you will receive a certificate from us.</p>
    </div>
    
    }



</div>


}
  const DynamicForm = ({ fields , onSubmit , onError}) => {
    const initialFormData = Object.fromEntries(
      fields.map((field) => [field.key, field.type === 'checkbox' ? false : ''])
    );
  
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(
      Object.fromEntries(fields.map((field) => [field.key, '']))
    );
  
    const handleInputChange = (e,b) => {
        
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
  
      if (name === 'email' || name === 'phoneNumber') {
        validateField(name, newValue);
      }
    };
  
    const validateField = (fieldName, value) => {
      const newFormErrors = { ...formErrors };
  
      switch (fieldName) {
        case 'email':
          newFormErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ''
            : 'Invalid email address';
          break;
        case 'phoneNumber':
          newFormErrors.phoneNumber = /^\d{10}$/.test(value)
            ? ''
            : 'Invalid phone number (10 digits)';
          break;
        default:
          break;
      }
  
      setFormErrors(newFormErrors);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (isFormValid()) {
        // Handle form submission
        console.log('Form data submitted:', formData);
        onSubmit(formData)
      } else {
        // Form is not valid; display error messages
        console.log('Form data is invalid. Please correct the errors.');
        onError("Please fill correct details")
      }
    };
  
    const isFormValid = () => {
      for (const key in formErrors) {
        if (formErrors[key]) {
          return false;
        }
      }
      return true;
    };
  
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            {field.type === 'text' || field.type === 'email' ? (
              <input
                type={field.type}
                name={field.key}
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={handleInputChange}
              />
            ) : field.type === 'checkbox' ? (
             <Switch placeholder={field.placeholder} value={formData[field.key] || false} onChange={(e)=>{setFormData(res=>({...res,[field.key]:e}))}}></Switch>
            ) : null}
            {field.key === 'email' && <div className={styles.error}>{formErrors.email}</div>}
            {field.key === 'phoneNumber' && (
              <div className={styles.error}>{formErrors.phoneNumber}</div>
            )}
          </div>
        ))}
  
        <button className={styles.button} type="submit">Submit</button>
      </form>
    );
  }


function Quiz({data}){

const a = data;


const [state,setState] = useState(0);
const [notificationtext,setNotificationText] = useState()
const [userDetails,setUserDetails] = useState();

async function triggerInterakt(a){
    axios.post('./api/interakt',{
      userId: Date.now(),
      phoneNumber: a.phone,
      countryCode: "+91",
      event: "Campaign Notification",
      name: a.fullname,
      email: a.email,
  
      tag: "Landing Page"
    }).then(res=>{
      console.log(res)
    }).catch(res=>{
      console.log(res)})
  }

  function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke) {

    console.log(arguments)
  
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
                "paramValue": "EduAbroad Quiz Page"
            }
        ]
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
  
        if (this.readyState === 4) {
            
           
            setNotification('Get Ready for the Game')
            setState(2)
  
        }
    });
    xhr.open("POST", "https://api.cronberry.com/cronberry/api/campaign/register-audience-data");
    xhr.setRequestHeader("Content-Type", "application/json");
  
  
    xhr.send(data);
  }
async function SubmitContact(formData){
  
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
    if (formData.studyabroad == undefined) {
      setNotification('Please Select your Plan to Study Abroad');
      return null;
    }
  
    // Validate the year
    
  
    // Check city
    if (!formData.city || formData.city.trim() === '') {
      setNotification('City field is empty');
      return null;
    }
      
      
      /* TestApi(); */
      triggerInterakt(formData);
        /* await axios.post('/') */
        setUserDetails(formData)
        cronberryTrigger(formData.fullname,formData.email,formData.phone,formData.studyabroad,formData.city,'https://goeduabroad.com');
        const {data,error} = await supabase.from('leads').insert({
          name:formData.fullname,
  email:formData.email,
  phone:formData.phone,
  subject:formData.studyabroad,
  source:'Quiz Page'
      }).select();
   
   
  }

function setNotification(a){
    setNotificationText(a)
    setTimeout(()=>{
        setNotificationText()
    },2000)
}

    return <div className={styles.fullmain}>
      
    <div className={styles.main}>

        {notificationtext != undefined ?  <div className={styles.not}>{notificationtext}</div> :''}
        <div className={styles.nav}><img className={styles.logo} width={64} src='/edulogo.svg'/> <h2>{a.title}</h2></div>
        
        <div className={styles.container}>
        <div className={styles.bg}></div>
{state != undefined && state == 0 ? 
<div className={styles.welcome}>
    Welcome to EduAbroad's {a.title}
    <div className={styles.button} onClick={()=>{setState(1)}}>Start Quiz</div>
</div> : ''
}

{state != undefined && state == 1 ? 
<div className={styles.formcontainer}>
    <h2>Please fill the details to <br/><span style={{color:"var(--brand-col1)"}}>play {a.title}</span></h2>
<DynamicForm onError={(e)=>{setNotification(e)}} fields={formFields} onSubmit={(e)=>{SubmitContact(e)}}></DynamicForm>
</div>
:''}

{state != undefined && state == 2 ? 
<div className={styles.game}>
<Game questions={data.questions} details={userDetails} onComplete={(e)=>{setNotification(e)}}></Game>
</div>
:''}

        </div>
        </div></div>
}


export default Quiz;

export async function getServerSideProps(context) {
    // Fetch data from external API
  
  
    const [data] = await Promise.all([
    
  await supabase
  .from('quiz')
  .select('*')
  .match({'slug':context.query.slug})
    ]);
  
  if(data?.data?.length == 0){
    return {
        redirect: {
          destination: '/404', // Set the destination route where you want to redirect
          permanent: false, // Set this to true for a 301 permanent redirect, or false for a 302 temporary redirect
        }}
  }
  
  
  
  
  
  
  
  
    
    return { props: {data:data.data[0]} }
  }