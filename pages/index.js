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
import Link from 'next/link'
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import CustomSelect from '../components/CustomSelect';
import Marquee from "react-fast-marquee";
import { supabase } from '../utils/supabaseClient';
import Notifications from '../components/Notification';
const ResponsiveIFrame = ({ src }) => {
  return (
    <div className="video-container">
      <iframe
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
          height: "100%",
        }}
      />
    </div>
  );
};
export default function Home({datac,datad}) {
  const [mobile,setMobile] = useState('desktop');
const [getstarted,setGet] = useState();
const [notificationText,setNotificationText] = useState();
const [thankyou,setThankYou] = useState(false);
const [courses,setCourses] = useState([]);
const [mentors,setMentors] = useState();
const [loading,setLoading] = useState(false);
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
    image:'https://blog.hubspot.com/hubfs/customer-service-phrases.jpg'
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



setWidth();

    window.addEventListener("resize",(e)=>{
  setWidth()
    })
  
    window.addEventListener('load',()=>{
      setWidth();
    })
  },[])

  useEffect(()=>{
    console.log(datac,datad)
    {datac && datac.map((i,d)=>{
      setCourses(res=>([...res,{image:i.featured_image,title:i.heading,description:i.description,slug:i.slug}]))
    })}
    setMentors(datad)
  },[])
const herocountries = [
 
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
    title:'Canada',
    image:'https://static.vecteezy.com/system/resources/previews/011/571/442/original/circle-flag-of-canada-free-png.png',
    color:'skyblue',
  },
  {
    title:'Europe',
    image:'https://upload.wikimedia.org/wikipedia/commons/8/8b/Europe_flag_circle.png',
    color:'skyblue',
  },
  {
    title:'United States of America',
    image:'/us.png',
    color:'skyblue',
  },

]

const partners=[{
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/mit.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/1-300x118.jpg",
  title: "Massachusetts Institute of Technology",
  title2: "University Of Cambridge"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/1-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/2-300x118.jpg",
  title: "University Of Cambridge",
  title2: "University Of Oxford"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/2-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/3-300x118.jpg",
  title: "University Of Oxford",
  title2: "Yale University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/3-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/4-300x118.jpg",
  title: "Yale University",
  title2: "Wharton University Of Pennsylvania"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/4-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/5-300x118.jpg",
  title: "Wharton University Of Pennsylvania",
  title2: "London Business School"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/5-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/1-2.jpg",
  title: "London Business School",
  title2: "University of New South Wales"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/1-2.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/4-1.jpg",
  title: "University of New South Wales",
  title2: "University of Melbourne"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/4-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/3-1.jpg",
  title: "University of Melbourne",
  title2: "MCGill University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/3-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/1-1.jpg",
  title: "MCGill University",
  title2: "Harvard University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/1-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/5-1.jpg",
  title: "Harvard University",
  title2: "University of Toronto"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/5-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/uc.jpg",
  title: "University of Toronto",
  title2: "University College Dublin"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/uc.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/mit.jpg",
  title: "University College Dublin",
  title2: "Massachusetts Institute of Technology"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/mit.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/1-300x118.jpg",
  title: "Massachusetts Institute of Technology",
  title2: "University Of Cambridge"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/1-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/2-300x118.jpg",
  title: "University Of Cambridge",
  title2: "University Of Oxford"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/2-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/3-300x118.jpg",
  title: "University Of Oxford",
  title2: "Yale University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/3-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/4-300x118.jpg",
  title: "Yale University",
  title2: "Wharton University Of Pennsylvania"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/4-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/5-300x118.jpg",
  title: "Wharton University Of Pennsylvania",
  title2: "London Business School"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/5-300x118.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/1-2.jpg",
  title: "London Business School",
  title2: "University of New South Wales"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/1-2.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/4-1.jpg",
  title: "University of New South Wales",
  title2: "University of Melbourne"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/4-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/3-1.jpg",
  title: "University of Melbourne",
  title2: "MCGill University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/3-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/1-1.jpg",
  title: "MCGill University",
  title2: "Harvard University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/1-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/5-1.jpg",
  title: "Harvard University",
  title2: "University of Toronto"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/5-1.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/03/uc.jpg",
  title: "University of Toronto",
  title2: "University College Dublin"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/03/uc.jpg",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/DPS-lko.png",
  title: "University College Dublin",
  title2: "DPS, lko"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/DPS-lko.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Cathedral.png",
  title: "DPS, lko",
  title2: "Cathedral"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Cathedral.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Wipro.png",
  title: "Cathedral",
  title2: "Wipro"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Wipro.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/KPMG.png",
  title: "Wipro",
  title2: "KPMG"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/KPMG.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Royal-Bank-of-Scotland.png",
  title: "KPMG",
  title2: "Royal Bank of Scotland"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Royal-Bank-of-Scotland.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Amazon.png",
  title: "Royal Bank of Scotland",
  title2: "Amazon"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Amazon.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/APS-logo.png",
  title: "Amazon",
  title2: "APS"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/APS-logo.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Jaypee-Institute-of-Information-Technology.png",
  title: "APS",
  title2: "Jaypee Institute of Information Technology"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Jaypee-Institute-of-Information-Technology.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Byjus-logo.png",
  title: "Jaypee Institute of Information Technology",
  title2: "Byjus"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Byjus-logo.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Seth-mr-Jaipuria.png",
  title: "Byjus",
  title2: "Seth M.R Jaipuria"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Seth-mr-Jaipuria.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/All-saints-nainital.png",
  title: "Seth M.R Jaipuria",
  title2: "All Saints, Nainital"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/All-saints-nainital.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/vibgyor-high-school.png",
  title: "All Saints, Nainital",
  title2: "Vibgyor High School"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/vibgyor-high-school.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Lucknow-University.png",
  title: "Vibgyor High School",
  title2: "Lucknow University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Lucknow-University.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/it-college.png",
  title: "Lucknow University",
  title2: "IT College"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/it-college.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/AGDC.png",
  title: "IT College",
  title2: "AGDC"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/AGDC.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2021/07/Loreto-logo.png",
  title: "AGDC",
  title2: "Loreto"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2021/07/Loreto-logo.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/09/Mayour-School-Noida.png",
  title: "Loreto",
  title2: "Mayoor School Noida"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/09/Mayour-School-Noida.png",
  image2: "https://gocareerguru.com/wp-content/uploads/2020/09/Amity-Intenational-School.png",
  title: "Mayoor School Noida",
  title2: "Amity International School"
}, {
  image: "https://gocareerguru.com/wp-content/uploads/2020/09/Amity-Intenational-School.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/09/Amity-University.png",
  title: "Amity International School",
  title2: "Amity University"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/09/Amity-University.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/09/Delhi-Public-School.png",
  title: "Amity University",
  title2: "Delhi Public School"
}, {
  image: "http://gocareerguru.com/wp-content/uploads/2020/09/Delhi-Public-School.png",
  image2: "http://gocareerguru.com/wp-content/uploads/2020/09/CITY-MONTESSORY-SCHOOL.png",
  title: "Delhi Public School",
  title2: "CMS"
}]
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

const results = [
  
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
  {
    title:'Bhavya Mishra',
    description:'For me who has no one in family ever been to USA getting admission to US university seems like an arduous and impossible task before we came in touch with Abhishek. He helped me from preparing for SAT to getting accommodation after I got admission. He helped me in all the steps of the process and continue to help with internship search using his networks of contacts in USA. I got admission in 6 schools out of 7 I applied, I got scholarship from 3 Universities. Currently, I am studying at University of Buffalo that offered me $48,000 scholarship.',
    stars:4,
    image:'/r3.jpg',
    college:'University of BATH',
    },
    {
      title:'Titiksha Singh',
      description:'For me who has no one in family ever been to USA getting admission to US university seems like an arduous and impossible task before we came in touch with Abhishek. He helped me from preparing for SAT to getting accommodation after I got admission. He helped me in all the steps of the process and continue to help with internship search using his networks of contacts in USA. I got admission in 6 schools out of 7 I applied, I got scholarship from 3 Universities. Currently, I am studying at University of Buffalo that offered me $48,000 scholarship.      ',
      stars:4,
      image:'/r4.jpg',
      college:'University of Buffalo',
      },
      {
        title:'Dr.Naman Tandon',
        description:'I undertook career guidance advice from Dr. Swati A Mishra while I was in my first year of  BSc Life Sciences from Hansraj College, University of Delhi. She helped me identify my career goals and pathways. Under her able guidance and profile building exercise, I got admission to the prestigious King’s College London, UK, where I did MSc in Immunology. Then again she guided me for  PhD in Immunology from the University of Paris, France. Now I am working with National Institute of Health, USA. Dr. Mishra has been a mentor and guide throughout my journey. I strongly recommend services offered by Go Career Guru and especially the profile building exercise, it’s very well developed and has helped me a lot for achieving my career aspirations.        ',
        stars:4,
        image:'/r5.png',
        college:'Universite de Paris'
        },
        {
          title:'Anannya',
          description:'Under the able guidance of Professor Swati Mishra, my vision to Study Abroad has taken shape. I made it through top ranked universities in UK like, SOAS, University of Glasgow, Leeds University. I also was able to bag a number of Scholarships worth almost 75% to cover my tuition fee. Glad that I was in such good hands. I strongly recommend the Team. They are best there is in the Indian market.          ',
          stars:5,
          image:'/r6.jpg',
          college:'SOAS  - University of London',
          },
          {
            title:'Prabal Muttoo',
            description:'Started taking advice from Dr. Swati Mishra and her team of experts about 15 months before my intended month of entry. The entire process, from the counselling sessions to streamlining of the SOP, LOR submissions etc was well coordinated. Throughout the application process, the team pushes you to make every aspect of the application perfect. Overall, the approach was very professional and practical. Prior to the one-on-one counselling sessions, I had a brief interaction on possible career options to explore the domain I wished for. The team is highly responsive and goes out of their way to help you. I highly recommend Career Guru to any student aspiring to get into top institutions. I got offers from SOAS – University of London, LSE, Edinburgh among other universities. I finally joined LSE and graduated with an MSc in Politics and Communication.',
            stars:4,
            image:'/r9.jpeg',
            college:'The London University of Economics & Political Science',
            },
            {
              title:'Vishisht Tiwari',
              description:'M.Engineering in Electrical and Computer Engineering from Cornell University, USA. B.Engineering in Electronic Engineering from the University of Manchester, UK. Currently working at Intertrust Technologies in San Francisco as a Software Engineer specializing in Cyber Security.              ',
              stars:4,
              image:'/r10.jpg',
              college:'Cornell University',
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
/* 
const courses = [
  
  {
title:'Course 1',
description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

image:'https://cdn.dribbble.com/users/3956332/screenshots/15328827/online_courses_4x.jpg'
},
{
  title:'Course 2',
  description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  image:'https://img.freepik.com/premium-vector/online-courses-concept_23-2148524391.jpg'
  },
  {
    title:'Course 3',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    
    image:'https://cdn.dribbble.com/users/2501809/screenshots/6381280/4.jpg'
    },
    {
      title:'Course 4',
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      
      image:'https://img.freepik.com/premium-vector/language-learning-education-training-courses-online-illustration-foreign-languages-by-internet-phone-app-icons-english-german-french-university-school-course-dictionary_109722-2554.jpg'
      }

] */
async function SubmitContact(){

  if(formData && formData.fullname && formData.email && formData.phone && formData.goal && validateEmail(formData.email) && validatePhone(formData.phone)){
    setLoading(true)
    const {data,error} = await supabase.from('leads').insert({
        name:formData.fullname,
email:formData.email,
phone:formData.phone,

subject:formData.goal,
source:'Homepage'
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

function setNotification(de){

  setNotificationText(de);
  setTimeout(()=>{setNotificationText()},2500);
}

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
        <title>Edu Abroad | Study in Abroad</title>
        <meta name="description" content="Study in Abroad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/edufavicon.svg" />
        
      </Head>
      <DefaultLayout>
      {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
         {thankyou ? <div className={styles.modaloverlay}><div className={styles.modal}><h2>Thank You for Submission</h2><p>Our Executive will get back to you shortly meanwhile you can browse our website or apply for more services or preparation plans.</p>
        <div>

            <a onClick={(e)=>{e.preventDefault(),setThankYou(false)}}>Browse More</a>
            <a href="tel:+919044442989">Call Us</a>
        </div>
        </div></div>:''}  
        <div className={styles.hero}>
          <video muted playsInline="true" autoplay="true" loop="true"><source src='/v2.mp4'/></video>
<div className={styles.mask}></div>
<div
className={styles.content}>
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

  return <div className={styles.cont}><img src={i.image}/> <p>{i.title}</p></div>
})}</div>
</div>
</div>
        </div>
      <Section title=":Who are we?" align="left" color="var(--brand-col1)" small>
{/* <img className={styles.right} src={'/rightimage.png'}/> */}
<div className={styles.who}>

  <div className={styles.col1}>
    <p>Edu Abroad is founded by former Professor of IIM Lucknow, Dr. Swati Abhishek Mishra. She holds a Master’s in Management in a joint program with University of Cambridge and Massachusetts Institute of Technology, and a PhD. in Strategy and Marketing from University of Cambridge. She was the winner of various prestigious scholarships like Cambridge Commonwealth Trust Scholar, DFID (UK Government) Scholar, Hinduja Foundation Scholar, Worts Travellling Scholars Fund, and numerous other scholarships. She has been a keen educator, mentor and nurtured thousands of students over the last two decades. She has extensive corporate and government consulting experience in Strategy and Growth domain........</p>
  <Link href={'/about'}><button className={styles.mainbutton}>Read More</button></Link>
  </div>
  <div className={styles.col2}>
  <ResponsiveIFrame
      src="https://www.youtube.com/embed/iCl30mTXKnk"
    />

  </div>
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
  {results && results.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.rcard} >
      <img src={i.image}/>
      <div className={styles.rbadge}>{i.college}</div>
      <div className={styles.cric} style={{backgroundImage:"url("+i.image+")"}}></div>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      <p>{i.description}</p>
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
  {courses && courses.map((i,d)=>{

    return <SwiperSlide key={i}>
      <div className={styles.ccard} >
      <img src={i.image}/>
      <div class={styles.cardcontent}>
      <h2>{i.title}</h2>
      {i.description? <p>{i.description.substring(0,160)}...</p>:''}
   
    <div className={styles.buttons}>
<Link href="/contact">Enroll Now</Link>
<Link href={`/testpreps/${i.slug}`}>Read More</Link>

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
      
      pagination={{ 
        el:".paginate3",
        
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
 <div className={"paginate3"}></div>
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
      
      pagination={{ 
        el:".paginate4",
        
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
 <div className={"paginate4"}></div>
</Section>
<Section title="Featured Universities" align="center" color="var(--brand-col1)">
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
      
      pagination={{ 
        el:".paginate5",
        
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


     
      
      {mentors && mentors.map((item,index)=>{

return(<>

<SwiperSlide key={index}><a className={styles.dcard} style={{backgroundImage:"url("+item.image+")"}}>
  
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
<div onClick={SubmitContact} className={styles.submit}>
{loading? 
    <svg width="800px" height="800px" viewBox="0 0 256 256" id="Flat" fill="white">
  <path d="M64,136H32a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16ZM173.25488,90.74512a7.97769,7.97769,0,0,0,5.65723-2.34278l22.62695-22.62695a8.00052,8.00052,0,1,0-11.31445-11.31445l-22.627,22.627a8,8,0,0,0,5.65722,13.65723ZM65.77539,54.46094A8.00052,8.00052,0,0,0,54.46094,65.77539l22.627,22.62695A8.00052,8.00052,0,0,0,88.40234,77.08789Zm11.3125,113.13672-22.62695,22.627a8.00052,8.00052,0,0,0,11.31445,11.31445l22.62695-22.62695a8.00052,8.00052,0,0,0-11.31445-11.31445ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.08789,47.59766a8.00052,8.00052,0,0,0-11.31445,11.31445l22.627,22.62695a8.00052,8.00052,0,1,0,11.31445-11.31445ZM128,184a8.00039,8.00039,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8.00039,8.00039,0,0,0,128,184Zm0-160a8.00039,8.00039,0,0,0-8,8V64a8,8,0,0,0,16,0V32A8.00039,8.00039,0,0,0,128,24Z"/>
</svg>
:''}
  SUBMIT</div>

</div>
        </div>
<div className={styles.aitool}>
<img src='/collegpano.png'/>
  <h2>Our AI Tool will help you to choose suitable university for yourself</h2>
  <a href="https://www.applyboard.com/partners/354594/intake-form">Get Started, It's Free !!</a>
</div>


      </DefaultLayout>
    </>
  )
}


export async function getServerSideProps(context){

  const [datac,datad] = await Promise.all([supabase.from('testpreps').select('*'),supabase.from('mentors').select('*')])
  
  
  return { props: {datac: datac ? datac.data : {}, datad:datad? datad.data : {}} } 
  }