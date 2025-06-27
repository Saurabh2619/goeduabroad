"use client"

import { useState } from "react"
import {
  Card,
  Input,
  Button,
  Avatar,
  Navbar,
  NavbarBrand,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  NavbarContent,
  NavbarItem,
  Link,
  CardHeader,
  CardBody,
  CardFooter,
  Accordion,
  AccordionItem,
} from "@nextui-org/react"
import "tailwindcss/tailwind.css"
import { Phone, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import Script from "next/script"
import axios from "axios"

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    firstname: "",
    yearOfPassing: "",
    neetAppeared: "",
    intake: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAllFAQs, setShowAllFAQs] = useState(false)
  const currentYear = new Date().getFullYear()
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // SWIFT AMS sendlead data start here
  const sendLead = async (leadData) => {
    const { firstname, phone, email, city } = leadData

    if (!firstname || !phone || !email || !city) {
      throw new Error("Missing required fields: firstname, phone, and email are required.")
    }

    try {
      const response = await axios.post("/api/sendlead", leadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error sending lead:", error)
      throw error
    }
  }
  //end here

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Map form data to match the sendLead function requirements
      const leadData = {
        firstname: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
      }

      await sendLead(leadData)
      setIsSubmitted(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        firstname: "",
        yearOfPassing: "",
        neetAppeared: "",
        intake: "",
      })

      toast.success("Thank you! We'll contact you shortly.")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const testimonials = [
    {
      name: "Ambar",
      city: "Lucknow",
      score: "1470/1600 - Maths (800/800)",
      content:
        "I am really proud of my SAT score of 1470/1600, especially my perfect score of 800/800 in Mathematics. I worked hard to achieve this result, and I'm excited about the opportunities that lie ahead for me in pursuing my academic goals.",
      image: "/ambar.jpg",
    },
    {
      name: "Devanshi Verma",
      city: "Indore",
      score: "1400/1600 - English (760/800)",
      content:
        "Scoring 1400/1600 in the SAT, with 760/800 in the English section, has been an amazing experience for me. I put a lot of effort into preparing, and I'm glad it paid off. This score gives me the confidence to pursue my dreams in higher education.",
      image: "/devanshi.jpg",
    },
    {
      name: "Abir Bajaj",
      city: "Lucknow",
      score: "1350/1600",
      content:
        "I'm happy with my SAT score of 1350/1600, and it motivates me to keep pushing toward my goals. It has been a challenging journey, but I am ready for what's next in my academic life.",
      image: "/abir.jpg",
    },
  ]

  const teachers = [
    {
      name: "Sanjeev Rathore",
      role: "English (Verbal Ability)",
      image: "/sj.jpg",

      description: (
        <>
          <p>
            Over 12 years of teaching experience since 2012.
            <br /> Recognized with the Most Punctual Teacher Award from 2017 to 2023.
            <br /> Awarded for innovative learning hacks in vocabulary mnemonics.
            <br /> Postgraduate in English Language.
          </p>
          <a
            href="https://youtu.be/dRw48Mv_b-M"
            target="_blank"
            className="text-sm flex flex-row my-2 text-primary items-center justify-start font-bold"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="external-icon mr-2"
              viewBox="0 0 28.57  20"
              focusable="false"
              style={{
                pointerEvents: "none",
                display: "block",
                width: 24,
                height: 24,
              }}
            >
              <script xmlns="" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.57 20" preserveAspectRatio="xMidYMid meet">
                <g>
                  <path
                    d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                    fill="#FF0000"
                  />
                  <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                </g>
              </svg>
              <script xmlns="" />
            </svg>
            Josh Talks Speaker
          </a>
        </>
      ),
    },
    {
      name: "Sanjeev Saxena",
      role: "Senior Faculty & Test Prep Mentor",
      image: "/saxena.jpg",
      description: (
        <p>
          With over 35 years of teaching experience, Sanjeev Sir is a highly respected mentor in standardized test
          preparation. He has successfully guided thousands of students across subjects including AP (Statistics,
          Calculus, and Mathematics), Digital SAT, GMAT, GRE, IELTS, TOEFL, PTE, and DET. Known for his deep conceptual
          clarity and student-centered approach, he brings unmatched expertise and dedication to every classroom
          session.
        </p>
      ),
    },
    {
      name: "Abhishek Singh",
      role: "Maths (Quantitative Ability)",
      image: "/abk.jpg",
      description: (
        <p>
          Over 5 years of experience mentoring thousands of students for CAT, IPMAT, and SAT exams.
          <br /> 2 years at Class24 and 2 years at Chanakya Defence Academy, Dehradun.
          <br /> Expertise in effective strategies for students with Special Educational Needs (SEN) and consistently
          delivering exceptional exam results.
          <br /> B.Tech from FGIET, Raebareli.
        </p>
      ),
    },
  ]

  const faqItems = [
    {
      question: "How many students are in each batch?",
      answer: "Each batch has 10–15 students to ensure personalized attention and active learning.",
    },
    {
      question: "What if I miss a class?",
      answer: "You'll get recordings (if available) and can attend doubt sessions to catch up.",
    },
    {
      question: "Are the classes recorded?",
      answer: "Yes, class recordings are provided for revision and backup.",
    },
    {
      question: "Can I join a new batch if I fall behind?",
      answer: "Yes, you can shift to another batch, subject to availability.",
    },
    {
      question: "Are mock tests included?",
      answer: "Yes, we provide 10+ full-length mock tests and sectional practice tests.",
    },
    {
      question: "Do I get personalized feedback?",
      answer: "Absolutely. Faculty offer one-on-one feedback after tests to guide your progress.",
    },
    {
      question: "Who can join this SAT coaching?",
      answer: "Ideal for Class 10–12 students preparing for the Digital SAT.",
    },
    {
      question: "Where are the offline classes held?",
      answer: "Classes are conducted at EduAbroad centers with IPM Careers. Contact us for locations.",
    },
    {
      question: "What's the benefit of offline SAT coaching?",
      answer: "In-person interaction, peer learning, and real-time doubt clearing—things online classes often miss",
    },
    {
      question: "When should I start SAT prep?",
      answer: "Start at least 6–9 months before your test date for the best results.",
    },
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
      description:
        "Aid your preparation with the best SAT® practice material - Worksheets, Practice Questions, Sectional and Full-length Mock Tests",
      icon: "/onlinepracticce.webp",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Personalised Prep Backed by Data Analytics",
      description:
        "We use robust data analytics to deliver customized study plans, interactive test reports, progress trackers, and performance indicators",
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
    "One to One Performance Review & Score Improvement Sessions with faculties",
  ]

  const additionalFeatures = [
    { title: "One-on-One Live Classes", icon: "/onolc.avif", bgColor: "bg-purple-600" },
    { title: "Comprehensive Study Material", icon: "/sm.webp", bgColor: "bg-lime-500" },
    { title: "Learn from the best", icon: "/lftb.avif", bgColor: "bg-orange-500" },
    { title: "Streamlined Curriculum", icon: "/sc.jpg", bgColor: "bg-blue-500" },
  ]

  const displayedFAQs = showAllFAQs ? faqItems : faqItems.slice(0, 5)

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17036003431" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17036003431');
        `}
      </Script>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Navbar className="bg-white font-sans border-b border-gray-200 sticky top-0 z-50" maxWidth="2xl">
        <NavbarBrand className="relative">
          <Image src="/enl.svg" alt="Edu Abroad Logo" className="w-22 relative h-full" width={150} height={30} />
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem className="flex items-center">
            <Phone size={16} className="mr-1" />
            <Link href="tel:+919044442989" className="mr-4 hover:text-blue-600 transition-colors">
              +91 904 444 2989
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex sm:hidden gap-4" justify="end">
          <NavbarItem className="flex items-center">
            <Button
              startContent={<Phone size={16} className="mr-1" />}
              as={Link}
              href="tel:+919044442989"
              color="primary"
              size="sm"
            >
              Call Us
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Modal
        isOpen={isSubmitted}
        onClose={() => {
          setIsSubmitted(false)
        }}
        placement="center"
      >
        <ModalContent className="font-sans">
          {(onClose) => (
            <>
              <ModalHeader className="flex text-success-600 text-2xl flex-col gap-1">Thank You!</ModalHeader>
              <ModalBody>
                <p>
                  Thank you for submitting your information. We appreciate your interest in our SAT preparation program.
                </p>
                <p>
                  One of our counselors will contact you shortly to discuss how we can help you achieve your target SAT
                  score.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    setIsSubmitted(false)
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Simple Hero Banner with Cloudinary Image */}
      <div className="relative">
        <Image
          src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1751024715/WhatsApp_Image_2025-06-27_at_16.47.56_fbsvhb.jpg"
          alt="SAT Preparation Program"
          width={1920}
          height={800}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Container wrapper for all content after hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Form Section - Mobile Optimized */}
        <section className="bg-white py-16 font-sans" id="form">
          <div className="container mx-auto px-4">
            {/* Mobile Layout: Form first, then content */}
            <div className="block lg:hidden">
              {/* Mobile Form Section */}
              <div className="mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-3xl shadow-2xl border border-blue-100">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Ready to Boost Your SAT Score?</h3>
                  </div>

                  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                    <CardBody className="p-4">
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Sign Up for a Free Demo Class</h4>
                        <div className="w-16 h-1 bg-[#A51C30] mx-auto rounded-full"></div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          name="firstname"
                          label="firstname"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          size="sm"
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="email"
                          label="Email Address"
                          placeholder="Enter your email address"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          size="sm"
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="phone"
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          size="sm"
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="city"
                          label="City"
                          placeholder="Enter your city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          size="sm"
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Button
                          type="submit"
                          color="primary"
                          className="w-full bg-[#A51C30] text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                          isLoading={isSubmitting}
                          disabled={isSubmitting}
                          size="md"
                        >
                          {isSubmitting ? "Submitting..." : "Get Free Demo Class"}
                        </Button>
                      </form>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Mobile Content Section */}
              <div>
                <div className="mb-8">
                  <h2
                    className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Why Choose Our SAT Prep Program?
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "✅ Expert-Led Learning from the Start",
                      points: [
                        "60+ Hours of Live Classes",
                        "15+ Years of Experience",
                        "Comprehensive Study Material",
                        "Time-tested Strategies",
                      ],
                    },
                    {
                      title: "✅ Practice & Assessment to Build Confidence",
                      points: [
                        "20 Full-length SAT Mock Tests",
                        "Online Portal with 100+ Topic-wise Tests",
                        "SAT Workshops Prior to the Exam",
                        "Final Revision Sessions",
                      ],
                    },
                    {
                      title: "✅ Personalized Support at Every Step",
                      points: [
                        "Unlimited Doubt Sessions",
                        "Mock Analysis Sessions",
                        "Performance Review Sessions",
                        "Score Improvement Strategies",
                      ],
                    },
                    {
                      title: "✅ Flexible & Student-friendly Learning",
                      points: [
                        "Access to Class Recordings",
                        "Revision and Backup Materials",
                        "Flexible Scheduling Options",
                        "24/7 Learning Support",
                      ],
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                    >
                      <h3 className="text-base font-bold text-[#A51C30] mb-3">{section.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Layout: Side by side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Enhanced Form Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-2xl border border-blue-100">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 Ready to Boost Your SAT Score?</h3>
                  </div>

                  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                    <CardBody className="p-6">
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Sign Up for a Free Demo Class</h4>
                        <div className="w-16 h-1 bg-[#A51C30] mx-auto rounded-full"></div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          name="name"
                          label="Full Name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="email"
                          label="Email Address"
                          placeholder="Enter your email address"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="phone"
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Input
                          name="city"
                          label="City"
                          placeholder="Enter your city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          classNames={{
                            input: "text-gray-900",
                            inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                          }}
                        />

                        <Button
                          type="submit"
                          color="primary"
                          className="w-full bg-[#A51C30] text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          isLoading={isSubmitting}
                          disabled={isSubmitting}
                          size="lg"
                        >
                          {isSubmitting ? "Submitting..." : "Get Free Demo Class"}
                        </Button>
                      </form>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Right Column - Enhanced Content Section */}
              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <h2
                    className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Why Choose Our SAT Prep Program?
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    {
                      title: "✅ Expert-Led Learning from the Start",
                      points: [
                        "60+ Hours of Live Classes",
                        "15+ Years of Experience",
                        "Comprehensive Study Material",
                        "Time-tested Strategies",
                      ],
                    },
                    {
                      title: "✅ Practice & Assessment to Build Confidence",
                      points: [
                        "20 Full-length SAT Mock Tests",
                        "Online Portal with 100+ Topic-wise Tests",
                        "SAT Workshops Prior to the Exam",
                        "Final Revision Sessions",
                      ],
                    },
                    {
                      title: "✅ Personalized Support at Every Step",
                      points: [
                        "Unlimited Doubt Sessions",
                        "Mock Analysis Sessions",
                        "Performance Review Sessions",
                        "Score Improvement Strategies",
                      ],
                    },
                    {
                      title: "✅ Flexible & Student-friendly Learning",
                      points: [
                        "Access to Class Recordings",
                        "Revision and Backup Materials",
                        "Flexible Scheduling Options",
                        "24/7 Learning Support",
                      ],
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                    >
                      <h3 className="text-lg font-bold text-[#A51C30] mb-3">{section.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16 font-sans rounded-2xl my-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-navy-900 mb-12">
              Success Stories from Our Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <CardHeader className="flex gap-4 pb-4">
                    <Avatar classNames={{ base: "w-16 h-16 flex-shrink-0" }} src={testimonial.image} size="lg" />
                    <div>
                      <h3 className="text-xl text-primary font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.city}</p>
                      <p className="text-green-600 font-bold text-sm">{testimonial.score}</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-700 text-sm leading-relaxed">{testimonial.content}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        {/* <div className="bg-white py-16 font-sans">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-navy-900 mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card
                  shadow="none"
                  key={index}
                  className="border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <CardBody className="p-4 flex flex-col items-center">
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt={feature.title}
                      width={450}
                      height={450}
                      className="mb-4 aspect-square object-cover w-full rounded-lg"
                    />
                  </CardBody>
                  <CardFooter
                    className={`${feature.bgColor} ${feature.textColor} p-6 flex flex-col items-center justify-center min-h-[140px]`}
                  >
                    <h3 className="text-lg font-semibold text-center mb-2">{feature.title}</h3>
                    <p className="text-center text-sm text-gray-100 leading-relaxed">{feature.description}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div> */}

        {/* Teachers Section */}
        <section className="bg-gray-50 font-sans py-16 rounded-2xl my-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Meet Your Expert Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <Card
                  shadow="none"
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="flex gap-4 p-6">
                    <Avatar src={teacher.image} classNames={{ base: "w-20 flex-shrink-0 h-20" }} />
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{teacher.name}</h3>
                      <p className="text-gray-600 text-sm">{teacher.role}</p>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6">
                    <div className="text-gray-700 text-sm leading-relaxed">{teacher.description}</div>
                  </CardBody>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button as={Link} href="#form" color="warning" size="lg" className="px-8 py-3">
                Speak to a Counselor
              </Button>
            </div>
          </div>
        </section>

        {/* Program Features */}
        {/* <div className="bg-white py-16 font-sans">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                <CardHeader>
                  <h2 className="text-2xl md:text-3xl font-bold">Complete Program Features</h2>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-3">
                    {features2.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-yellow-400 font-bold">✓</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className={`${feature.bgColor} text-white p-3`}>
                      <h3 className="text-sm font-semibold text-center">{feature.title}</h3>
                    </CardHeader>
                    <CardBody className="p-4 flex items-center justify-center">
                      <Image
                        className="w-full aspect-square object-contain"
                        src={feature.icon || "/placeholder.svg"}
                        alt={feature.title}
                        width={450}
                        height={450}
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button color="warning" size="lg" as={Link} href="#form" className="px-8 py-3">
                Get Started Today
              </Button>
            </div>
          </div>
        </div> */}

        {/* Enhanced FAQ Section with Read More */}
        <section className="bg-gray-50 w-full font-sans py-16 rounded-2xl my-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary text-navy-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto">
              <Accordion variant="light" className="bg-white rounded-xl shadow-lg p-4">
                {displayedFAQs.map((item, index) => (
                  <AccordionItem
                    classNames={{
                      title: "font-bold text-gray-900 hover:text-blue-600 transition-colors",
                      content: "text-gray-700 leading-relaxed",
                    }}
                    key={index}
                    aria-label={item.question}
                    title={item.question}
                  >
                    <p className="pb-4">{item.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>

              {faqItems.length > 5 && (
                <div className="text-center mt-8">
                  <Button
                    variant="bordered"
                    color="primary"
                    size="lg"
                    onClick={() => setShowAllFAQs(!showAllFAQs)}
                    endContent={showAllFAQs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    className="px-8 py-3 border-2 hover:bg-blue-50 transition-all duration-300"
                  >
                    {showAllFAQs ? "Show Less FAQs" : "Read More FAQs"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#A51C30] to-[#8B1538] py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Raise Your SAT Score?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their target scores with our expert guidance
          </p>
          <Button
            as={Link}
            href="#form"
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ scrollBehavior: "smooth" }}
          >
            Enroll in a Batch Today
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-100 py-4 mt-8 font-sans">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="mb-2 sm:mb-0">
              <span className="font-semibold text-primary text-navy-900">EduAbroad</span> - Run by Harvard-Cambridge
              Alumni
            </div>
            <div className="mt-2 sm:mt-0">© {currentYear} EduAbroad. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
