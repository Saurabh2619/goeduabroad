import React from 'react'
import { Card, CardBody, CardFooter,  Button } from "@nextui-org/react"
import { Linkedin, Twitter, Mail } from 'lucide-react'


const teamMembers = [
  {
    name: "Dr. Swati A. Mishra",
    image: "https://www.ipmcareer.com/wp-content/uploads/2022/06/IMG_1848-350x350.jpg",
    designation: "CEO & Founder",
    education: "Former Professor IIM Lucknow",
    bio: "Emma is a visionary leader with over 15 years of experience in tech entrepreneurship.",
    linkedin: "https://linkedin.com/in/emmajohnson",
    twitter: "https://twitter.com/emmajohnson",
    email: "emma@ourcompany.com"
  },
  {
    name: "Ashutosh Mishra",
    image: "https://www.ipmcareer.com/wp-content/uploads/2016/11/Ashutosh-Sir-e1641723253112-350x350.jpg",
    designation: "Co-Founder",
    education: "IIM Ahmedabad Alumnus",
    bio: "Michael is an innovative technologist specializing in AI and machine learning.",
    linkedin: "https://linkedin.com/in/michaelchen",
    twitter: "https://twitter.com/michaelchen",
    email: "michael@ourcompany.com"
  },
  {
    name: "Aradhya Vats",
    image: "https://www.ipmcareer.com/wp-content/uploads/2023/05/Aradhya-5-copy-350x350.jpg",
    designation: "Managing Director",
    education: "Gold Medalist @ IPM IIM Indore",
    bio: "An Aspiring ",
    linkedin: "https://linkedin.com/in/sophiarodriguez",
    twitter: "https://twitter.com/sophiarodriguez",
    email: "sophia@ourcompany.com"
  },
  
]

export default function TeamSection() {
  return (
    <section className="py-16 font-sans bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">
          Meet Our Team
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
          Passionate experts driving innovation and excellence in every aspect of our work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <Card shadow='none' key={index} className="border border-gray-200 hover:border-blue-500 transition-all duration-300">
              <CardBody className="p-0">
                <div className="relative w-full h-auto aspect-video">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[300px] object-cover object-center"
                  />
                  
                 
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start p-6 bg-white">
              <div className="py-2 text-black">
                    <h3 className="text-2xl text-primary uppercase font-bold mb-1">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.designation}</p>
                  </div>
                <p className="text-sm text-gray-600 mb-4">{member.education}</p>
               {/*  <p className="text-gray-700 mb-4">{member.bio}</p> */}
                <div className="flex justify-between items-center w-full mt-2">
                 {/*  <div className="flex space-x-2">
                    <Button isIconOnly variant="light" aria-label="LinkedIn" as="a" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button isIconOnly variant="light" aria-label="Twitter" as="a" href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button isIconOnly variant="light" aria-label="Email" as="a" href={`mailto:${member.email}`}>
                      <Mail className="w-5 h-5" />
                    </Button>
                  </div> */}
                 {/*  <Button variant="flat" color="primary" size="sm">
                    View Profile
                  </Button> */}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

