"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import DefaultLayout from "../layouts/DefaultLayout"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function WebinarAdmin() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEntries() {
      try {
        setLoading(true)
        // Removed the ordering by created_at since that column doesn't exist
        const { data, error } = await supabase
          .from("webinar_entries")
          .select("*")

        if (error) {
          throw error
        }

        setEntries(data || [])
      } catch (error) {
        console.error("Error fetching entries:", error)
        setError("Failed to load entries. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  // Filter entries based on search term
  const filteredEntries = entries.filter((entry) => {
    const searchString = searchTerm.toLowerCase()
    return (
      entry.team_name?.toLowerCase().includes(searchString) ||
      entry.team_leader?.toLowerCase().includes(searchString) ||
      entry.member_1?.toLowerCase().includes(searchString) ||
      entry.member_2?.toLowerCase().includes(searchString) ||
      entry.school_name?.toLowerCase().includes(searchString) ||
      entry.email?.toLowerCase().includes(searchString)
    )
  })

  return (
    <DefaultLayout hideAI={true} navbar>
      <div className="container mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#a61d31] text-white p-6">
            <h1 className="text-2xl font-bold">Youngpreneurs Webinar Admin</h1>
            <p className="text-gray-100">
              View all registrations for the Youngpreneurs 2025 event
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6 relative">
              <input
                type="text"
                placeholder="Search by team name, member, school..."
                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-[#a61d31] focus:border-[#a61d31]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a61d31]"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">{error}</div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center text-gray-500 p-4">
                {searchTerm ? "No entries match your search" : "No entries found"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Leader
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        School
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.team_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.team_leader}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.member_1 && <div>{entry.member_1}</div>}
                          {entry.member_2 && <div>{entry.member_2}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.school_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.contact_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              Total Entries: {filteredEntries.length} {searchTerm && `(filtered from ${entries.length})`}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}