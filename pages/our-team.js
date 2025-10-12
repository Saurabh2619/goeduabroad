"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import DefaultLayout from "layouts/DefaultLayout"
import Head from "next/head"
import { Spacer } from "@nextui-org/react"

const teamMembers = [
  {
    name: "Dr. Swati Abhishek Mishra",
    role: "Founder",
    organization: "EduAbroad",
    subtitle: "Former Professor, IIM Lucknow | Global Education Strategist",
    description: "With a PhD from the University of Cambridge and MIT, Dr. Swati has guided thousands on international career paths over 25+ years. A recipient of prestigious global scholarships, she's a trusted mentor and policy advisor shaping futures with vision and empathy.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253022/Picture1_ecbf8h.jpg"
  },
  {
    name: "Mr. Ashutosh Mishra",
    role: "Co-Founder",
    organization: "EduAbroad",
    subtitle: "IIM Ahmedabad Alumnus | Mentor & Educator",
    description: "A chemical engineer with managerial finesse, Mr. Ashutosh Mishra brings over a decade of teaching experience, having mentored 10,000+ students. His student-first philosophy sets the gold standard in educational excellence.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253021/Picture2_xhryo2.jpg"
  },
  {
    name: "Aradhya Vats",
    role: "CEO",
    organization: "EduAbroad",
    subtitle: "Ex-Google | OnePlus",
    description: "An IPM graduate & triple medallist from IIM Indore, has worked with Google and OnePlus across marketing and e-commerce roles. A versatile generalist passionate about strategy, leadership, and social impact, he is also a national-level debater who has mentored 1,000+ students in public speaking.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253021/Picture3_yfxbu2.png"
  },
  {
    name: "Ashish Mishra",
    role: "CTO",
    organization: "EduAbroad",
    subtitle: "Ex-Google",
    description: "Ashish is a distinguished alumnus of IIIT and IIT Bombay. With five years of experience at Google and a strong entrepreneurial spirit, he brings deep technical expertise and innovative vision to advancing education technology.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253020/Picture4_ey2lra.jpg"
  },
  {
    name: "Rajeev Verma",
    role: "Head of Sales and Growth",
    organization: "EduAbroad",
    subtitle: "Ex-UpGrad",
    description: "Rajeev serves as the Head of Sales and Growth at EduAbroad. He leads innovative initiatives to drive revenue growth, optimize sales operations, and ensure the organization's strategic advancement in the global education sector.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253020/Picture5_ghbgd5.jpg"
  },
  {
    name: "Anushka Sharma",
    role: "HR & Operations",
    organization: "EduAbroad",
    subtitle: "Human Resources and Operations Lead",
    description: "She oversees Human Resources and Operations at EduAbroad, ensuring organizational efficiency and a cohesive, high-performing team environment.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253020/Picture6_i6bdkj.jpg"
  },
  {
    name: "Farhan Rasool",
    role: "Content Writer & IELTS Faculty",
    organization: "EduAbroad",
    subtitle: "Ex-Centurion Defence Academy | Chegg India",
    description: "Farhan Rasool is a multidisciplinary writer with a background in psychology and a deep interest in mental health and human behavior. He has written for various publications in the US and UK. At EduAbroad, he helps students craft strong university applications and enhance their language proficiency.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760253029/Picture7_cjiu69.png"
  },
  {
    name: "Srishti Dass",
    role: "Psychologist",
    organization: "EduAbroad",
    subtitle: "Assessment, Counseling & Research",
    description: "Srishti Dass is a Psychologist with experience in assessment, counseling, and research. She holds a postgraduate degree from Amity University and combines analytical insight with empathy to provide effective, evidence-based mental health care.",
    image: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1760255084/Picture8_shkanp.jpg"
  },
  {
    name: "Pushkar Raj Sharma",
    role: "Career Counsellor",
    organization: "EduAbroad",
    subtitle: "Ex-Jaro Education | Unacademy",
    description: "He is an experienced Career Counsellor with over four years of expertise in career guidance, student counseling, and professional development. He has worked with leading organizations such as Jaro Education and Unacademy.",
    image: null
  },
  {
    name: "Parmeet Singh",
    role: "Admissions & Operations",
    organization: "EduAbroad",
    subtitle: "Admissions Counsellor",
    description: "He is an experienced professional with a background in admissions counselling, logistics operations, and client coordination. Since 2024, Parmeet has been associated with EduAbroad, continuing to expand his professional expertise.",
    image: null
  }
];

const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 h-full">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
        
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          {member.image ? (
            <>
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.7 }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Role Badge - Bottom Left */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg"
                animate={isHovered ? { x: 10 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold text-primary text-sm">{member.role}</span>
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-red-900 flex items-center justify-center relative">
              <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/20 flex items-center justify-center">
                <span className="text-7xl font-bold text-white">{member.name.charAt(0)}</span>
              </div>
              
              {/* Role Badge for no-image cards */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg"
                animate={isHovered ? { x: 10 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold text-primary text-sm">{member.role}</span>
              </motion.div>
            </div>
          )}

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent transform rotate-45 translate-x-16 -translate-y-16"></div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h3>
          
          <p className="font-sans text-sm font-semibold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-4">
            {member.subtitle}
          </p>

          {/* Animated Divider */}
          <motion.div
            className="h-1 bg-gradient-to-r from-primary to-red-900 rounded-full mb-5"
            initial={{ width: "3rem" }}
            animate={isHovered ? { width: "6rem" } : { width: "3rem" }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          <p className="font-sans text-gray-600 text-sm leading-relaxed">
            {member.description}
          </p>
        </div>

        {/* Bottom Accent Bar */}
        <motion.div
          className="h-2 bg-gradient-to-r from-primary via-red-700 to-red-900"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default function OurTeam() {
  const leadership = teamMembers.slice(0, 4);
  const coreTeam = teamMembers.slice(4);

  return (
    <DefaultLayout>
      <Head>
        <title>Our Team - EduAbroad</title>
      </Head>

      <Spacer y={24} />

      {/* Hero Section */}
      <div className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="absolute inset-0 opacity-5"></div>
        
        <div className="mx-auto max-w-[95%] md:max-w-[85%] w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="inline-block px-6 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm">
                Meet the Experts
              </span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-red-700 to-red-900 bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A powerhouse of educators, industry leaders, and visionaries dedicated to transforming dreams into reality through world-class guidance and mentorship.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[95%] md:max-w-[85%] w-full py-20">
        
        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Leadership
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-1 w-24 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Core Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Team
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-1 w-24 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} index={idx + 4} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-900"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            
            <div className="relative z-10 px-8 py-20 md:py-24 text-center">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Future?
              </h3>
              <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Connect with our expert team and take the first step towards your international education journey today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-sans bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                Schedule a Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>

      <Spacer y={48} />
    </DefaultLayout>
  );
}