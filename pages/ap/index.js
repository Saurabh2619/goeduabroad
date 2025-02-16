import React from "react"
import DefaultLayout from "../../layouts/DefaultLayout"
import Head from "next/head"
import { ArrowRight, BookOpen, Calendar, CheckCircle, Star, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function AP() {
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
          content="Maximize your college admission and scholarship chances with Advanced Placement (AP) courses at EduAbroad. Get expert guidance and personalized study plans!"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultLayout>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.section className="text-center mb-24" {...fadeIn}>
            <h1
              className="my-20 text-6xl md:text-7xl font-bold leading-tight text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Boost Your <span className="text-[#A51C30]">Scholarship</span> and{" "}
              <span className="text-[#A51C30]">Admission</span> Chances with AP
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A strong AP performance enhances your college application and improves your chances of earning
              scholarships and admission to top US universities
            </p>
            <motion.button
              className="mt-12 px-8 py-4 bg-[#A51C30] text-white font-semibold rounded-full text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your AP Journey
            </motion.button>
          </motion.section>

          <motion.section
            className="bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-12 rounded-3xl shadow-2xl mb-24"
            {...fadeIn}
          >
            <h2 className="text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why AP with EduAbroad?
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <BookOpen className="w-10 h-10" />,
                  text: "Exclusive to EduAbroad – Expert guidance from experienced faculty",
                },
                {
                  icon: <CheckCircle className="w-10 h-10" />,
                  text: "Personalized Batches – Small group learning for Maths, Physics, English Literature, English Language, Calculus, and Statistics",
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  text: "Customized Study Plans – Tailored strategies to fit your learning style and goals",
                },
                {
                  icon: <Calendar className="w-10 h-10" />,
                  text: "Flexible Timings – Study at your convenience with adaptable schedules",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-4 bg-white bg-opacity-10 p-6 rounded-xl transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon}
                  <span className="text-xl">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section className="mb-24" {...fadeIn}>
            <h2
              className="text-5xl font-semibold text-gray-900 mb-10 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What is AP?
            </h2>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                • Advanced Placement (AP) is a program that allows high school students to take college-level courses.
              </p>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                • It helps students gain deeper knowledge in different subjects while also preparing them for the
                academic challenges of college.
              </p>
              <div className="grid gap-12 md:grid-cols-2">
                <motion.div
                  className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className="text-3xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Benefits of AP
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Stronger College Applications: Taking AP classes can make an application stand out",
                      "Earn College Credit: A good AP exam score may allow students to earn college credit, helping them save time and money",
                      "Scholarship Opportunities: Some scholarships consider AP performance when awarding funds to students",
                      "AP gives you an edge over other students: AP leverages your competitive strength",
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#A51C30] flex-shrink-0" />
                        <span className="text-lg text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className="text-3xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    What Research Says
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">Students who take AP courses are more likely to:</p>
                  <ul className="space-y-4">
                    {[
                      "Enroll in and graduate from college",
                      "Perform better in their first year of college",
                      "Succeed in advanced college courses",
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-6 h-6 text-[#A51C30] flex-shrink-0" />
                        <span className="text-lg text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section className="mb-24 bg-gray-50 p-12 rounded-3xl shadow-xl" {...fadeIn}>
            <h2
              className="text-4xl font-semibold text-gray-900 mb-10 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AP Exam Dates for 2025
            </h2>
            <p className="text-xl text-gray-700 mb-8 text-center">
              AP exams will take place over two weeks in May 2025
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                { week: "Week 1", dates: "May 5 – May 9" },
                { week: "Week 2", dates: "May 12 – May 16" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#A51C30] hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-2xl font-semibold text-[#A51C30] mb-2">{item.week}</h3>
                  <p className="text-xl text-gray-700">{item.dates}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-10 text-lg text-gray-700 text-center">
              Specific exam schedules will be announced by the College Board. Students should check with their schools
              for registration details and test locations.
            </p>
          </motion.section>

          <motion.section className="mb-24" {...fadeIn}>
            <h2
              className="text-4xl font-semibold text-gray-900 mb-10 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How AP Exams Are Structured
            </h2>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-4xl mx-auto">
              AP exams are scored on a 1 to 5 scale, with most colleges giving credit for a score of 3 or higher. The
              format of each exam depends on the subject but usually includes:
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <GraduationCap />,
                  title: "Multiple-Choice Questions (MCQs)",
                  description: "Test knowledge of key concepts",
                },
                {
                  icon: <Award />,
                  title: "Free-Response Questions (FRQs)",
                  description: "Require written answers or problem-solving",
                },
                {
                  icon: <Star />,
                  title: "Project-Based Sections",
                  description:
                    "Some AP exams, like AP Studio Art and AP Research, require portfolios or presentations instead of traditional tests",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-[#A51C30] mb-4">{React.cloneElement(item.icon, { className: "w-16 h-16" })}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="text-center bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-16 rounded-3xl shadow-2xl"
            {...fadeIn}
          >
            <h2 className="text-4xl font-semibold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Make the Most of AP!
            </h2>
            <p className="text-xl leading-relaxed mb-6 max-w-4xl mx-auto">
              AP courses are more than a way to earn college credit. They help you develop skills that will be useful in
              college and beyond. You learn how to think critically, manage time effectively, and handle challenging
              coursework. These are the same skills that will support you in higher education and future careers.
            </p>
            <p className="text-xl mb-10 leading-relaxed max-w-4xl mx-auto">
              Taking AP also shows colleges that you are willing to push yourself academically. It can give you an
              advantage in the admissions process and, in some cases, reduce the cost and time needed to complete a
              degree.
            </p>
            <motion.button
              className="px-10 py-4 bg-white text-[#A51C30] text-xl font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About AP
            </motion.button>
          </motion.section>
        </div>
      </DefaultLayout>
    </>
  )
}

