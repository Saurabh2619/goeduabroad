"use client"
import DefaultLayout from "../layouts/DefaultLayout"
import Head from "next/head"
import { ArrowRight, Calendar, Users, Lightbulb, Trophy, Briefcase, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Youngpreneurs() {
  const [isSubmitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loader, setLoader] = useState(false)
  const [currentSub, setSub] = useState("Register Now")
  const [notificationText, setNotificationText] = useState()
  const [timeoutId, setTimeoutId] = useState(null)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
  })
  const [formErrors, setFormErrors] = useState({
    fullname: false,
    email: false,
    phone: false,
    city: false,
  })

  const heading = ["Register Now", "It's Free", "Limited Seats"]

  function setNotification(de) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setNotificationText(de)
    const id = setTimeout(() => {
      setNotificationText()
      setTimeoutId(null)
    }, 2500)
    setTimeoutId(id)
  }

  useEffect(() => {
    var index = 0

    const r = setInterval(() => {
      if (index < heading.length - 1) {
        index++
        setSub(heading[index])
      } else {
        index = 0
        setSub(heading[0])
      }
    }, 2000)

    return () => {
      clearInterval(r)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1080) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })
  }, [])

  function validatePhone(phone) {
    const re = /^(\+\d{1,4})?(?!0+\s+,?$)\d{10}\s*,?$/
    return re.test(phone)
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function removeNumbers(str) {
    return str.replace(/[0-9]/g, "")
  }

  const sendLead = async (leadData) => {
    const { fullname, phone, email } = leadData

    if (!fullname || !phone || !email) {
      throw new Error("Missing required fields: fullname, phone, and email are required.")
    }

    try {
      const response = await axios.post(
        "/api/sendlead",
        {
          firstname: fullname,
          lastname: "", // optional
          phone,
          email,
          city: leadData.city,
          state: "",
          country: "India",
          message: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      return response.data
    } catch (error) {
      console.error("Error sending lead:", error)
      throw error
    }
  }

  async function SubmitContact() {
    // Reset all errors
    const errors = {
      fullname: false,
      email: false,
      phone: false,
      city: false,
    }
    let hasError = false

    if (!formData.fullname || formData.fullname.trim() === "") {
      errors.fullname = true
      hasError = true
      setNotification("Fullname field is empty")
    }

    if (!formData.email || formData.email.trim() === "") {
      errors.email = true
      hasError = true
      setNotification("Email field is empty")
    } else if (!validateEmail(formData.email)) {
      errors.email = true
      hasError = true
      setNotification("Email is not valid")
    }

    if (!formData.phone || formData.phone.trim() === "") {
      errors.phone = true
      hasError = true
      setNotification("Phone field is empty")
    } else if (!validatePhone(formData.phone)) {
      errors.phone = true
      hasError = true
      setNotification("Phone number is not valid")
    }

    if (!formData.city || formData.city.trim() === "") {
      errors.city = true
      hasError = true
      setNotification("City field is empty")
    }

    setFormErrors(errors)

    if (hasError) {
      return null
    }

    setLoader(true)

    try {
      await sendLead(formData)
      setLoader(false)
      setNotification("Submitted Successfully")
      setSubmitted(true)
    } catch (error) {
      setLoader(false)
      setNotification("Error submitting form. Please try again.")
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Join Youngpreneurs 2025 - India's Ultimate Business Showdown for students. Pitch your ideas, learn from experts, and win prizes worth up to ₹1,00,000!"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultLayout hideAI={true} navbar>
        <div className="w-full">
          {notificationText && notificationText.length > 2 ? (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50">
              {notificationText}
            </div>
          ) : (
            ""
          )}

          {loader ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                <svg
                  width="197px"
                  height="197px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  className="animate-spin"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#A41C30"
                    strokeWidth="3"
                    r="27"
                    strokeDasharray="127.23450247038662 44.411500823462205"
                  ></circle>
                </svg>
                <p className="mt-4">Submitting Form</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="bg-[#FFE4E6] w-full">
            <div className="w-full">
              {/* Full width banner at the top */}
              <div className="w-full">
                <img
                  src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1746341303/eventbanner_1_n38oyq.jpg"
                  alt="Youngpreneurs Event Banner"
                  className="w-full"
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero section with heading and form side by side */}
                <motion.section className="relative py-8 mb-16" {...fadeIn}>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Heading */}
                    <div className="flex flex-col justify-center">
                      <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        <span className="text-[#a61d31]">Fueling</span> the future, <br />
                        <span className="text-[#a61d31]">one idea</span> at a time
                      </h1>
                      <p className="mt-4 text-xl text-gray-700 leading-relaxed">
                        Brought to you by EduAbroad in collaboration with IPM Careers
                      </p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <div className="relative">
                          <motion.div
                            className="px-8 py-4 bg-[#a61d31] text-white font-semibold rounded-full text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-lg inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.span
                              key={currentSub}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="min-w-[180px] text-center"
                            >
                              {currentSub}
                            </motion.span>
                          </motion.div>
                        </div>
                        <motion.div
  className="px-8 py-4 bg-white text-[#a61d31] border-2 border-[#a61d31] font-semibold rounded-full text-lg shadow-lg inline-flex items-center"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Trophy className="mr-2 h-5 w-5" />
  <span>Be a Part of the Ultimate Challenge!</span>
</motion.div>
                      </div>
                    </div>

                    {/* Right side - Registration Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl" id="form">
                      <h3 className="text-2xl font-bold text-[#a61d31] mb-6">Fill out the form to Register</h3>
                      <div className="space-y-4">
                        <div>
                          <input
                            name={"name"}
                            maxLength={30}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.fullname ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder={"Enter your Full Name"}
                            type={"text"}
                            value={formData && formData.fullname}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, fullname: e.target.value }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, fullname: false }))
                              }
                            }}
                          />
                          {formErrors.fullname && <p className="text-red-500 text-xs mt-1">Full name is required</p>}
                        </div>
                        <div>
                          <input
                            name={"email"}
                            maxLength={50}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder={"Enter your Email Address"}
                            type={"text"}
                            value={formData && formData.email}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, email: e.target.value }))
                              if (validateEmail(e.target.value)) {
                                setFormErrors((prev) => ({ ...prev, email: false }))
                              }
                            }}
                          />
                          {formErrors.email && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
                        </div>
                        <div>
                          <input
                            name={"phone"}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder={"Enter your Phone Number"}
                            type={"text"}
                            value={formData && formData.phone}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, phone: e.target.value }))
                              if (validatePhone(e.target.value)) {
                                setFormErrors((prev) => ({ ...prev, phone: false }))
                              }
                            }}
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-xs mt-1">Valid 10-digit phone number is required</p>
                          )}
                        </div>
                        <div>
                          <input
                            name={"city"}
                            maxLength={20}
                            pattern="[a-zA-Z]+"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.city ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder={"Enter your City"}
                            type={"text"}
                            value={formData && formData.city}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, city: removeNumbers(e.target.value) }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, city: false }))
                              }
                            }}
                          />
                          {formErrors.city && <p className="text-red-500 text-xs mt-1">City is required</p>}
                        </div>
                        <button
                          onClick={SubmitContact}
                          className="w-full bg-[#a61d31] hover:bg-[#8a1827] text-white font-bold py-3 px-4 rounded-md transition duration-300"
                        >
                          SUBMIT
                        </button>
                        <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-yellow-500"
                            viewBox="0 0 93.63 122.88"
                          >
                            <path
                              d="M6 47.51h81.64a6 6 0 0 1 6 6v63.38a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V53.5a6 6 0 0 1 6-6Z"
                              style={{
                                fillRule: "evenodd",
                                fill: "#fbd734",
                              }}
                            />
                            <path
                              d="m41.89 89.26-6.47 16.95h22.79l-6-17.21a11.79 11.79 0 1 0-10.32.24ZM83.57 47.51H72.22v-9.42a27.32 27.32 0 0 0-7.54-19 24.4 24.4 0 0 0-35.73 0 27.32 27.32 0 0 0-7.54 19v9.42H10.06v-9.42a38.73 38.73 0 0 1 10.72-26.81 35.69 35.69 0 0 1 52.07 0 38.67 38.67 0 0 1 10.72 26.81v9.42Z"
                              style={{
                                fillRule: "evenodd",
                                fill: "#36464e",
                              }}
                            />
                          </svg>
                          <p>Your Data is End-to-End Encrypted!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>
            </div>
          </div>

          <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.section
              className="bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white p-8 sm:p-12 rounded-3xl shadow-2xl mb-24 w-full"
              {...fadeIn}
            >
              <h2 className="text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                INDIA'S ULTIMATE BUSINESS SHOWDOWN
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Calendar className="w-10 h-10" />,
                    title: "Event Date",
                    text: "1st June, 2025",
                  },
                  {
                    icon: <Globe className="w-10 h-10" />,
                    title: "Mode",
                    text: "100% Online",
                  },
                  {
                    icon: <Users className="w-10 h-10" />,
                    title: "Participants",
                    text: "Classes 9 to 12",
                  },
                  {
                    icon: <Briefcase className="w-10 h-10" />,
                    title: "Teams",
                    text: "1-3 members",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center space-y-3 bg-white bg-opacity-10 p-6 rounded-xl transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-xl">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-5xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Register for Youngpreneurs 2025
              </h2>
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#a61d31] mb-6">Overview of the Event</h3>
                <p className="text-lg mb-6">
                  Welcome to the Youngpreneurs 2025, this isn't your average school project, but an India's ultimate
                  business showdown, Shark Tank style!
                </p>
                <p className="text-lg mb-6">
                  We're here to celebrate the entrepreneurial pulse of India's brightest young minds. Whether you're
                  plotting the next tech unicorn or solving real-world problems from your classroom, this is your stage.
                  With EduAbroad and IPM Careers as your guiding stars, your ideas won't just be heard, they'll be
                  celebrated, refined, and potentially launched into orbit.
                </p>
                <div className="bg-[#a61d31] text-white py-2 px-4 rounded-md text-center font-bold mb-4">
                  INDIA'S ULTIMATE BUSINESS SHOWDOWN FOR STUDENTS
                </div>
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Who Should Attend?
              </h2>
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg">
                <div className="grid gap-8 md:grid-cols-2">
                  <motion.div
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      This competition is for:
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Students of Classes 9 to 12 who think differently, dream boldly, and aren't afraid to pitch big.",
                        "Anyone who's got a killer idea, a wild spark, or just wants to learn how the startup game works.",
                      ].map((benefit, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ArrowRight className="w-6 h-6 text-[#A41C30] flex-shrink-0 mt-1" />
                          <span className="text-base text-gray-700">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Your Entrepreneurial Journey
                    </h3>
                    <p className="text-lg text-gray-700 mb-6">
                      Think of this as your first step towards becoming the next Ritesh Agarwal, Falguni Nayar, or
                      even... Elon 2.0 (but with better memes)
                    </p>
                    <div className="bg-[#A41C30] text-white p-4 rounded-lg">
                      <p className="text-lg font-semibold">
                        This is your chance to showcase your innovative ideas and entrepreneurial spirit!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Meet Our Distinguished Jury
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Dr. Swati Abhishek Mishra",
                    title: "Founder- EduAbroad",
                    credentials: "Former Professor, IIM Lucknow | Global Education Strategist",
                    description:
                    "With a PhD from the University of Cambridge and MIT, Dr. Swati has guided thousands on international career paths over 25+ years. A recipient of prestigious global scholarships, she's a trusted mentor and policy advisor shaping futures with vision and empathy.",
                  },
                  {
                    name: "Prof. Abhishek Mishra",
                    title: "Strategist | Politician | Academic",
                    credentials: "Cambridge PhD | Former IIM Ahmedabad Professor",
                    description:
                    "A Cambridge PhD and former IIM Ahmedabad professor, Prof. Mishra served as Cabinet Minister in Uttar Pradesh and is currently National Secretary of the Samajwadi Party. With deep roots in academia, governance, and leadership, he bridges policy and education seamlessly.",
                  },
                  {
                    name: "Mr. Ashutosh Mishra",
                    title: "Founder- IPM Careers",
                    credentials: "IIM Ahmedabad Alumnus | Mentor & Educator",
                    description:
                      "A chemical engineer with managerial finesse, Mr. Ashutosh Mishra brings over a decade of teaching experience, having mentored 10,000+ students. As the academic cornerstone of IPM Careers, his student-first philosophy sets the gold standard in educational excellence.",
                  },
                  {
                    name: "Mr. J.S. Mishra (IAS Retd.)",
                    title: "Chancellor, Sushant University",
                    credentials: "Veteran Administrator | Education Visionary",
                    description:
                      "A veteran administrator and former IAS officer, Mr. J.S. Mishra brings decades of governance experience. As Chancellor of Sushant University, he upholds excellence in higher education through visionary leadership and institutional stewardship.",
                  },
                ].map((juror, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white flex items-center justify-center text-2xl font-bold mb-4">
                      {juror.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{juror.name}</h3>
                    <p className="text-[#a61d31] font-medium mb-2">{juror.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{juror.credentials}</p>
                    <p className="text-sm text-gray-700">{juror.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <motion.div
                  className="inline-block bg-[#A41C30] text-white py-2 px-6 rounded-full text-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Coming Soon...
                </motion.div>
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Should You Attend?
              </h2>
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                {[
                  {
                    icon: <Lightbulb className="w-12 h-12" />,
                    title: "Shark Tank Vibes",
                    description: "Learn the real-world art of pitching and business planning.",
                  },
                  {
                    icon: <Globe className="w-12 h-12" />,
                    title: "Global Exposure",
                    description: "Get noticed by India's premier B-school grads and global mentors.",
                  },
                  {
                    icon: <Zap className="w-12 h-12" />,
                    title: "Upskill in Style",
                    description:
                      "Build business decks, pitch like a pro, and maybe even kickstart your startup journey.",
                  },
                  {
                    icon: <Trophy className="w-12 h-12" />,
                    title: "Prizes & Certificates",
                    description: "Recognition & Prizes worth up to ₹1,00,000",
                  },
                  {
                    icon: <Users className="w-12 h-12" />,
                    title: "EduAbroad x IPM Careers Network",
                    description: "That's right. You're now part of a league of extraordinary young entrepreneurs.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-[#a61d31] mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section className="mb-24 bg-gray-50 p-8 rounded-3xl shadow-xl" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                From the Founder's Desk
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-4xl mx-auto">
                <div className="absolute -top-5 left-8">
                  <div className="bg-[#a61d31] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl">
                    "
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-lg mb-4">Dear Changemakers,</p>

                  <p className="mb-4">
                    Every remarkable venture begins with a spark, a what if, a why not, a bold idea sketched in the
                    margins of a notebook or exchanged in a quiet classroom moment. At EduAbroad, we believe those
                    sparks deserve a platform. That is why, in collaboration with IPM Careers, we have launched
                    Youngpreneurs 2025, not just as a competition but as a catalyst for change.
                  </p>

                  <p className="mb-4">
                    Having had the privilege of academic journeys through MIT and the University of Cambridge, and of
                    mentoring future leaders at IIM Lucknow, I have witnessed the extraordinary potential that emerges
                    when talent meets opportunity.
                  </p>

                  <p className="mb-4">
                    This is your chance to turn that spark into a structured business plan and pitch it to a panel of
                    experts. Whether your idea is pitch-ready or still taking shape, this is your moment to step
                    forward, share your vision, and challenge the status quo.
                  </p>

                  <p className="mb-4">
                    Because in doing so, we are not just building a venture; we are helping shape the future, one bold
                    idea at a time.
                  </p>

                  <p className="mb-4">With unwavering faith in your potential,</p>

                  <div className="mt-6">
                    <p className="font-bold">Dr. Swati Abhishek Mishra</p>
                    <p>Founder, EduAbroad</p>
                    <p>Former Professor, IIM Lucknow | Ph.D., University of Cambridge | MIT-USA</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="text-center bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white p-8 sm:p-12 rounded-3xl shadow-2xl mb-24"
              {...fadeIn}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to shape what's next?
              </h2>
              <p className="text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                Registrations are now open. Bring your boldest ideas and your sharpest pitch.
              </p>
              <p className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto">This is your moment. Own the spotlight.</p>
              <motion.a
                href="#form"
                className="px-8 py-3 bg-white text-[#A41C30] text-lg font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.a>
            </motion.section>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}
