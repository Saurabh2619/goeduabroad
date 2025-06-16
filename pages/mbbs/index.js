"use client"

import { useState } from "react"
import DefaultLayout from "../../layouts/DefaultLayout"
import Head from "next/head"
import { BookOpen, CheckCircle, Star, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"

const sendLead = async (leadData) => {
  const { firstname, phone, email, neetAppeared, yearOfPassing, intake } = leadData

  // Validate required fields
  if (!firstname || !phone || !email || !neetAppeared || !yearOfPassing || !intake) {
    throw new Error(
      "Missing required fields: firstname, phone, email, neetAppeared, yearOfPassing, and intake are required.",
    )
  }

  // Prepare payload for API
  const payload = {
    firstname,
    phone,
    email,
    neetAppeared, // Map to backend expected field name
    yearOfPassing, // Map to backend expected field name
    intake,
  }

  try {
    const response = await axios.post("/api/sendlead", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error sending lead:", error.response?.data || error.message)
    throw error
  }
}

export default function AP() {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    phone: "",
    neetAppeared: "",
    yearOfPassing: "",
    intake: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      await sendLead(formData)
      setSubmitMessage("Thank you! Your application has been submitted successfully.")
      setFormData({
        firstname: "",
        email: "",
        phone: "",
        neetAppeared: "",
        yearOfPassing: "",
        intake: "",
      })
    } catch (error) {
      setSubmitMessage("Sorry, there was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
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
          content="Study MBBS abroad for Indian students in 2025. Get admission to NMC-approved universities in Egypt, Georgia, Russia, Kazakhstan, Kyrgyzstan, and Uzbekistan with EduAbroad."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultLayout>
        <div className="w-full">
          {/* Hero Section */}
          <div className="bg-[#FFE4E6] w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.section className="relative pt-36 pb-8 text-center" {...fadeIn}>
                <h1
                  className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span className="text-[#A51C30]">MBBS Abroad</span> for Indian Students in{" "}
                  <span className="text-[#A51C30]">2025</span>
                </h1>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                  EduAbroad helps Indian students secure admissions to NMC-approved universities across countries
                  offering English-medium MBBS programs. We offer detailed counseling, university shortlisting,
                  documentation assistance, and full support for visa applications and post-arrival logistics.
                </p>
              </motion.section>
            </div>
          </div>

          {/* Full Width Image */}
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1749881870/MBBS_LANDING_PAGE_01_ict065.jpg"
              alt="MBBS Abroad for Indian Students"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Study MBBS Abroad Options */}
            <motion.section className="py-16" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Study MBBS Abroad in 2025 with options in:
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    country: "MBBS in Egypt",
                    features:
                      "Affordable tuition, English-medium courses, Indian food availability, and excellent clinical exposure",
                  },
                  {
                    country: "MBBS in Georgia",
                    features: "Low fees, top NMC-recognized universities, and excellent medical training",
                  },
                  {
                    country: "MBBS in Russia",
                    features: "Long-standing reputation, globally accepted degrees, and practical training",
                  },
                  {
                    country: "MBBS in Kazakhstan",
                    features: "Budget-friendly universities, English instruction, and safe student environment",
                  },
                  {
                    country: "MBBS in Kyrgyzstan",
                    features: "Popular among Indian students for affordable packages including accommodation and food",
                  },
                  {
                    country: "MBBS in Uzbekistan",
                    features: "Well-equipped medical institutes and growing Indian student community",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="text-xl font-bold text-[#A51C30] mb-4">{item.country}</h3>
                    <p className="text-gray-700">{item.features}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Why Choose EduAbroad */}
            <motion.section
              className="bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-8 sm:p-12 rounded-3xl shadow-2xl mb-16"
              {...fadeIn}
            >
              <h2
                className="text-4xl font-semibold mb-10 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Choose EduAbroad
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <GraduationCap className="w-10 h-10" />,
                    text: "Expert mentors from Cambridge, IIM, and MIT",
                  },
                  {
                    icon: <BookOpen className="w-10 h-10" />,
                    text: "Tailored counseling for MBBS abroad admissions",
                  },
                  {
                    icon: <CheckCircle className="w-10 h-10" />,
                    text: "End-to-end services from university selection to pre-departure briefings",
                  },
                  {
                    icon: <Star className="w-10 h-10" />,
                    text: "100 percent support for visa, accommodation, and travel",
                  },
                  {
                    icon: <Award className="w-10 h-10" />,
                    text: "High success rate in MBBS placements",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 bg-white bg-opacity-10 p-6 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    {item.icon}
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-lg mt-8 leading-relaxed">
                EduAbroad is committed to unlocking every student's global potential. Our students are now studying in
                top universities across the world with full support from our expert team.
              </p>
            </motion.section>

            {/* Apply Now Section with Expanded Form */}
            <motion.section className="bg-gray-50 p-8 rounded-3xl shadow-xl mb-16" {...fadeIn}>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-8 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Apply Now
              </h2>
              <div className="text-center mb-8">
                <p className="text-xl text-gray-700 mb-4">
                  Admissions are now open for MBBS in Egypt, Georgia, Russia, Kazakhstan, Kyrgyzstan, and Uzbekistan.
                </p>
              </div>

              {/* Application Form */}
              <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <select
                      name="yearOfPassing"
                      value={formData.yearOfPassing}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900"
                    >
                      <option value="" disabled>
                        Year of Passing 12th
                      </option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      {/* <option value="Not Appeared">Not Appeared</option> */}
                    </select>
                  </div>

                  <div>
                    <select
                      name="neetAppeared"
                      value={formData.neetAppeared}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900"
                    >
                      <option value="" disabled>
                        NEET Appeared
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name="intake"
                      value={formData.intake}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-gray-900"
                    >
                      <option value="" disabled>
                        Intake
                      </option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </div>

                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#A51C30] text-white font-semibold rounded-full text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      {isSubmitting ? "Submitting..." : "Start Your MBBS Journey"}
                    </motion.button>
                  </div>

                  {submitMessage && (
                    <div
                      className={`text-center p-4 rounded-lg ${submitMessage.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>

              {/* <p className="text-lg text-gray-700 text-center mb-8">Contact us today to begin your journey.</p> */}

              {/* Contact Information */}
              {/* <div className="grid gap-6 md:grid-cols-3">
                <motion.div
                  className="flex items-center justify-center space-x-3 bg-white p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="w-6 h-6 text-[#A51C30]" />
                  <span className="text-gray-700">Call: [Insert Number]</span>
                </motion.div>
                <motion.div
                  className="flex items-center justify-center space-x-3 bg-white p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="w-6 h-6 text-[#A51C30]" />
                  <span className="text-gray-700">Email: [Insert Email]</span>
                </motion.div>
                <motion.div
                  className="flex items-center justify-center space-x-3 bg-white p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <MapPin className="w-6 h-6 text-[#A51C30]" />
                  <span className="text-gray-700">Book a free counseling session</span>
                </motion.div>
              </div> */}
            </motion.section>

            {/* Footer Message */}
            <motion.section
              className="text-center bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-8 rounded-3xl shadow-2xl mb-16"
              {...fadeIn}
            >
              <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                EduAbroad – Your trusted partner for global education success.
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                With expert guidance and comprehensive support, we help you achieve your dream of studying MBBS abroad
                at top NMC-approved universities.
              </p>
            </motion.section>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}
