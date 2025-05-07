"use client"
import DefaultLayout from "../layouts/DefaultLayout"
import Head from "next/head"
import { ArrowRight, Calendar, Users, Lightbulb, Trophy, Briefcase, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Youngpreneurs() {
  const [isSubmitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loader, setLoader] = useState(false)
  const [notificationText, setNotificationText] = useState()
  const [timeoutId, setTimeoutId] = useState(null)
  const [formData, setFormData] = useState({
    team_name: "",
    team_leader: "",
    member_1: "",
    member_2: "",
    school_name: "",
    class: "",
    contact_number: "",
    email: "",
  })
  const [formErrors, setFormErrors] = useState({
    team_name: false,
    team_leader: false,
    school_name: false,
    class: false,
    contact_number: false,
    email: false,
  })

  function setNotification(de) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setNotificationText(de)
    const id = setTimeout(() => {
      setNotificationText()
      setTimeoutId(null)
    }, 3000) // Increased to 3 seconds (3000ms)
    setTimeoutId(id)
  }

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

  // New function to save data to Supabase
  const saveToSupabase = async (formData) => {
    const {
      team_name,
      team_leader,
      member_1,
      member_2,
      school_name,
      class: classValue,
      contact_number,
      email,
    } = formData

    if (!team_name || !team_leader || !school_name || !classValue || !contact_number || !email) {
      throw new Error("Missing required fields")
    }

    try {
      const { data, error } = await supabase.from("webinar_entries").insert([
        {
          team_name,
          team_leader,
          member_1,
          member_2,
          school_name,
          class: Number.parseInt(classValue),
          contact_number,
          email,
        },
      ])

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error saving to Supabase:", error)
      throw error
    }
  }

  async function SubmitContact() {
    // Reset all errors
    const errors = {
      team_name: false,
      team_leader: false,
      school_name: false,
      class: false,
      contact_number: false,
      email: false,
    }
    let hasError = false

    if (!formData.team_name || formData.team_name.trim() === "") {
      errors.team_name = true
      hasError = true
      setNotification("Team name field is empty")
    }

    if (!formData.team_leader || formData.team_leader.trim() === "") {
      errors.team_leader = true
      hasError = true
      setNotification("Team leader field is empty")
    }

    if (!formData.school_name || formData.school_name.trim() === "") {
      errors.school_name = true
      hasError = true
      setNotification("School name field is empty")
    }

    if (!formData.class || formData.class.trim() === "") {
      errors.class = true
      hasError = true
      setNotification("Class field is empty")
    }

    if (!formData.contact_number || formData.contact_number.trim() === "") {
      errors.contact_number = true
      hasError = true
      setNotification("Contact number field is empty")
    } else if (!validatePhone(formData.contact_number)) {
      errors.contact_number = true
      hasError = true
      setNotification("Contact number is not valid")
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

    setFormErrors(errors)

    if (hasError) {
      return null
    }

    setLoader(true)

    try {
      await saveToSupabase(formData)
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-2xl z-50 w-full max-w-md"
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-lg font-semibold">{notificationText}</p>
              </div>
            </motion.div>
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
                  src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1746454383/06Artboard_1_4x_ojk6pi.png"
                  alt="Youngpreneurs Event Banner"
                  className="w-full"
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero section with heading and form side by side */}
                <motion.section className="relative py-8 md:py-12 mb-8 md:mb-16" {...fadeIn}>
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left side - Heading */}
                    <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
                      <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        <span className="text-[#a61d31]">"Dream It.</span> Pitch It. <br />
                        <span className="text-[#a61d31]">Build It."</span>
                      </h1>
                      <p className="mt-4 text-xl text-gray-700 leading-relaxed">
                        Brought to you by EduAbroad in collaboration with IPM Careers
                      </p>
                      <div className="mt-8 flex flex-col gap-4 w-full">
                        <motion.div
                          className="px-8 py-4 bg-[#a61d31] text-white font-semibold rounded-full text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-lg inline-flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          <span>Register Now</span>
                        </motion.div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold mb-2">Who can register?</h4>
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li>Students from Classes 9–12 (any board)</li>
                            <li>Solo or Team (up to 3 members)</li>
                            <li>Each team must nominate a Team Leader</li>
                          </ul>
                          <h4 className="font-bold mb-2">Registration Form:</h4>
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li>Team Name</li>
                            <li>Team Leader & Members' Name</li>
                            <li>School Name</li>
                            <li>Class</li>
                            <li>Contact Phone Number</li>
                            <li>Contact Email</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Registration Form */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full" id="form">
                      <h3 className="text-2xl font-bold text-[#a61d31] mb-6">Registration Form</h3>
                      <div className="space-y-4 relative">
                        <div>
                          <input
                            name="team_name"
                            maxLength={30}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.team_name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter your Team Name"
                            type="text"
                            value={formData.team_name}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, team_name: e.target.value }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, team_name: false }))
                              }
                            }}
                          />
                          {formErrors.team_name && <p className="text-red-500 text-xs mt-1">Team name is required</p>}
                        </div>
                        <div>
                          <input
                            name="team_leader"
                            maxLength={30}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.team_leader ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter Team Leader Name"
                            type="text"
                            value={formData.team_leader}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, team_leader: e.target.value }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, team_leader: false }))
                              }
                            }}
                          />
                          {formErrors.team_leader && (
                            <p className="text-red-500 text-xs mt-1">Team leader name is required</p>
                          )}
                        </div>
                        <div>
                          <input
                            name="member_1"
                            maxLength={30}
                            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-[#a61d31] focus:border-[#a61d31]"
                            placeholder="Enter Member 1 Name (Optional)"
                            type="text"
                            value={formData.member_1}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, member_1: e.target.value }))
                            }}
                          />
                        </div>
                        <div>
                          <input
                            name="member_2"
                            maxLength={30}
                            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-[#a61d31] focus:border-[#a61d31]"
                            placeholder="Enter Member 2 Name (Optional)"
                            type="text"
                            value={formData.member_2}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, member_2: e.target.value }))
                            }}
                          />
                        </div>
                        <div>
                          <input
                            name="school_name"
                            maxLength={50}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.school_name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter School Name"
                            type="text"
                            value={formData.school_name}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, school_name: e.target.value }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, school_name: false }))
                              }
                            }}
                          />
                          {formErrors.school_name && (
                            <p className="text-red-500 text-xs mt-1">School name is required</p>
                          )}
                        </div>
                        <div>
                          <input
                            name="class"
                            maxLength={2}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.class ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter Class (9-12)"
                            type="number"
                            min="9"
                            max="12"
                            value={formData.class}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, class: e.target.value }))
                              if (e.target.value.trim() !== "") {
                                setFormErrors((prev) => ({ ...prev, class: false }))
                              }
                            }}
                          />
                          {formErrors.class && <p className="text-red-500 text-xs mt-1">Class is required (9-12)</p>}
                        </div>
                        <div>
                          <input
                            name="contact_number"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.contact_number ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter Contact Number"
                            type="text"
                            value={formData.contact_number}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, contact_number: e.target.value }))
                              if (validatePhone(e.target.value)) {
                                setFormErrors((prev) => ({ ...prev, contact_number: false }))
                              }
                            }}
                          />
                          {formErrors.contact_number && (
                            <p className="text-red-500 text-xs mt-1">Valid 10-digit contact number is required</p>
                          )}
                        </div>
                        <div>
                          <input
                            name="email"
                            maxLength={50}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31] ${
                              formErrors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData((res) => ({ ...res, email: e.target.value }))
                              if (validateEmail(e.target.value)) {
                                setFormErrors((prev) => ({ ...prev, email: false }))
                              }
                            }}
                          />
                          {formErrors.email && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
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
              className="bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl mb-16 md:mb-24 w-full"
              {...fadeIn}
            >
              <h2 className="text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                KEY DETAILS AT A GLANCE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    icon: <Calendar className="w-10 h-10" />,
                    title: "Event Date",
                    text: "1st June 2025",
                  },
                  {
                    icon: <Globe className="w-10 h-10" />,
                    title: "Mode",
                    text: "100% Online",
                  },
                  {
                    icon: <Users className="w-10 h-10" />,
                    title: "Registration",
                    text: "5th May - 25th May 2025",
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
              <div className="bg-gray-50 p-6 md:p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#a61d31] mb-6">Overview of the Event</h3>
                <p className="text-lg mb-6">
                  Welcome to the Youngpreneurs 2025, this isn't your average school project, but India's ultimate
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
              <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
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
                    Think of this as your first step towards becoming the next Ritesh Agarwal, Falguni Nayar, or even...
                    Elon 2.0.
                  </p>
                  <div className="bg-[#A41C30] text-white p-4 rounded-lg">
                    <p className="text-lg font-semibold">
                      This is your chance to showcase your innovative ideas and entrepreneurial spirit!
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Meet Our Jury
              </h2>
              <div className="bg-white p-6 md:p-12 rounded-3xl shadow-lg text-center">
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    className="inline-block bg-[#A61d31] text-white py-4 md:py-6 px-8 md:px-12 rounded-xl text-2xl md:text-3xl font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Coming Soon...
                  </motion.div>
                  <div className="flex justify-center mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-400"
                        style={{ marginLeft: i > 1 ? "-1rem" : "0" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Stay tuned to meet our panel of distinguished industry experts and mentors who will evaluate your
                    innovative ideas.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section className="mb-24" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Should You Attend?
              </h2>
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                    description: "Recognition & Gift Vouchers worth up to ₹50,000 | Free Career Guidance Sessions",
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
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative max-w-4xl mx-auto">
                <div className="absolute -top-5 left-8">
                  <div className="bg-[#a61d31] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    "
                  </div>
                </div>
                <div className="absolute -bottom-3 right-8 transform rotate-180">
                  <div className="bg-[#a61d31] text-white w-8 h-8 rounded-full flex items-center justify-center text-xl shadow-lg">
                    "
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-lg mb-4">Dear Changemakers,</p>

                  <p className="mb-4">
                    Every remarkable venture begins with a spark, a what if, a why not, a bold idea sketched in the
                    margins of a notebook or exchanged in a quiet classroom moment. At EduAbroad, we believe those
                    sparks deserve a platform. That is why, in collaboration with IPM Careers, we have launched
                    Youngpreneurs 2025 as a platform for innovation and bold thinking, where student ideas are developed
                    into impactful ventures with real-world relevance. We live by the event's tagline Dream it. Pitch
                    it. Build it, and we are here to support you in the journey to success.
                  </p>

                  <p className="mb-4">
                    Having had the privilege of academic journeys through MIT and the University of Cambridge, and of
                    mentoring future leaders at IIM Lucknow, I have witnessed the extraordinary potential that emerges
                    when talent meets opportunity.
                  </p>

                  <p className="mb-4">
                    Whether your pitch is refined or still evolving, now is the time to share your vision. Present it to
                    a panel of experts and challenge the status quo.
                  </p>

                  <p className="mb-4">
                    Because in doing so, you are not just building a venture; you are helping shape the future, one bold
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
              className="text-center bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl mb-16 md:mb-24"
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
              <div className="mt-8 bg-white bg-opacity-10 p-4 md:p-6 rounded-xl max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-3">Steps to Register:</h3>
                <ol className="text-left space-y-2 pl-6 list-decimal">
                  <li className="text-white">Fill in names, classes, schools, and contact details</li>
                  <li className="text-white">Mention your team name and a 2–3-line idea summary</li>
                  <li className="text-white">Hit Submit – Confirmation lands in your inbox within 24 hours</li>
                </ol>
              </div>
            </motion.section>
          </div>
          {/* Scroll to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-[#a61d31] text-white p-3 rounded-full shadow-lg z-50 hover:bg-[#8a1827] transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
      </DefaultLayout>
    </>
  )
}
