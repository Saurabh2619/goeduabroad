"use client"

import { useState } from "react"
import DefaultLayout from "../../layouts/DefaultLayout"
import { Loader2, GraduationCap, Globe, BookOpen, School } from "lucide-react"

export default function CollegeFinder() {
  const [degree, setDegree] = useState("bachelors")

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const requiredFields = ["preferredCountry", "fieldOfStudy"]

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      // First check if the user is authenticated
      const authResponse = await fetch("/api/check-auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      // If not authenticated, redirect to login page
      if (!authResponse.ok) {
        window.location.href = "https://pte.goeduabroad.com/login"
        return
      }

      // User is authenticated, proceed with the college finder request
      const response = await fetch("/api/college-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          degree,
          requestFormat: {
            categories: ["Ambitious", "Moderate", "Safe"],
            minColleges: 8,
          },
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setResult(data.result) // Assuming result is an array
        setShowModal(true)
        setShowLayout(false)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (err) {
      alert("Server error")
    } finally {
      setLoading(false)
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

      <div className="col-span-1">
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
          onChange={handleChange}
          placeholder="e.g., Computer Science, Business, Medicine"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        />
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
                onChange={handleChange}
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
                type="text"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Enter number of backlogs (0-5)"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
                min="0"
                max="5"
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
                type="text"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={handleChange}
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
                type="text"
                name="phdScore"
                value={form.phdScore || ""}
                onChange={handleChange}
                placeholder="e.g., 3.8/4.0 GPA"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block font-semibold mb-1">Backlogs (0-5)</label>
              <input
                type="number"
                name="phdBacklogs"
                value={form.phdBacklogs || ""}
                onChange={handleChange}
                placeholder="Enter number of backlogs (0-5)"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
                min="0"
                max="5"
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
                type="text"
                name="aptitudeTestScore"
                value={form.aptitudeTestScore || ""}
                onChange={handleChange}
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
          type="text"
          name="englishTestScore"
          value={form.englishTestScore || ""}
          onChange={handleChange}
          placeholder={`Enter your ${form.englishTest} score (e.g., TOEFL: 100, IELTS: 7.5)`}
          className="w-full border px-4 py-2 rounded-md mt-2 focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
        />
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
