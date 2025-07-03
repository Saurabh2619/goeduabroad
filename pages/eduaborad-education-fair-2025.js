"use client"

import DefaultLayout from "../layouts/DefaultLayout"
import Head from "next/head"
import { Users, Gift, GraduationCap, Phone, Mail, Star, Globe, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import axios from "axios"
import { Input, Button } from "@nextui-org/react"
import { toast } from "react-hot-toast"

export default function StudyAbroadFair() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
      // Map form data to match the sendLead function requirements
      const leadData = {
        firstname: `${formData.name} ~~Education Fair 2025`,
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
        <meta
          name="description"
          content="Join Lucknow's Biggest Study Abroad Admission Fair 2025. Get same-day offer letters, scholarships up to 50%, and expert guidance from Dr. Swati Mishra."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <DefaultLayout hideAI={true} navbar>
        <div className="w-full">
          {/* Enhanced gradient background */}
          <div className="bg-gradient-to-br from-[#FFE4E6] via-[#FFF0F1] to-[#FFE4E6] w-full relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-16 h-16 bg-[#a61d31] opacity-10 rounded-full blur-xl"></div>
              <div className="absolute top-32 right-20 w-24 h-24 bg-[#C82333] opacity-10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#a61d31] opacity-10 rounded-full blur-xl"></div>
            </div>

            <div className="w-full relative z-10">
              {/* Full width banner at the top */}
              <div className="w-full">
                <img
                  src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1751542308/Education_banner_1_nuj7z3.jpg"
                  alt="Study Abroad Fair Banner"
                  className="w-full h-auto shadow-lg"
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main content section with enhanced layout */}
                <motion.section className="relative py-6 sm:py-8 md:py-12 mb-6 sm:mb-8 md:mb-12" {...fadeIn}>
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    {/* Left side - Enhanced Enquiry Form (moved from right) */}
                    <motion.div
                      className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl w-full border border-white/20 relative overflow-hidden order-1 lg:order-1"
                      id="form"
                      variants={fadeIn}
                    >
                      {/* Form background decoration */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#a61d31]/5 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

                      <div className="relative z-10">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-2">
                            Secure Your Spot
                          </h3>
                          <p className="text-gray-600 text-sm">Fill the form below to register for the fair</p>
                        </div>

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
                              size="md"
                              classNames={{
                                input: "text-gray-900 placeholder:text-gray-400",
                                inputWrapper:
                                  "border-2 border-gray-200 hover:border-[#a61d31]/50 focus-within:border-[#a61d31] bg-white/80 backdrop-blur-sm shadow-sm",
                                label: "text-gray-700 font-medium text-sm",
                              }}
                            />

                            <Input
                              name="email"
                              label={
                                <span>
                                  Email Address <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your email address"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              size="md"
                              classNames={{
                                input: "text-gray-900 placeholder:text-gray-400",
                                inputWrapper:
                                  "border-2 border-gray-200 hover:border-[#a61d31]/50 focus-within:border-[#a61d31] bg-white/80 backdrop-blur-sm shadow-sm",
                                label: "text-gray-700 font-medium text-sm",
                              }}
                            />

                            <Input
                              name="phone"
                              label={
                                <span>
                                  Phone Number <span className="text-red-600 font-bold">*</span>
                                </span>
                              }
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              size="md"
                              classNames={{
                                input: "text-gray-900 placeholder:text-gray-400",
                                inputWrapper:
                                  "border-2 border-gray-200 hover:border-[#a61d31]/50 focus-within:border-[#a61d31] bg-white/80 backdrop-blur-sm shadow-sm",
                                label: "text-gray-700 font-medium text-sm",
                              }}
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
                              size="md"
                              classNames={{
                                input: "text-gray-900 placeholder:text-gray-400",
                                inputWrapper:
                                  "border-2 border-gray-200 hover:border-[#a61d31]/50 focus-within:border-[#a61d31] bg-white/80 backdrop-blur-sm shadow-sm",
                                label: "text-gray-700 font-medium text-sm",
                              }}
                            />
                          </div>

                          {/* Enhanced Register Now Button with Shimmer Effect */}
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-3">
                            <Button
                              type="submit"
                              className="w-full relative overflow-hidden bg-gradient-to-r from-[#a61d31] via-[#C82333] to-[#a61d31] text-white font-bold py-3 text-base shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 group"
                              isLoading={isSubmitting}
                              disabled={isSubmitting}
                              size="md"
                            >
                              {/* Shimmer effect overlay */}
                              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                              {/* Button content */}
                              <div className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                  "Registering..."
                                ) : (
                                  <>
                                    <Star className="w-4 h-4" />
                                    Register Now - FREE
                                    <Star className="w-4 h-4" />
                                  </>
                                )}
                              </div>

                              {/* Glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-[#a61d31] to-[#C82333] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                            </Button>
                          </motion.div>

                          {/* Trust indicators */}
                          <div className="flex items-center justify-center gap-3 pt-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>Secure</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>Instant Confirmation</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              <span>No Spam</span>
                            </div>
                          </div>
                        </form>
                      </div>
                    </motion.div>

                    {/* Right side - Enhanced Content (moved from left) */}
                    <motion.div
                      className="flex flex-col justify-center order-2 lg:order-2"
                      variants={staggerChildren}
                      initial="initial"
                      animate="animate"
                    >
                      <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-6 leading-tight"
                        variants={fadeIn}
                      >
                        ✨ Why You Can't Miss This:
                      </motion.h2>

                      <motion.div className="space-y-4 mb-6" variants={staggerChildren}>
                        <motion.div
                          className="flex items-start space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                          variants={fadeIn}
                        >
                          <div className="bg-green-100 p-1.5 rounded-lg flex-shrink-0">
                            <span className="text-green-600 text-lg">✅</span>
                          </div>
                          <p className="text-base font-medium text-gray-800">
                            Same-Day Offer Letters* from Global Universities
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                          variants={fadeIn}
                        >
                          <div className="bg-[#a61d31]/10 p-1.5 rounded-lg flex-shrink-0">
                            <Gift className="text-[#a61d31] w-5 h-5" />
                          </div>
                          <p className="text-base font-medium text-gray-800">
                            Exciting Lucky Draws — Win Smart Watches & Premium Gifts
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                          variants={fadeIn}
                        >
                          <div className="bg-[#a61d31]/10 p-1.5 rounded-lg flex-shrink-0">
                            <Award className="text-[#a61d31] w-5 h-5" />
                          </div>
                          <p className="text-base font-medium text-gray-800">
                            Up to 50% Scholarships on Tuition & Application Fee Waivers**
                          </p>
                        </motion.div>

                        <motion.div
                          className="flex items-start space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                          variants={fadeIn}
                        >
                          <div className="bg-[#a61d31]/10 p-1.5 rounded-lg flex-shrink-0">
                            <Users className="text-[#a61d31] w-5 h-5" />
                          </div>
                          <p className="text-base font-medium text-gray-800">
                            Free Group Workshop: "How to Choose the Right Country & University for You"
                          </p>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-2xl shadow-lg border-l-4 border-[#a61d31]"
                        variants={fadeIn}
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-[#a61d31]/10 p-1.5 rounded-lg flex-shrink-0">
                            <GraduationCap className="w-5 h-5 text-[#a61d31]" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-800 mb-1">📍 Hosted by Dr. Swati Mishra</p>
                            <p className="text-sm text-gray-600">Cambridge - UK, MIT - USA | Founder, EduAbroad</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Additional points outside the box */}
                      <motion.div className="mt-3 space-y-1 text-sm text-gray-900 " variants={fadeIn}>
                        <p>*For select universities only</p>
                        <p>**On-the-spot offers subject to eligibility and document review</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.section>
              </div>
            </div>
          </div>

          {/* Enhanced Center content section */}
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 my-8 sm:my-10 md:my-12">
            <motion.section className="text-center" {...fadeIn}>
              <div className="bg-gradient-to-br from-white via-gray-50 to-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                  <Globe className="absolute top-10 left-10 w-24 h-24 text-[#a61d31]" />
                  <GraduationCap className="absolute bottom-10 right-10 w-20 h-20 text-[#C82333]" />
                </div>

                <div className="relative z-10">
                  <motion.h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#a61d31] to-[#C82333] bg-clip-text text-transparent mb-6"
                    variants={fadeIn}
                  >
                    🌐 Choose Universities from 20+ Countries
                  </motion.h2>

                  <motion.p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed" variants={fadeIn}>
                    Including the USA, UK, UAE, Germany, Ireland, Italy, Singapore and many more!
                  </motion.p>

                  <motion.div
                    className="bg-gradient-to-r from-[#a61d31] to-[#C82333] text-white p-6 rounded-2xl mb-8 shadow-xl"
                    variants={fadeIn}
                  >
                    <p className="text-lg font-semibold leading-relaxed">
                      📢 Whether you're applying for Undergraduate, Postgraduate, or PhD programs — this is your chance
                      to fast-track your dreams.
                    </p>
                  </motion.div>

                  <div className="mb-8">
                    <motion.h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6" variants={fadeIn}>
                      🎯 Who Should Attend?
                    </motion.h3>

                    <motion.div
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      variants={staggerChildren}
                    >
                      <motion.div
                        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                        variants={fadeIn}
                      >
                        <div className="bg-[#a61d31]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                          <GraduationCap className="w-5 h-5 text-[#a61d31]" />
                        </div>
                        <p className="text-base font-medium text-gray-800">
                          Students aspiring to study abroad in 2025–2026
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                        variants={fadeIn}
                      >
                        <div className="bg-[#a61d31]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                          <Users className="w-5 h-5 text-[#a61d31]" />
                        </div>
                        <p className="text-base font-medium text-gray-800">
                          Parents looking for clarity on financial aid and scholarships
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                        variants={fadeIn}
                      >
                        <div className="bg-[#a61d31]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                          <Globe className="w-5 h-5 text-[#a61d31]" />
                        </div>
                        <p className="text-base font-medium text-gray-800">
                          Graduates seeking expert guidance on visa & post-study work options
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-[#a61d31] via-[#C82333] to-[#a61d31] text-white p-6 md:p-8 rounded-3xl mb-6 shadow-2xl relative overflow-hidden"
                    variants={fadeIn}
                  >
                    {/* Shimmer background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">🚀 Start Your Global Journey Here</h3>
                      <p className="text-lg mb-6 leading-relaxed">
                        📌 Register Now to secure your spot at Lucknow's Biggest Study Abroad Admission Fair.
                      </p>

                      <motion.a
                        href="#form"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#a61d31] text-lg font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl group relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Button shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a61d31]/10 to-transparent transform -skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10 flex items-center gap-2">
                          <Star className="w-5 h-5" />👉 Register Now
                          <Star className="w-5 h-5" />
                        </div>
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm"
                    variants={fadeIn}
                  >
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg w-full sm:w-auto justify-center sm:justify-start">
                      <div className="bg-[#a61d31]/10 p-1.5 rounded-lg">
                        <Phone className="w-4 h-4 text-[#a61d31]" />
                      </div>
                      <span className="font-medium">📞 Need Help? Call us: +919044442989</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg w-full sm:w-auto justify-center sm:justify-start">
                      <div className="bg-[#a61d31]/10 p-1.5 rounded-lg">
                        <Mail className="w-4 h-4 text-[#a61d31]" />
                      </div>
                      <span className="font-medium">Email: info@goeduabroad.com</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </DefaultLayout>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .group:hover .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  )
}
