import DefaultLayout from "../../layouts/DefaultLayout"
import Head from "next/head"
import { ArrowRight, BookOpen, Calendar, CheckCircle, Star } from "lucide-react"
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
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.section className="text-center mb-16" {...fadeIn}>
            <h1
              className="my-20 text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Boost Your Scholarship and Admission Chances with AP
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            A strong AP performance enhances your college application and improves your chances of earning scholarships and admission to top US universities
            </p>
          </motion.section>

          <motion.section
            className="bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-8 rounded-xl shadow-lg mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why AP with EduAbroad?
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <BookOpen className="w-6 h-6" />, text: "Exclusive to EduAbroad – Expert guidance from experienced faculty" },
                { icon: <CheckCircle className="w-6 h-6" />, text: "Personalized Batches – Small group learning for Maths, Physics, English Literature, English Language, Calculus, and Statistics" },
                { icon: <Star className="w-6 h-6" />, text: "Customized Study Plans – Tailored strategies to fit your learning style and goals" },
                { icon: <Calendar className="w-6 h-6" />, text: "Flexible Timings – Study at your convenience with adaptable schedules" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3 hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span className="text-lg">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section className="mb-16" {...fadeIn}>
            <h2
              className="text-4xl font-semibold text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What is AP?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
            •	Advanced Placement (AP) is a program that allows high school students to take college-level courses.
            </p>
            <p className=" text-lg text-gray-700 mb-8">
            •	It helps students gain deeper knowledge in different subjects while also preparing them for the academic challenges of college. 
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Benefits of AP
                </h3>
                <ul className="space-y-3">
                  {[
                    "Stronger College Applications:  Taking AP classes can make an application stand out",
                    "Earn College Credit: A good AP exam score may allow students to earn college credit, helping them save time and money",
                    "Scholarship Opportunities: Some scholarships consider AP performance when awarding funds to students",
                    "AP gives you an edge over other students:  AP leverages your competitive strength",
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ArrowRight className="w-9 h-9 text-[#A51C30]" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What Research Says
                </h3>
                <ul className="space-y-3">
                  {[
                    "Enroll in and graduate from college",
                    "Perform better in their first year of college",
                    "Succeed in advanced college courses",
                    
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-[#A51C30]" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </motion.section>

          <motion.section className="mb-16 bg-gray-50 p-8 rounded-xl shadow-md" {...fadeIn}>
            <h2
              className="text-3xl font-semibold text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AP Exam Dates for 2025
            </h2>
            <p className="text-lg text-gray-700 mb-4">AP exams will take place over two weeks in May 2025</p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { week: "Week 1", dates: "May 5 – May 9" },
                { week: "Week 2", dates: "May 12 – May 16" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-xl font-semibold text-[#A51C30]">{item.week}</h3>
                  <p className="text-lg text-gray-700">{item.dates}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-lg text-gray-700">Specific exam schedules will be announced by the College Board. Students should check with their schools for registration details and test locations</p>
          </motion.section>

          <motion.section className="mb-16" {...fadeIn}>
            <h2
              className="text-3xl font-semibold text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How AP Exams Are Structured
            </h2>
            <p className="text-lg text-gray-700 mb-6">
            AP exams are scored on a 1 to 5 scale, with most colleges giving credit for a score of 3 or higher. The format of each exam depends on the subject but usually includes:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Multiple-Choice Questions (MCQs): Test knowledge of key concepts",
                "Free-Response Questions (FRQs): Require written answers or problem-solving",
                "Project-Based Sections (for certain subjects): Some AP exams, like AP Studio Art and AP Research, require portfolios or presentations instead of traditional tests",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle className="w-20 h-6 text-[#A51C30]" />
                  <span className="text-lg text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="text-center bg-gradient-to-r from-[#A51C30] to-[#C82333] text-white p-8 rounded-xl shadow-lg"
            {...fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Make the Most of AP!
            </h2>
            <p className="text-lg leading-relaxed">
              AP courses are more than a way to earn college credit. They help you develop skills that will be useful in
              college and beyond. You learn how to think critically, manage time effectively, and handle challenging
              coursework. These are the same skills that will support you in higher education and future careers.
            </p>
            <p className="text-lg mt-4 leading-relaxed">
              Taking AP also shows colleges that you are willing to push yourself academically. It can give you an
              advantage in the admissions process and, in some cases, reduce the cost and time needed to complete a
              degree.
            </p>
            <motion.button
              className="mt-8 px-6 py-3 bg-white text-[#A51C30] font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300"
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

