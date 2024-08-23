import "tailwindcss/tailwind.css";
import {useState} from 'react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Spacer } from "@nextui-org/react";
import Link from "next/link";
import Marquee from 'react-fast-marquee'
export default function GoogleReviews(){

const [stars,setStars] = useState(5)

const reviews = [
    {
        "name": "Poonam Choudhary",
        "review": "I had a fantastic experience with EduAbroad while preparing for the IELTS exam. Their instructors are highly knowledgeable, providing clear and effective strategies that helped me improve my scores in all sections. The personalized feedback and supportive environment made the learning process smooth and enjoyable. I felt fully prepared and confident on exam day, and I credit their excellent teaching methods for my success. Highly recommend them for anyone serious about acing the IELTS!",
        "rating": 5
    },
    {
        "name": "Abuzar Khan",
        "review": "Best study consultant for study abroad and IELTS examination",
        "rating": 5
    },
    {
        "name": "Devam Chandra",
        "review": "I had an excellent experience with EduAbroad. Their team was professional, attentive, and went above and beyond to meet my needs. The quality of their services was top-notch, and I appreciated their commitment to customer satisfaction. Highly recommend them to anyone looking for reliable and efficient service!",
        "rating": 5
    },
    {
        "name": "Sanchita Ghosh",
        "review": "I had a truly positive experience with EduAbroad. Their team displayed remarkable professionalism and ensured that all my requirements were met with precision. The quality of their work exceeded my expectations, and their attention to detail was impressive. Overall, their commitment to delivering excellent service makes them a standout choice, and I wouldn't hesitate to recommend them to others.",
        "rating": 5
    },
    {
        "name": "Srishti Tripathi",
        "review": "Very amazing team and they provide valuable guidance and mentorship. Very dedicated and highly skilled.",
        "rating": 5
    },
    {
        "name": "Shivaji Singh",
        "review": "Great facility. The teachers are great, they are also very helping in all manners.",
        "rating": 5
    },
    {
        "name": "Sani Hasan",
        "review": "Good people, they take time to listen to your problems and advise an optimal solution for the problem. My counsellor was Divya ma'am who has been with me in every step of the way and has accommodated my requests for choosing a university. She has handled everything from forms to the admission process very nicely.",
        "rating": 5
    },
    {
        "name": "Rishabh Kapoor",
        "review": "They're top-quality study abroad consultants, especially in IELTS prep as they're official CAMBRIDGE LEARNING PARTNERS!",
        "rating": 5
    },
    {
        "name": "Manvi Tiwari",
        "review": "EduAbroad offers exceptional IELTS prep and study abroad advice. Best decision I made! Highly recommended for all.",
        "rating": 5
    }
]

    return <div className="flex flex-col justify-center items-center">

<div className="flex flex-col sm:flex-row items-start  sm:items-center font-sans justify-center w-full">
        <div className="flex-1 ">
            <h2 className="font-sans flex flex-row items-center text-2xl font-bold"><GoogleIcon></GoogleIcon> Our Google Reviews</h2>
            <div className="flex flex-row my-2 items-center justify-start">
            {Array(5).fill().map((i,d)=>{
                return <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z" fill={d <stars ? '#F39C19':'#ddd'}/></svg>
            })}
            <p className="ml-2"><strong>{stars}.0 rating</strong> based on 80 Reviews</p>
            </div>
        </div>
       <div className="flex-1 flex flex-row items-center justify-end">
        <Button as={Link} href="https://maps.app.goo.gl/AJUa99bZy4L7M6Fj8" target="_blank" color="primary" >Write a Review</Button>
        </div></div>

<Marquee pauseOnClick pauseOnHover speed={100} gradientWidth={20} autoFill={true}>
<div className="flex flex-row items-center flex-shrink-0 h-full py-8">
    {reviews && reviews.map((i,d)=>{
        return <div className="w-[300px] p-2 h-full" key={i.name} >
        <Card className="w-full h-full">
            <CardHeader>
                <div className="rounded-full bg-primary flex flex-row items-center justify-center text-white font-bold w-12 h-12">
                    {i.name.split(' ')?.map((t,ind)=>{
                        return <span className="p-0">{t.substring(0,1)}</span>
                    })}
                </div>
                <p className="font-bold font-sans ml-2">{i.name}</p>
            </CardHeader>
            <CardBody>
                <p className="font-sans text-xs">{i?.review?.length > 100 ?  i?.review?.substring(0,100) + "..." :i?.review}</p>
            <div className="flex flex-row items-center">
            {Array(5).fill().map((z,v)=>{
                return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z" fill={d <i.rating ? '#F39C19':'#ddd'}/></svg>
            })}</div>
            </CardBody>
            <CardFooter className="font-sans">
                <GoogleIcon></GoogleIcon>
                
                <p className="font-bold text-md">Google Review</p>
            </CardFooter>
        </Card></div>
    })}</div></Marquee>
</div>

}


const GoogleIcon = ()=>{
    return  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    className="mr-2"
   >
    <script />
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
    <script />
  </svg>
}