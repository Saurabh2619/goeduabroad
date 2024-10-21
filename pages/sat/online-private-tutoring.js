
import { useState } from 'react'
import { Card, Input, Button, Spacer , Avatar, Navbar, NavbarBrand, Modal,ModalBody,ModalContent,ModalHeader,ModalFooter, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,CardHeader,CardBody,CardFooter,Accordion,AccordionItem } from '@nextui-org/react'
import { supabase } from '../../utils/supabaseClient'
import "tailwindcss/tailwind.css";
import { User, MapPin, ShoppingCart, ChevronDown, Phone } from 'lucide-react'
import Image from 'next/image'
import {toast} from 'react-hot-toast'



export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  })
  const [isSubmitted,setIsSubmitted] = useState(false)
  const currentYear = new Date().getFullYear()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    // Basic form validation
    const { name, email, phone, city } = formData
  
    // Email regex pattern for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Phone regex pattern to accept only numbers (optional: set a reasonable length)
    const phonePattern = /^[0-9]{10,15}$/
  
    if (!name || !email || !phone || !city) {
      toast.error('Please fill in all the fields.')
      return
    }
  
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }
  
    if (!phonePattern.test(phone)) {
      toast.error('Please enter a valid phone number (digits only).')
      return
    }
  
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([formData])
  
      if (error) throw error
  
      toast.success('Form submitted successfully:', data)
      // Reset form after successful submission
      setFormData({ name: '', email: '', phone: '', city: '' })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to submit form.')
    }
  }
  const testimonials = [
    {
      "name": "Ambar",
      "city": "Lucknow",
      "score": "1470/1600 - Maths (800/800)",
      "content": "I am really proud of my SAT score of 1470/1600, especially my perfect score of 800/800 in Mathematics. I worked hard to achieve this result, and I’m excited about the opportunities that lie ahead for me in pursuing my academic goals.",
      "image": "/ambar.jpg"
    },
    {
      "name": "Devanshi Verma",
      "city": "Indore",
      "score": "1400/1600 - English (760/800)",
      "content": "Scoring 1400/1600 in the SAT, with 760/800 in the English section, has been an amazing experience for me. I put a lot of effort into preparing, and I’m glad it paid off. This score gives me the confidence to pursue my dreams in higher education.",
      "image": "/devanshi.jpg"
    },
    {
      "name": "Abir Bajaj",
      "city": "Lucknow",
      "score": "1350/1600",
      "content": "I’m happy with my SAT score of 1350/1600, and it motivates me to keep pushing toward my goals. It has been a challenging journey, but I am ready for what’s next in my academic life.",
      "image": "/abir.jpg"
    }
  ]
  
  const teachers = [
    {
      name: "Sanjeev Rathore",
      role: "English (Verbal Ability)",
      image: "/sj.jpg",
    
      description:<><p>Over 12 years of teaching experience since 2012.<br/> Recognized with the Most Punctual Teacher Award from 2017 to 2023.<br/> Awarded for innovative learning hacks in vocabulary mnemonics.<br/> Postgraduate in English Language.</p>
      <a href="https://youtu.be/dRw48Mv_b-M" target='_blank' className='text-sm flex flex-row my-2 text-primary items-center justify-start font-bold'>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  className="external-icon mr-2"
  viewBox="0 0 28.57  20"
  focusable="false"
  style={{
    pointerEvents: "none",
    display: "block",
    width: 24,
    height: 24
  }}
  
>
  <script xmlns="" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28.57 20"
    preserveAspectRatio="xMidYMid meet"
  >
    <g>
      <path
        d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
        fill="#FF0000"
      />
      <path
        d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
        fill="white"
      />
    </g>
  </svg>
  <script xmlns="" />
</svg>
        Josh Talks Speaker</a>
      </>
    },
    {
      name: "Divya Pandey",
      role: "English (Verbal Ability)",
      image: "/divya.jpg",
      description: <p>Over 15 years of experience in guiding and training 1500+ students on their IELTS journey and abroad applications.<br/> Consistently helping students achieve IELTS scores of 7+ bands. <br/>Expertise in securing admissions and scholarships at top universities such as Boston University, UCL, LBS, and Warwick.<br/> Successfully helped students secure scholarships worth ₹4 crore+.</p>
    },
    {
        name: "Abhishek Singh",
        role: "Maths (Quantitative Ability)",
        image: "/abk.jpg",
        description: <p>Over 5 years of experience mentoring thousands of students for CAT, IPMAT, and SAT exams.<br/> 2 years at Class24 and 2 years at Chanakya Defence Academy, Dehradun.<br/> Expertise in effective strategies for students with Special Educational Needs (SEN) and consistently delivering exceptional exam results.<br/> B.Tech from FGIET, Raebareli.</p>
      }
  ]
  const faqItems = [
    {
      question: "When should I start preparing for the SAT exam?",
      answer: "One should start preparing for the SAT exam immediately after class 10th board exams. Take the diagnostic test to assess where you stand currently."
    },
    {
      question: "Will I get practice questions?",
      answer: "You can practice through the questions available in the online portal. There are 2500+ questions to solve."
    },
    {
      question: "Will I get practice mocks?",
      answer: "Yes. Every student who enrolls with us for SAT Online Classes gets 5 Original official style mock tests as a part of the program."
    },
    {
      question: "What if I have any query regarding the program?",
      answer: "You can speak to a counsellor regarding any query related to SAT by registering on this page. You can also mail your queries to info@eduabroad.com"
    }
  ]
  const features = [
    {
      title: "Enriching Interactive Classes",
      description: "Get mentored by expert faculty in the interactive classes where the focus is on your growth",
      icon: "/ic.avif",
      bgColor: "bg-purple-600",
      textColor: "text-white",
    },
    {
      title: "Personalized Course Curriculum",
      description: "Classes will be structured keeping in mind your requirements and speed of learning.",
      icon: "/personalized.avif",
      bgColor: "bg-lime-500",
      textColor: "text-white",
    },
    {
      title: "Exhaustive Online Practice Material",
      description: "Aid your preparation with the best SAT® practice material - Worksheets, Practice Questions, Sectional and Full-length Mock Tests",
      icon: "/onlinepracticce.webp",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Personalised Prep Backed by Data Analytics",
      description: "We use robust data analytics to deliver customized study plans, interactive test reports, progress trackers, and performance indicators",
      icon: "/dataanalytics.webp",
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
  ]

  const features2 = [
    "60+ Hours of SAT Online Private Tutoring",
    "2500+ Online Practice Questions in Pre-class, In-class, Post-class, Topic tests & 92 Sectional Tests",
    "10 Full-length Official Style Mocks for SAT",
    "Access to class recordings for Revisions and Backups",
    "One to One Mock Analysis with both Verbal and Quant Faculties",
    "Strategy Sessions to achieve target score",
    "Boot camp just before SAT date",
    "One to One Doubt Clearing Sessions with Faculties",
    "One to One Performance Review & Score Improvement Sessions with faculties"
  ]

  const additionalFeatures = [
    { title: "One-on-One Live Classes", icon: "/onolc.avif", bgColor: "bg-purple-600" },
    { title: "Comprehensive Study Material", icon: "/sm.webp", bgColor: "bg-lime-500" },
    { title: "Learn from the best", icon: "/lftb.avif", bgColor: "bg-orange-500" },
    { title: "Streamlined Curriculum", icon: "/sc.jpg", bgColor: "bg-blue-500" }
  ]
  return (<>
  <Navbar className="bg-white font-sans border-b border-gray-200" maxWidth='2xl'>
      <NavbarBrand className='relative'>
        <Image src="/enl.svg" alt="Edu Abroad Logo" className='w-22 relative h-full' width={150} height={30} />
       
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
       
        <NavbarItem className="flex items-center">
       
          <Phone size={16} className="mr-1" />
          <Link href='tel:+919044442989' className="mr-4">+91 904 444 2989</Link>
       
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex sm:hidden gap-4" justify="end">
       
       <NavbarItem className="flex items-center">
      
        
         <Button startContent={ <Phone size={16}  className="mr-1" />} as={Link} href='tel:+919044442989' color='primary' >Call Us</Button>
      
       </NavbarItem>
     </NavbarContent>
     
    </Navbar>


    <Modal 
      isOpen={isSubmitted} 
      onClose={()=>{setIsSubmitted(false)}}
      placement="center"
       
    >
      <ModalContent className=' font-sans'>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-success-600 text-2xl flex-col gap-1">Thank You!</ModalHeader>
            <ModalBody>
              <p>
                Thank you for submitting your information. We appreciate your interest in our SAT preparation program.
              </p>
              <p>
                One of our counselors will contact you shortly to discuss how we can help you achieve your target SAT score.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={()=>{setIsSubmitted(false)}}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    

    <div className="flex font-sans py-2 sm:py-12 bg-blue-500 overflow-hidden relative" id='form'>
        <img src='https://www.universityofcalifornia.edu/sites/default/files/styles/feature_banner_image/public/2022-01/2018_03_12_UCR_day1_post-79.jpg?h=0c170278&itok=6dn4jQxG' className='w-full h-full left-0 top-0 opacity-20 mix-blend-luminosity absolute object-center object-cover'/>
        <div className='container mx-auto w-full flex flex-col md:flex-row items-center justify-center'>
      <div className="flex-1 p-8 text-white z-10">
        <h1 className="text-4xl font-bold mb-4">SAT® Online Private Tutoring</h1>
        <p className="text-xl mb-6">
          Personalized program to help you achieve your target SAT® score!
        </p>
        <ul className="space-y-2">
          <li>✓ One-on-One Live Classes</li>
          <li>✓ Personalized Preparation</li>
          <li>✓ Exhaustive Study Material</li>
          <li>✓ Led by top instructors</li>
          <li>✓ Performance insights backed by powerful data analytics</li>
        </ul>
      </div>
      <div className="flex-1 z-10 relative !p-4 w-full flex items-center justify-center">
        <Card className="p-6 w-full sm:w-96">
          <Link as={Link} href='#form' className="text-2xl font-bold mb-4">Speak to a Counsellor</Link>
          <form onSubmit={handleSubmit}>
            <Input
              name="name"
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Spacer y={2} />
            <Input
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Spacer y={2} />
            <Input
              name="phone"
              label="Phone"
              placeholder="Enter your Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Spacer y={2} />
            <Input
              name="city"
              label="City"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <Spacer y={4} />
            <Button type="submit" color="primary" className="w-full">
              Submit
            </Button>
          </form>
        </Card>
      </div></div>
    </div>

{/* Testimonials */}

<section className="bg-gray-100 py-16 font-sans">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-navy-900 mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white p-4 shadow-lg">
              <CardHeader className="flex gap-4">
                <Avatar classNames={{base:"w-24 h-24 flex-shrink-0"}} src={testimonial.image} size="lg" />
                <div>
                  <h3 className="text-xl text-primary font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.score}</p>
                  
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 text-sm">{testimonial.content}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>



    <div className="bg-gray-100 py-16 font-sans">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">Why Us ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card shadow="none" key={index} className="border font-sans border-gray-200">
            
              <CardBody className="p-4 flex flex-col items-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={450}
                  height={450}
                  className="mb-4 aspect-square object-cover w-full"
                />
               
              </CardBody>
              <CardFooter className={`${feature.bgColor} ${feature.textColor} p-4 flex aspect-auto sm:aspect-square flex-col items-center justify-center`}>
                <h3 className="text-xl font-semibold text-center">{feature.title}</h3>
                <p className="text-center text-md text-gray-100">{feature.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>

{/* Teahcers */}
<section className="bg-gray-50 font-sans py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-navy-900 text-primary mb-8">Know your teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <Card shadow='none' key={index} className="bg-white shadow-sm">
              <CardHeader className="flex gap-4">
                <Avatar src={teacher.image} classNames={{base:'w-24 flex-shrink-0 h-24'}} />
                <div>
                  <h3 className="text-xl font-semibold text-primary">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.role}</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-gray-700 text-xs">{teacher.description}</div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button as={Link} href='#form' color="warning" size="lg">
            Speak to a counselor
          </Button>
        </div>
      </div>
    </section>

    <div className="bg-gray-100 py-16 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-blue-500 p-4 text-white">
            <CardHeader>
              <h2 className="text-2xl font-bold">Program Features</h2>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {features2.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader className={`${feature.bgColor} text-white p-2`}>
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardBody className="p-4 flex items-center justify-center">
                  <Image
                   className='w-full aspect-square object-contain'
                    src={feature.icon}
                    alt={feature.title}
                    width={450}
                    height={450}
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button color="warning" size="lg" as={Link} href='#form'>
            Speak to a counselor
          </Button>
        </div>
      </div>
    </div>


   
    
    <section className="bg-white w-full font-sans py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary text-navy-900 mb-8">Frequently Asked Questions</h2>
        <Accordion  variant="light" className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem classNames={{title:"font-bold"}} key={index} aria-label={item.question} title={item.question}>
              <p className="text-gray-700">{item.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    <footer className="bg-gray-100 py-4 mt-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-2 sm:mb-0">
            <span className="font-semibold text-primary text-navy-900">EduAbroad</span> - Run by Harvard-Cambridge Alumni
          </div>
         
          <div className="mt-2 sm:mt-0">
            © {currentYear} EduAbroad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    
    </>
  )
}