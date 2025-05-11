"use client"

import { useState, useEffect } from "react"
import DefaultLayout from "../../layouts/DefaultLayout"
import { Loader2, GraduationCap, Globe, BookOpen, School, X } from "lucide-react"
import axios from "axios"

export default function CollegeFinder() {
  const [degree, setDegree] = useState("bachelors")

  // List of available courses for autocomplete
  const courses = [
    "Computer Science",
    "Data Science and Data Analytics",
    "Business Analytics",
    "Mechanical Engineering",
    "Management Information Systems",
    "Electrical and Electronics Engineering",
    "Electrical and Computer Engineering",
    "Computer and Information Systems",
    "Engineering Management Mem",
    "Industrial Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Cybersecurity",
    "Information Technology",
    "MBA",
    "Software Engineering",
    "Artificial Intelligence",
    "Aerospace Engineering",
    "Construction Management",
    "Finance",
    "Biotechnology",
    "Business Administration and Management",
    "Human Computer Interaction",
    "Management Science",
    "Biomedical Engineering",
    "Electrical Engineering",
    "Robotics Technology",
    "Public Health",
    "Chemical Engineering",
    "Computer and Information Sciences General",
    "Logistics and Supply Chain Management",
    "Computational Science",
    "Civil and Environmental Engineering",
    "Automotive Engineering",
    "Computer Networking and Telecommunications",
    "Information Science",
    "Health Information Technology",
    "Technology Management and Entrepreneurship",
    "Mechatronics Robotics and Automation Engineering",
    "Human Resources Management",
    "Materials Engineering",
    "Project Management",
    "Architecture",
    "Biomedical Informatics",
    "Marketing",
    "Biological Biosystems Engineering",
    "Chemical Petroleum",
    "Construction Engineering",
    "Pharmacy",
    "Accounting",
    "International Business Management",
    "Manufacturing Engineering",
    "Food Science",
    "Systems Engineering",
    "Economics",
    "Information Studies",
    "Pharmacology",
    "Health Administration",
    "Engineering General",
    "Psychology",
    "Pharmaceutical Sciences",
    "Informatics",
    "Health Informatics and Management Systems",
    "Financial Management",
    "Financial Engineering",
    "International Business",
    "Aerospace and Mechanical Engineering",
    "Business General",
    "Environmental Science",
    "Energy Systems Engineering",
    "Mathematics and Statistics",
    "Technology Innovation and Entrepreneurship",
    "Embedded Systems",
    "Environmental Mining",
    "Biomedical Sciences",
    "Physics",
    "Biology General",
    "Econometrics and Quantitative Economics",
    "Computational Mathematics",
    "Chemistry",
    "Telecommunications Engineering and Technology",
    "International Relations",
    "Electrical Electronics and Communications Engineering",
    "Computer Systems Engineering",
    "Structural Engineering",
    "Product Design and Development",
    "Engineering Mechanics",
    "Urban Studies",
    "Modern Languages",
    "Executive Management MBA",
    "Drug Discovery and Regulatory Affairs",
    "Environmental Management",
    "Organizational Leadership",
    "Urban Community and Regional Planning",
    "Education",
    "Nursing",
    "Sociology",
    "Financial Mathematics",
    "Transportation and Highway Engineering",
    "Law Enforcement Intelligence Analysis",
    "Medicine and Surgery (MBBS)",
    "Mathematics",
    "Computing Technology MCT",
    "Operations Research",
    "Engineering Design",
    "Operations Management",
    "Engineering Science",
    "Marine and Coastal Sciences",
    "Toxicology",
    "Nutrition Sciences",
    "Health Care",
    "Game and Interactive Media Design",
    "Neuroscience",
    "Cellular and Molecular Biology",
    "Music",
    "Agricultural Engineering",
    "Analytics and Information Management",
    "Sustainable Energy",
    "Biological Science",
    "Design and Applied Arts",
    "Landscape Architecture",
    "Renewable Energy",
    "Electrical and Power Engineering",
    "Library and Information Science",
    "Intelligent Systems",
    "Communication General",
    "Agriculture General",
    "Law and Legal Studies",
    "Algorithms and Machine Learning",
    "Materials Science",
    "Applied Economics",
    "Applied Mathematics",
    "Modeling Virtual Environments and Simulation",
    "Clinical Psychology",
    "Counseling Psychology",
    "Business and Marketing Management",
    "Statistics",
    "Microbiology",
    "Dental Science",
    "Public Administration",
    "Engineering and Industrial Management",
    "Digital Communications and Multimedia",
    "Kinesiology",
    "Industrial and Organizational Psychology",
    "Management and Business Analytics",
    "Human Factors and Ergonomics",
    "Organizational Behavior Studies",
    "Chemical and Biomolecular Engineering",
    "Astronomy",
    "Architectural and Building Sciences Technology",
    "Finance and Investment",
    "Biochemistry and Molecular Biology",
    "Health Sciences General",
    "Taxation",
    "Information Technology Project Management",
    "Petroleum Engineering",
    "Biochemistry",
    "Sustainability Science",
    "Chemical and Biological Engineering",
    "Digital and Social Media Marketing",
    "English",
    "Electronics Engineering",
    "Drafting and Design Technology",
    "Aviation Management",
    "Food Technology and Processing",
    "Data Analytics and Quantitative Analysis",
    "Public Policy Analysis",
    "Forensic Science",
    "Technology and Innovation",
    "Interior Design",
    "Actuarial Science",
    "Plant Sciences",
    "Technical and Scientific Communication",
    "Graphic Design",
    "Biostatistics",
    "Hospitality Administration and Management",
    "Communications Systems Technology",
    "Instructional Design",
    "Design and Visual Communications",
    "Astrophysics",
    "Maritime Studies",
    "Ocean Engineering",
    "Pharmacology and Toxicology",
    "Exercise Science",
    "Nanotechnology",
    "Sports Business and Management",
    "Political Science",
    "Process Engineering",
    "Reading and Writing General",
    "Fashion Design",
    "Arts General",
    "Epidemiology",
    "Systems and Control",
    "Security Studies",
    "International Studies",
    "Polymer Chemistry",
    "Bachelor of Business Administration",
    "Integrated Circuit Design",
    "New Media Art",
    "International and Intercultural Communication",
    "Music Performance",
    "Agronomy and Crop Science",
    "Social Work",
    "Environmental Engineering",
    "Geomatics and Geographic Information Systems",
    "Criminal Justice",
    "Research Methodology and Quantitative Methods",
    "Adult Development and Aging",
    "Computational Biology",
    "Fine and Studio Art",
    "Mathematics and Computing",
    "Accountancy",
    "Radio and Television Broadcasting Technology",
    "Media and Communication",
    "Public Relations",
    "Animal Sciences",
    "Quality Management Systems",
    "Science Technology and Society",
    "History",
    "Media Studies",
    "Human Resources Development",
    "International Law",
    "Game Design and Development",
    "Computer Graphics",
    "Web Development",
    "Broadcast Journalism",
    "Biochemical Engineering",
    "Aeronautical Engineering",
    "Journalism",
    "Genetics",
    "Film Studies",
    "Global Studies",
    "Mental Health Counseling",
    "Applied Psychology",
    "Foods Nutrition and Wellness Studies",
    "Physician Assistance",
    "Animal and Veterinary Science",
    "Criminology and Criminal Justice",
    "Architectural Engineering",
    "Financial Economics",
    "Engineering and Technology",
    "Mathematics and Computer Science",
    "Early Childhood Education",
    "Network and System Administration",
    "Ecology",
    "Microbiology and Immunology",
    "Environmental Studies",
    "Business Communication",
    "Orthotics and Prosthetics",
    "English Language and Literature",
    "Environmental Health",
    "Human Development and Family Studies",
    "Nuclear Engineering Technology",
    "Tourism and Travel Management",
    "Analytics and Modeling",
    "Agribusiness Operations",
    "Animation and Special Effects",
    "Creative Arts and Practice",
    "Multi Interdisciplinary Studies General",
    "Medical Physics",
    "Human Services",
    "Law and Business",
    "Theater Arts",
    "Sports Science",
    "Water Resources Engineering",
    "Real Estate",
    "Molecular Biology",
    "Business and Managerial Economics",
    "Engineering Physics",
    "Polymer and Plastics Engineering",
    "Industrial Design and Technology",
    "Medicinal and Pharmaceutical Chemistry",
    "Immunology",
    "Peace and Conflict Resolution Studies",
    "Agricultural and Food Products Processing",
    "Anthropology",
    "Mining and Mineral Engineering",
    "Sales and Marketing Education",
    "Strategic Management",
    "Agricultural Economics",
    "Occupational Safety and Health Technology",
    "Conducting",
    "Clinical Regulatory Affairs",
    "Medical Informatics",
    "Social Sciences",
    "Horticultural Science",
    "Exercise Physiology",
    "Earth Science",
    "Building Construction Technology",
    "Geography",
    "Linguistics",
    "Applied Physics",
    "Transportation Management",
    "International Health",
    "Interior Architecture",
    "Business Computing",
    "Laser and Optical Engineering",
    "Communication Sciences and Disorders",
    "Social Justice and Human Rights",
    "Advertising",
    "Physical Therapy",
    "Geological Engineering",
    "Creative Writing",
    "Real Estate Development",
    "Space Systems Operations",
    "Environmental Engineering Technology",
    "Innovation Leadership Engineering Entrepreneurship",
    "Development Economics and International Development",
    "Machine Tool Technology",
    "Geosciences",
    "Enterprise Risk Management",
    "Philosophy",
    "Digital Image Processing",
    "Counselor Education",
    "Optics",
    "Criminology",
    "Archaeology",
    "Molecular Medicine",
    "Paper Science and Engineering",
    "Health Management and Clinical Assistance",
    "Automotive Technology",
    "Signal Geospatial Intelligence",
    "Cognitive Science",
    "Quantum Technologies",
    "Entomology",
    "Geology",
    "Welding Engineering Technology",
    "Recording Arts Technology",
    "Clinical Nurse Leader",
    "Computer Forensics",
    "Complementary Integrative Healthcare",
    "Water Wetlands and Marine Resources Management",
    "Environmental Education",
    "Packaging Science",
    "Human Sciences",
    "Teacher Education Multiple Levels",
    "Marketing Research",
    "Intellectual Property",
    "Mass Communications",
    "Metallurgical Engineering",
    "Visual and Performing Arts General",
    "Ecommerce",
    "Civil and Construction Engineering",
    "Food Preparation",
    "Public Health Education",
    "Occupational Therapy",
    "Arts and Entertainment Management",
    "Biomedical Technology",
    "Multimedia",
    "Religious Studies",
    "Higher Education Administration",
    "Family Practice Nurse Practitioner",
    "Applied Behavior Analysis",
    "Sustainable Business",
    "Urban Education and Leadership",
    "Cell Biology and Anatomy",
    "Molecular Biochemistry",
    "Professional Studies",
    "Photography",
    "Water Quality and Wastewater Treatment",
    "Industrial Safety Technology",
    "Development Studies",
    "Digital Arts",
    "Telecommunications Systems and Networks",
    "Urban Development Planning",
    "Biochemistry Biophysics and Molecular Biology",
    "Music Technology",
    "Language Literature and Cultural Studies",
    "Branding Integrated Communications BIC",
    "Liberal Arts and Sciences",
    "Educational Instructional and Curriculum Supervision",
    "Plant Pathology",
    "Dance",
    "Genetic Counseling",
    "Speech Language Pathology and Audiology",
    "Community Development",
    "Educational Administration",
    "Medical Organizations and Systems",
    "Genomics",
    "Digital Creative Media",
    "Child and Adolescent Studies",
    "Health Policy Analysis",
    "Urban Planning and Public Administration",
    "Educational Technology",
    "Gerontology",
    "Solar Energy Technology",
    "Aquaculture",
    "Mathematics Teacher Education",
    "Game Programming",
    "Nursing Practice",
    "Global Sustainable Development",
    "Geotechnical and Geo Environmental Engineering",
    "Applied Biological Sciences",
    "Emergency Management Homeland Security",
    "Accounting and Analytics",
    "Clinical Laboratory Science",
    "Special Education",
    "Educational Psychology",
    "Marine Biology",
    "Health and Physical Fitness",
    "Community Health and Preventive Medicine",
    "Humanities",
    "Telecommunications Management",
    "Innovation Engineering",
    "Natural Resources Management and Policy",
    "Zoology",
    "Soil Science",
    "Art History Criticism and Conservation",
    "Hydrology and Water Resources Science",
    "School Counseling",
    "Nursing Administration",
    "Physiology",
    "Atmospheric Sciences and Meteorology",
    "American Studies",
    "Family and Consumer Sciences",
    "Engineering Material",
    "Nursing Education",
    "Sustainability Studies",
    "Textile Sciences and Engineering",
    "International Policy Analysis",
    "Women's Studies",
    "Communications Technologies",
    "Physical Education Teaching and Coaching",
    "Comparative Literature",
    "International Economics",
    "Land Use Planning",
    "Rehabilitation Science",
    "Plant Molecular Biology",
    "Sports Studies",
    "Fire Science",
    "Games and Entertainment Design",
    "Environmental Policy and Management",
    "Sports and Fitness Administration",
    "Chemical and Physical Oceanography",
    "Teaching English As A Second Language (ESL)",
    "Architectural History and Criticism",
    "Molecular Pharmacology",
    "Ecology and Evolutionary Biology",
    "Science Technology",
    "School Psychology",
    "Neurobiology and Behavior",
    "Air and Space Operations Technology",
    "Anatomy",
    "Technology Leadership and Management",
    "Athletic Training",
    "Health Promotion",
    "Political Economy",
    "Music Theory and Composition",
    "Chemical Education",
    "Mechanical Engineering Technology",
    "Developmental Psychology",
    "Adult and Technical Education",
    "College Student Counseling and Personnel Services",
    "Surgical Nursing",
    "Planetary Astronomy and Science",
    "Cultural Resource Management",
    "Product Innovation and Computing",
    "Health Technology",
    "Illustration",
    "Nonprofit and Non Governmental Organizations",
    "Biofabrication and Biomaterials",
    "Elementary School Teaching",
    "Dramatics",
    "Architectural Technology",
    "Studio Arts",
    "Agriculture Education Services",
    "Biophysics",
    "Technology and International Affairs",
    "Applied Linguistics",
    "Mental Health Nursing",
    "Computer Science Mathematical Sciences",
    "Advertising Public Relations and Media Design",
    "Atmospheric Chemistry and Climatology",
    "Forestry",
    "Arts Management and Arts Entrepreneurship",
    "Speech Language Pathology",
    "Leadership and Administration",
    "Education Administration and Supervision",
    "Playwriting and Screenwriting",
    "Botany",
    "Computational and Medicinal Chemistry",
    "Marriage and Family Therapy",
    "Natural Sciences",
    "Curriculum and Instruction",
    "Facilities Planning and Management",
    "Biosciences",
    "Medical Imaging Technology",
    "Graphics Visualization and Computational Fabrication",
    "Purchasing Procurement and Contracts Management",
    "Meteorology",
    "Graphic Communications",
    "Governance Policy and Administration",
    "Psychological Method",
    "Environmental Toxicology",
    "Behavioral Sciences",
    "Applied Life Science",
    "Environmental System",
    "Biological Science Education",
    "Wildlife Fish and Wildlands Science and Management",
    "Asian Studies",
    "Telecommunications Technology",
    "Learning Sciences",
    "Directing and Theatrical Production",
    "Pharmaceutical Marketing",
    "Vocational Rehabilitation Counseling",
    "Speech and Hearing Sciences",
    "Fiber Textile and Weaving Arts",
    "Natural Resource Recreation and Tourism",
    "Coaching and Talent Development",
    "Organizational Communication",
    "Organization Development",
    "Fishing and Fisheries",
    "Language Interpretation and Translation",
    "German",
    "Natural Resources and Conservation",
    "Experimental Psychology",
    "Merchandising and Buying Operations",
    "European Studies",
    "Ceramic Sciences and Engineering",
    "Diplomacy and Trade",
    "Restaurant and Food Services Management",
    "Earth Systems Environmental Science Technology",
    "Bioethics and Medical Ethics",
    "Systematic Biology",
    "Art Education",
    "Clinical Child Psychology",
    "Wildlife Biology",
    "Forest Sciences and Biology",
    "Spanish",
    "Musical Theater",
    "Pediatric Nursing",
    "Graphic Communication Design",
    "Human Development Family Studies and Child Care",
    "Intelligence General",
    "Cellular Biology and Histology",
    "Forensic Chemistry",
    "Geophysics and Seismology",
    "Wind Energy",
    "Retailing",
    "Accounting and Taxation",
    "Crop Production",
    "Radiology",
    "General Literature",
    "Nuclear Engineering",
    "Musicology and Ethnomusicology",
    "Adult and Continuing Education",
    "Biodiversity",
    "Parks Recreation and Leisure Facilities Management",
    "English Literature With Film Studies",
    "Clinical and Experimental Therapeutics",
    "Pastoral Counseling",
    "Accountacy and Finance",
    "Range Science",
    "Education Policy",
    "Conservation Biology",
    "Politics and Contemporary History",
  ]

  // Add state for filtered courses
  const [filteredCourses, setFilteredCourses] = useState([])
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)

  // Function to handle degree change and reset relevant fields
  const handleDegreeChange = (newDegree) => {
    setDegree(newDegree)
    // Clear aptitude test fields when switching degrees
    setForm((prev) => ({
      ...prev,
      aptitudeTest: "",
      aptitudeTestScore: "",
    }))
  }
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState("")
  const [showLayout, setShowLayout] = useState(true)
  const [searchCompleted, setSearchCompleted] = useState(false)

  // Login popup state
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [loginFormData, setLoginFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
  })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Add event listener to close course dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showCourseDropdown && !event.target.closest(".course-dropdown-container")) {
        setShowCourseDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCourseDropdown])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Function to handle course input changes and filtering
  const handleCourseInputChange = (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, fieldOfStudy: value }))

    // Filter courses based on input
    if (value.trim() !== "") {
      const filtered = courses.filter((course) => course.toLowerCase().includes(value.toLowerCase()))
      setFilteredCourses(filtered)
      setShowCourseDropdown(true)
    } else {
      setFilteredCourses(courses) // Show all courses when input is empty
      setShowCourseDropdown(true)
    }
  }

  // Function to handle input focus for course field
  const handleCourseInputFocus = () => {
    if (form.fieldOfStudy?.trim()) {
      const filtered = courses.filter((course) => course.toLowerCase().includes(form.fieldOfStudy.toLowerCase()))
      setFilteredCourses(filtered)
    } else {
      setFilteredCourses(courses) // Show all courses when input is empty
    }
    setShowCourseDropdown(true)
  }

  // Function to select a course from dropdown
  const selectCourse = (course) => {
    setForm((prev) => ({ ...prev, fieldOfStudy: course }))
    setShowCourseDropdown(false)
  }

  const validateForm = () => {
    const requiredFields = ["preferredCountry", "fieldOfStudy"]

    // Add customCountry as a required field if "Other" is selected
    if (form.preferredCountry === "Other") {
      requiredFields.push("customCountry")
    }

    if (degree === "bachelors") {
      requiredFields.push("school", "boardScore")
      if (form.aptitudeTest && form.aptitudeTest !== "None") {
        requiredFields.push("aptitudeTestScore")
      }
    } else if (degree === "masters") {
      requiredFields.push("bachelorCollege", "majorCourse", "cgpa", "backlogs")
      if (form.aptitudeTest && form.aptitudeTest !== "None") {
        requiredFields.push("aptitudeTestScore")
      }
    } else if (degree === "phd") {
      requiredFields.push("mastersCollege", "majorCourse", "phdScore", "phdBacklogs")
      if (form.aptitudeTest && form.aptitudeTest !== "None") {
        requiredFields.push("aptitudeTestScore")
      }
    }

    for (const field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        setFormError(`Please fill out the '${field}' field.`)
        return false
      }
    }
    setFormError("")
    return true
  }

  // Send lead data to CRM
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

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    try {
      await sendLead(loginFormData)
      setLoginSuccess(true)
      setIsLoggedIn(true)

      // Save login state to localStorage
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("userEmail", loginFormData.email)

      // Reset form
      setLoginFormData({ fullname: "", email: "", phone: "", city: "" })

      // Close popup and proceed with college finder submission
      setTimeout(() => {
        setShowLoginPopup(false)
        proceedWithSubmission()
      }, 1000)
    } catch (err) {
      alert("Something went wrong. Please try again.")
    }
    setLoginLoading(false)
  }

  // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Proceed with college finder submission after authentication
  const proceedWithSubmission = async () => {
    setLoading(true)
    let retryCount = 0
    const maxRetries = 2

    const attemptSubmission = async () => {
      try {
        const response = await fetch("/api/college-gpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            // Use the custom country value if "Other" is selected
            preferredCountry: form.preferredCountry === "Other" ? form.customCountry : form.preferredCountry,
            degree,
            requestFormat: {
              categories: ["Ambitious", "Moderate", "Safe"],
              minColleges: 8,
            },
          }),
          // Add a longer timeout
          signal: AbortSignal.timeout(30000), // 30 seconds timeout
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Server response error:", response.status, errorText)
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const data = await response.json()
        setResult(data.result)
        setShowModal(true)
        setShowLayout(false)
        setSearchCompleted(true)
      } catch (err) {
        console.error("Submission error:", err)

        // Check if we should retry
        if (retryCount < maxRetries) {
          retryCount++
          alert(`Request timed out. Retrying (${retryCount}/${maxRetries})...`)
          return attemptSubmission()
        }

        // Show a more helpful error message
        if (err.message && err.message.includes("timeout")) {
          alert(
            "The server is taking too long to respond. This might be due to high traffic. Please try again later or contact support if the issue persists.",
          )
        } else if (err.message && err.message.includes("504")) {
          alert(
            "The server timed out. This usually happens when the system is under heavy load. Please try again in a few minutes.",
          )
        } else {
          alert("There was a problem connecting to the server. Please check your internet connection and try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    await attemptSubmission()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // Check if user is logged in
    if (!isLoggedIn) {
      // Show login popup if not logged in
      setShowLoginPopup(true)
    } else {
      // Proceed with submission if already logged in
      proceedWithSubmission()
    }
  }

  const renderCommonFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="col-span-1">
        <label className="block font-semibold mb-1">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Preferred Country</span>
          </div>
        </label>
        <select
          name="preferredCountry"
          value={form.preferredCountry || ""}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        >
          <option value="">Select your preferred country</option>
          {["USA", "Canada", "UK", "Australia", "Germany", "Other"].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {form.preferredCountry === "Other" && (
          <input
            type="text"
            name="customCountry"
            value={form.customCountry || ""}
            onChange={handleChange}
            placeholder="Enter your preferred country"
            className="w-full border px-4 py-2 rounded-md mt-2 focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
          />
        )}
      </div>

      <div className="col-span-1 relative course-dropdown-container">
        <label className="block font-semibold mb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Planning to study</span>
          </div>
        </label>
        <input
          type="text"
          name="fieldOfStudy"
          value={form.fieldOfStudy || ""}
          onChange={handleCourseInputChange}
          onFocus={handleCourseInputFocus}
          placeholder="e.g., Computer Science, Business, Medicine"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        />

        {/* Course dropdown */}
        {showCourseDropdown && filteredCourses.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                onClick={() => selectCourse(course)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {course}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderDegreeFields = () => {
    switch (degree) {
      case "bachelors":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>School Name</span>
                </div>
              </label>
              <input
                type="text"
                name="school"
                value={form.school || ""}
                onChange={handleChange}
                placeholder="Enter your high school name"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Score (out of 100)</span>
                </div>
              </label>
              <input
                type="number"
                name="boardScore"
                value={form.boardScore || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, boardScore: "" }))
                  } else if (value > 100) {
                    setForm((prev) => ({ ...prev, boardScore: "100" }))
                  } else {
                    setForm((prev) => ({ ...prev, boardScore: value.toString() }))
                  }
                }}
                min="0"
                max="100"
                placeholder="e.g., 85"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Aptitude Test</span>
                </div>
              </label>
              <select
                name="aptitudeTest"
                value={form.aptitudeTest || ""}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              >
                <option value="">Select aptitude test</option>
                <option value="SAT">SAT</option>
                <option value="ACT">ACT</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className={`col-span-1 ${form.aptitudeTest === "None" || !form.aptitudeTest ? "hidden" : ""}`}>
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{form.aptitudeTest} Score</span>
                </div>
              </label>
              <input
                type="number"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: "" }))
                  } else {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: value.toString() }))
                  }
                }}
                min="0"
                placeholder={`Enter your ${form.aptitudeTest} score`}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
          </div>
        )
      case "masters":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>Bachelor's College Name</span>
                </div>
              </label>
              <input
                type="text"
                name="bachelorCollege"
                value={form.bachelorCollege || ""}
                onChange={handleChange}
                placeholder="Enter your bachelor's college name"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Major Course</span>
                </div>
              </label>
              <input
                type="text"
                name="majorCourse"
                value={form.majorCourse || ""}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Economics"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Graduation Score (out of 10 CGPA)</span>
                </div>
              </label>
              <input
                type="number"
                name="cgpa"
                value={form.cgpa || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, cgpa: "" }))
                  } else if (value > 10) {
                    setForm((prev) => ({ ...prev, cgpa: "10" }))
                  } else {
                    setForm((prev) => ({ ...prev, cgpa: value.toString() }))
                  }
                }}
                min="0"
                max="10"
                step="0.01"
                placeholder="e.g., 8.5"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">Current Backlogs (0-5)</label>
              <input
                type="number"
                name="backlogs"
                value={form.backlogs || ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, backlogs: "0" }))
                  } else if (value > 5) {
                    setForm((prev) => ({ ...prev, backlogs: "5" }))
                  } else {
                    setForm((prev) => ({ ...prev, backlogs: value.toString() }))
                  }
                }}
                min="0"
                max="5"
                placeholder="Enter number of backlogs (0-5)"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Aptitude Test</span>
                </div>
              </label>
              <select
                name="aptitudeTest"
                value={form.aptitudeTest || ""}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              >
                <option value="">Select aptitude test</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className={`col-span-1 ${form.aptitudeTest === "None" || !form.aptitudeTest ? "hidden" : ""}`}>
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{form.aptitudeTest} Score</span>
                </div>
              </label>
              <input
                type="number"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: "" }))
                  } else {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: value.toString() }))
                  }
                }}
                min="0"
                placeholder={`Enter your ${form.aptitudeTest} score`}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
          </div>
        )
      case "phd":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>Master's College Name</span>
                </div>
              </label>
              <input
                type="text"
                name="mastersCollege"
                value={form.mastersCollege || ""}
                onChange={handleChange}
                placeholder="Enter your master's college name"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Major Course</span>
                </div>
              </label>
              <input
                type="text"
                name="majorCourse"
                value={form.majorCourse || ""}
                onChange={handleChange}
                placeholder="e.g., Machine Learning, Biochemistry"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Score or Expected Score</span>
                </div>
              </label>
              <input
                type="number"
                name="phdScore"
                value={form.phdScore || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, phdScore: "" }))
                  } else if (value > 10) {
                    setForm((prev) => ({ ...prev, phdScore: "10" }))
                  } else {
                    setForm((prev) => ({ ...prev, phdScore: value.toString() }))
                  }
                }}
                min="0"
                max="10"
                step="0.01"
                placeholder="e.g., 8.5"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">Backlogs (0-5)</label>
              <input
                type="number"
                name="phdBacklogs"
                value={form.phdBacklogs || ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, phdBacklogs: "0" }))
                  } else if (value > 5) {
                    setForm((prev) => ({ ...prev, phdBacklogs: "5" }))
                  } else {
                    setForm((prev) => ({ ...prev, phdBacklogs: value.toString() }))
                  }
                }}
                min="0"
                max="5"
                placeholder="Enter number of backlogs (0-5)"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Aptitude Test</span>
                </div>
              </label>
              <select
                name="aptitudeTest"
                value={form.aptitudeTest || ""}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              >
                <option value="">Select aptitude test</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className={`col-span-1 ${form.aptitudeTest === "None" || !form.aptitudeTest ? "hidden" : ""}`}>
              <label className="block font-semibold mb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{form.aptitudeTest} Score</span>
                </div>
              </label>
              <input
                type="number"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={(e) => {
                  const value = Number.parseFloat(e.target.value)
                  if (isNaN(value) || value < 0) {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: "" }))
                  } else {
                    setForm((prev) => ({ ...prev, aptitudeTestScore: value.toString() }))
                  }
                }}
                min="0"
                placeholder={`Enter your ${form.aptitudeTest} score`}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderTests = () => (
    <div className="mb-6">
      <label className="block font-semibold mb-1">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>English Test</span>
        </div>
      </label>
      <select
        name="englishTest"
        value={form.englishTest || ""}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
      >
        <option value="">Select your English test</option>
        {["TOEFL", "IELTS", "PTE", "None"].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {form.englishTest && form.englishTest !== "None" && (
        <input
          type="number"
          name="englishTestScore"
          value={form.englishTestScore || ""}
          onChange={(e) => {
            const value = Number.parseFloat(e.target.value)
            if (isNaN(value) || value < 0) {
              setForm((prev) => ({ ...prev, englishTestScore: "" }))
            } else {
              setForm((prev) => ({ ...prev, englishTestScore: value.toString() }))
            }
          }}
          min="0"
          placeholder={`Enter your ${form.englishTest} score (e.g., TOEFL: 100, IELTS: 7.5)`}
          className="w-full border px-4 py-2 rounded-md mt-2 focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        />
      )}

      {/* Research Papers field for all degree types */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Research Papers Published</span>
          </div>
        </label>
        <input
          type="number"
          name="researchPapers"
          value={form.researchPapers || ""}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value)
            if (isNaN(value) || value < 0) {
              setForm((prev) => ({ ...prev, researchPapers: "0" }))
            } else {
              setForm((prev) => ({ ...prev, researchPapers: value.toString() }))
            }
          }}
          min="0"
          placeholder="Number of research papers published"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        />
      </div>

      {/* Work Experience field only for masters and PhD */}
      {(degree === "masters" || degree === "phd") && (
        <div className="mt-4">
          <label className="block font-semibold mb-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Work Experience (months)</span>
            </div>
          </label>
          <input
            type="number"
            name="workExperienceMonths"
            value={form.workExperienceMonths || ""}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value)
              if (isNaN(value) || value < 0) {
                setForm((prev) => ({ ...prev, workExperienceMonths: "0" }))
              } else {
                setForm((prev) => ({ ...prev, workExperienceMonths: value.toString() }))
              }
            }}
            min="0"
            placeholder="Enter work experience in months"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
          />
        </div>
      )}
    </div>
  )

  const renderResults = () => {
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return <p className="text-gray-600">No college recommendations found.</p>
    }

    // Handle both array and string results
    if (typeof result === "string") {
      return (
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{result}</p>
        </div>
      )
    }

    // Group colleges by category
    const categories = {
      Ambitious: [],
      Moderate: [],
      Safe: [],
    }

    // If result is already categorized, use it directly
    if (Array.isArray(result) && result.some((item) => typeof item === "object" && item.category)) {
      result.forEach((college) => {
        const category = college.category || "Moderate"
        if (categories[category]) {
          categories[category].push(college)
        }
      })
    }
    // Otherwise, distribute colleges evenly across categories
    else if (Array.isArray(result)) {
      const totalColleges = result.length
      const ambitiousCount = Math.ceil(totalColleges / 3)
      const moderateCount = Math.ceil((totalColleges - ambitiousCount) / 2)

      result.forEach((college, index) => {
        if (index < ambitiousCount) {
          categories["Ambitious"].push(college)
        } else if (index < ambitiousCount + moderateCount) {
          categories["Moderate"].push(college)
        } else {
          categories["Safe"].push(college)
        }
      })
    }

    return (
      <div className="space-y-6">
        {Object.entries(categories).map(([category, colleges]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#A51C30] border-b pb-2">{category}</h3>
            <div className="space-y-3">
              {colleges.length > 0 ? (
                colleges.map((college, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {typeof college === "string" ? (
                      <p className="whitespace-pre-line text-sm sm:text-base">{college}</p>
                    ) : (
                      <>
                        <h4 className="font-bold text-base sm:text-lg">{college.name || "College Name"}</h4>
                        <p className="text-sm sm:text-base">
                          {college.description || college.details || "No details available"}
                        </p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No colleges in this category</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Login popup component
  const renderLoginPopup = () => {
    if (!showLoginPopup) return null

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative">
          <button
            onClick={() => setShowLoginPopup(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-[#A51C30]">Login to View Results</h2>
            <p className="text-center text-gray-600 mt-2">
              Please fill in your details to see your college recommendations
            </p>
          </div>

          {loginSuccess ? (
            <div className="text-center py-4">
              <div className="mb-4 text-green-600 font-semibold">Login successful!</div>
              <div className="text-gray-600">Preparing your college recommendations...</div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your Full Name"
                    value={loginFormData.fullname}
                    onChange={handleLoginChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                    value={loginFormData.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    value={loginFormData.phone}
                    onChange={handleLoginChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    value={loginFormData.city}
                    onChange={handleLoginChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#A51C30] text-white py-3 rounded-md font-semibold hover:bg-[#8a1726] transition-colors disabled:opacity-70"
                >
                  {loginLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  return showLayout ? (
    <DefaultLayout>
      <div className="flex justify-center py-4 sm:py-8">
        <div className="max-w-3xl w-full px-4 sm:px-6 py-6 sm:py-8 bg-white rounded-lg shadow-lg my-8 sm:my-20">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-8 w-8 text-[#A51C30] mr-2" />
            <h2 className="text-xl sm:text-2xl font-bold text-center">Find Your Ideal College</h2>
          </div>

          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              <p className="font-medium">{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <label className="block font-semibold mb-3 text-lg border-b pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Select Degree</span>
                </div>
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {["bachelors", "masters", "phd"].map((degreeOption) => (
                  <button
                    key={degreeOption}
                    type="button"
                    onClick={() => handleDegreeChange(degreeOption)}
                    className={`py-2 px-2 sm:px-4 rounded-md text-center capitalize transition-all text-sm sm:text-base ${
                      degree === degreeOption
                        ? "bg-[#A51C30] text-white font-medium"
                        : "bg-white border hover:bg-gray-100"
                    }`}
                  >
                    {degreeOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4 text-lg border-b pb-2">Education Details</h3>
              {renderCommonFields()}
              {renderDegreeFields()}
              {renderTests()}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#A51C30] text-white font-semibold rounded-md hover:bg-[#9e1d2d] transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Finding Colleges...
                </span>
              ) : (
                "Find Colleges"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Login popup */}
      {renderLoginPopup()}
    </DefaultLayout>
  ) : (
    <div className="min-h-screen bg-white">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-8 rounded-lg w-full sm:w-4/5 lg:w-2/3 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto my-4 sm:my-10">
            <div className="flex items-center justify-center mb-6">
              <School className="h-6 w-6 text-[#A51C30] mr-2" />
              <h2 className="text-xl sm:text-2xl font-bold text-center">College Recommendations</h2>
            </div>

            <div className="bg-gray-50 p-3 sm:p-6 rounded-lg border border-gray-200 mb-4 sm:mb-6">
              {renderResults()}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false)
                  setShowLayout(true)
                  setLoading(false) // Ensure loading is reset
                  setSearchCompleted(false) // Reset search completed state
                }}
                className="px-4 sm:px-6 py-2 bg-[#A51C30] text-white font-semibold rounded-md hover:bg-[#9e1d2d] transition duration-300 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
