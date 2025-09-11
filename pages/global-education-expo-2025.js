"use client"

import DefaultLayout from "../layouts/DefaultLayout"
import Head from "next/head"
import { Users, Gift, GraduationCap, Phone, Mail, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"
import { Input, Button } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { gtag_report_conversion } from "../utils/googleTag"

export default function StudyAbroadFair() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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

  // Countdown Timer Effect
  useEffect(() => {
    const eventDate = new Date("2025-09-27T00:00:00") // Target Event Date

    const timer = setInterval(() => {
      const now = new Date()
      const diff = eventDate - now

      if (diff <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const leadData = {
        firstname: `${formData.name} ~~Global Education Expo 2025`,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
      }

      await sendLead(leadData)

      // Trigger Google Tag Conversion
      gtag_report_conversion("AW-11123490788/CJ4_CIiN9-MYEOT_i7gp")

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Head>
        <title>Global Education Expo 2025 – Dream Big, Study Global</title>
        <meta
          name="description"
          content="Join Lucknow’s Global Education Expo 2025 – Same-day offers, scholarships up to 50%, exciting prizes & expert guidance. Register now!"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <DefaultLayout hideAI={true} navbar>
        <div className="w-full">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-[#FFE4E6] via-[#FFF0F1] to-[#FFE4E6] w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-16 h-16 bg-[#a61d31] opacity-10 rounded-full blur-xl"></div>
              <div className="absolute top-32 right-20 w-24 h-24 bg-[#C82333] opacity-10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#a61d31] opacity-10 rounded-full blur-xl"></div>
            </div>

            <div className="w-full relative z-10">
              <div className="w-full">
                <img
                  src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1757614213/GLOBAL_EDUCATION_EXPO_20205_1_dvaqay.jpg"
                  alt="Global Education Expo Banner"
                  className="w-full h-auto shadow-lg"
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section with Form + Highlights */}
                <motion.section
                  className="relative py-4 sm:py-6 md:py-10 mb-4 sm:mb-6 md:mb-2"
                  {...fadeIn}
                >
                  <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 items-start">
                    {/* LEFT SIDE: Form */}
                    <motion.div
                      className="lg:col-span-2 bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl w-full border border-white/20 relative overflow-hidden"
                      id="form"
                      variants={fadeIn}
                    >
                      <div className="relative z-10">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-2">
                            Register for the Expo
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Seats are limited — fill the form to secure your spot!
                          </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-4">
                            <Input
                              name="name"
                              label={
                                <span>
                                  Full Name <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                            <Input
                              name="email"
                              type="email"
                              label={
                                <span>
                                  Email Address{" "}
                                  <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                            <Input
                              name="phone"
                              type="tel"
                              label={
                                <span>
                                  Phone Number{" "}
                                  <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={(e) => {
                                const value = e.target.value
                                // Allow only numbers and limit to 10 digits
                                if (/^\d{0,10}$/.test(value)) {
                                  handleInputChange(e)
                                }
                              }}
                              maxLength={10}
                              required
                            />
                            <Input
                              name="city"
                              label={
                                <span>
                                  City <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="pt-3"
                          >
                            <Button
                              type="submit"
                              className="w-full bg-gradient-to-r from-[#a61d31] via-[#C82333] to-[#a61d31] text-white font-bold py-3 text-base shadow-2xl"
                              isLoading={isSubmitting}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Registering..." : <>🎟️ Register Now - FREE</>}
                            </Button>
                          </motion.div>
                        </form>
                      </div>
                    </motion.div>

                    {/* RIGHT SIDE - Event Highlights */}
                    <motion.div
                      className="lg:col-span-2 flex flex-col justify-center"
                      variants={staggerChildren}
                    >
                      <motion.h2
                        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-8 leading-snug"
                        variants={fadeIn}
                      >
                        ✨DREAM BIG, STUDY GLOBAL
                      </motion.h2>

                      <motion.div
                        className="space-y-5 mb-8"
                        variants={staggerChildren}
                      >
                        <motion.div
                          className="flex items-start space-x-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                          variants={fadeIn}
                        >
                          <Award className="text-[#a61d31] w-6 h-6 flex-shrink-0 mt-1" />
                          <p className="text-lg">
                            🏆 Fast-Track Admissions — Same-day* spot offers
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                          variants={fadeIn}
                        >
                          <Gift className="text-[#a61d31] w-6 h-6 flex-shrink-0 mt-1" />
                          <p className="text-lg">
                            🎁 Lucky Draws — Smart Watches, Travel Vouchers & more
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                          variants={fadeIn}
                        >
                          <GraduationCap className="text-[#a61d31] w-6 h-6 flex-shrink-0 mt-1" />
                          <p className="text-lg">
                            🎓 Scholarships up to 50% + Fee Waivers**
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                          variants={fadeIn}
                        >
                          <Users className="text-[#a61d31] w-6 h-6 flex-shrink-0 mt-1" />
                          <p className="text-lg">
                            🌐 Workshop: "Study Destinations Decoded"
                          </p>
                        </motion.div>

                        <motion.div
                          className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg border-l-4 border-[#a61d31] hover:shadow-xl transition-shadow"
                          variants={fadeIn}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-[#a61d31]/10 p-2 rounded-lg flex-shrink-0">
                              <GraduationCap className="w-6 h-6 text-[#a61d31]" />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-800 mb-2">
                                🌟 Learn directly from Dr. Swati Mishra
                              </p>
                              <p className="text-base text-gray-600">
                                Cambridge - UK, MIT - USA | Founder, EduAbroad
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.section>

                {/* Countdown Section */}
                <div className=" mb-12 text-center bg-gradient-to-r from-[#a61d31] via-[#C82333] to-[#a61d31] text-white p-6 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">⏳ Countdown to Event</h2>
                  <div className="flex justify-center gap-6 text-lg md:text-xl font-semibold">
                    <div className="bg-white text-[#a61d31] rounded-xl px-4 py-2 shadow-md">
                      {timeLeft.days} <span className="block text-sm">Days</span>
                    </div>
                    <div className="bg-white text-[#a61d31] rounded-xl px-4 py-2 shadow-md">
                      {timeLeft.hours} <span className="block text-sm">Hours</span>
                    </div>
                    <div className="bg-white text-[#a61d31] rounded-xl px-4 py-2 shadow-md">
                      {timeLeft.minutes} <span className="block text-sm">Minutes</span>
                    </div>
                    <div className="bg-white text-[#a61d31] rounded-xl px-4 py-2 shadow-md">
                      {timeLeft.seconds} <span className="block text-sm">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <motion.section className="text-center" {...fadeIn}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-6">
                🌐 Where Can You Study?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                20+ Countries including USA, UK, Germany, Singapore, UAE, Ireland, Italy & more!
              </p>
              <p className="text-lg font-medium mb-8">Programs Covered: Undergraduate | Masters | MBA | PhD</p>

              <h3 className="text-xl md:text-2xl font-bold mb-6">🎯 Who Should Attend?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 bg-white shadow-lg rounded-2xl">🌟 Students planning 2025–26 admissions abroad</div>
                <div className="p-6 bg-white shadow-lg rounded-2xl">💰 Parents exploring scholarships & funding</div>
                <div className="p-6 bg-white shadow-lg rounded-2xl">🎓 Graduates seeking global career guidance</div>
              </div>

              <div className="bg-gradient-to-r from-[#a61d31] via-[#C82333] to-[#a61d31] text-white p-6 rounded-3xl my-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">🚀 Take the First Step Toward Your Global Dream</h3>
                <p>
                  Lucknow’s most awaited Global Education Expo 2025 is your chance to turn aspirations into acceptances.
                </p>
              </div>

              <motion.a
                href="#form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#a61d31] font-bold rounded-full shadow-2xl"
              >
                👉 Register Now
              </motion.a>

              <div className="mt-8 text-sm text-gray-600">
                <p>* On-the-spot offers are university-specific.</p>
                <p>** Scholarships & waivers depend on eligibility and documentation.</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
                  <Phone className="w-4 h-4 text-[#a61d31]" /> 📱 +91 90444 42989
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
                  <Mail className="w-4 h-4 text-[#a61d31]" /> ✉️ info@goeduabroad.com
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}
