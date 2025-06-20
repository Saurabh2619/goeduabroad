"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../../utils/supabaseClient"
import HTML_Render from "../../components/HTML_Render"
import Block from "../../components/Block"
import React from "react"
import CodeBlock from "../../components/CodeBlock"
import { NextSeo } from "next-seo"
import Head from "next/head"
import Image from "../../components/Image"
import Button from "../../components/Button"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import Card from "../../components/Card"
import DefaultLayout from "../../layouts/DefaultLayout"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import RenderEditor from "../../components/RenderEditor"
import { PopupLeadForm } from "../../components/PopupLeadForm"

function Post({ data, datac }) {
  const router = useRouter()
  const [mobile, setMobile] = useState("desktop")
  const [comments, setComs] = useState([])
  const [rquery, setQuery] = useState()
  const [relatedPosts, setRelatedPosts] = useState()
  const [commentData, setCommentData] = useState({ name: "", comment: "" })
  const [activeTab, setActiveTab] = useState("content")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [estimatedReadTime, setEstimatedReadTime] = useState("5 min read")
  const final = datac.data[0]

  useEffect(() => {
    function setWidth() {
      if (window.innerWidth < 768) {
        setMobile("mobile")
      } else if (window.innerWidth < 968) {
        setMobile("tablet")
      } else {
        setMobile("desktop")
      }
    }

    // Calculate estimated reading time
    if (final && final.MarkdownData) {
      const wordsPerMinute = 200
      const wordCount = final.MarkdownData.split(/\s+/).length
      const readTime = Math.ceil(wordCount / wordsPerMinute)
      setEstimatedReadTime(`${readTime} min read`)
    }

    // Add scroll progress indicator
    const progressBar = document.getElementById("reading-progress")
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
      if (progressBar) progressBar.style.width = `${scrollPercentage}%`
    }

    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", setWidth)
    window.addEventListener("load", setWidth)

    setWidth()

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", setWidth)
      window.removeEventListener("load", setWidth)
    }
  }, [final])

  // Renderer
  const CustomRender = (props) => {
    const components = {
      block: Block,
      htmlRender: HTML_Render,
      codeBlock: CodeBlock,
      image: Image,
      button: Button,
    }
    const data = props.data
    const getOb = () =>
      data &&
      data.map((i, id) => {
        return React.createElement(components[i.component], { ...i.props, key: id })
      })

    return getOb()
  }

  useEffect(() => {
    if (router.query) {
      setQuery(router.query.slug)
    }
  }, [router.query])

  function getDate(data) {
    const r = new Date(data)
    const options = { year: "numeric", month: "long", day: "numeric" }
    return r.toLocaleDateString("en-US", options)
  }

  async function getCom(a) {
    await supabase
      .from("comments")
      .select("*")
      .eq("post_id", a)
      .then((res) => {
        setComs(res.data || [])
      })
  }

  async function getRelatedPosts(a, b) {
    await supabase
      .from("blog_posts")
      .select("*")
      .match({ cat: b, isActive: true })
      .neq("id", a)
      .limit(5)
      .then((res) => {
        setRelatedPosts(res.data)
      })
  }

  useEffect(() => {
    if (final) {
      getRelatedPosts(final.id, final.cat)
      getCom(final.id)
    }
  }, [final])

  const addComment = async () => {
    if (!commentData.name.trim() || !commentData.comment.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const newComment = {
      post_id: final.id,
      user: commentData.name.trim(),
      text: commentData.comment.trim(),
      isApproved: false, // Comments need admin approval
      isReply: false,
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("comments").insert(newComment).select()

    if (data && data[0]) {
      // Clear form after successful submission
      setCommentData({ name: "", comment: "" })
      alert("Comment submitted successfully! It will appear after admin approval.")
    } else {
      alert("Error submitting comment. Please try again.")
    }
  }

  const handleShare = (platform) => {
    const url = `https://www.goeduabroad.com/post/${final?.slug}`
    const title = final?.title

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`)
        break
      default:
        navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
    }

    setShowShareMenu(false)
  }

  // Simple comment form component
  const CommentForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
      <div className="space-y-4">
        <div>
          <input
            key="name-input"
            type="text"
            placeholder="Write your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={commentData.name}
            onChange={(e) => setCommentData((prev) => ({ ...prev, name: e.target.value }))}
            autoComplete="name"
          />
        </div>
        <div>
          <textarea
            key="comment-textarea"
            placeholder="Write your Comment Here"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
            value={commentData.comment}
            onChange={(e) => setCommentData((prev) => ({ ...prev, comment: e.target.value }))}
            autoComplete="off"
          />
        </div>
        <button
          onClick={addComment}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Add Comment
        </button>
      </div>
    </div>
  )

  return (
    <DefaultLayout isSideBar={true} isHomepage={false} cat={data.data} isActivePassive={true}>
      <Head>{/* Structured data would go here */}</Head>
      <NextSeo
        title={final.title}
        description={`${final.metaDesc}| Best Study Abroad Consultant in India`}
        canonical={`https://www.goeduabroad.com/post/${final?.slug}`}
        openGraph={{
          type: "article",
          url: `https://www.goeduabroad.com/post/${final?.slug}`,
          title: final?.title + " | EduAbroad",
          description: final && final.metaDesc ? final.metaDesc : final?.title,
          article: {
            publishedTime: final.created_at,
            modifiedTime: final.created_at,
            authors: ["Ashutosh Mishra"],
            tags: final?.tags ? final.tags : "",
          },
          images: [
            {
              url: final.img,
              alt: final.title + " | EduAbroad",
            },
          ],
        }}
      />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200">
        <div
          id="reading-progress"
          className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300"
          style={{ width: "0%" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-28 sm:px-6 lg:px-8">
        <PopupLeadForm />

        {/* Simplified Hero section - removed title overlay */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12 mt-8 shadow-2xl">
          <div className="relative h-[500px] md:h-[600px]">
            <img src={final.img || "/placeholder.svg"} alt={final?.metaTitle} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex py-4 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-1">
            <li>
              <a href="/" className="hover:text-red-700 transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
              <a href="/blog" className="ml-1 hover:text-red-700 transition-colors">
                Blog
              </a>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-gray-700 truncate max-w-xs">{final.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article title and meta info */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{final.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <img
                src={final.author.profile_image || "/placeholder.svg"}
                alt={final?.author?.fullname}
                className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover mr-2"
              />
              <span>{final.author.fullname}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {getDate(final.created_at)}
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {estimatedReadTime}
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {comments?.length || 0} Comments
            </div>
          </div>
        </div>

        {/* Tags */}
        {final?.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {final.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1 rounded-full border border-red-200"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Content layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Simplified Sidebar - only author info and social share */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Author info */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <svg className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-sm text-red-700 font-medium uppercase tracking-wide">Written by</p>
                </div>
                <div className="flex items-start">
                  <div className="relative">
                    <img
                      src={final.author.profile_image || "/placeholder.svg"}
                      alt={final?.author?.fullname}
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover flex-shrink-0"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{final.author.fullname}</h4>
                    <p className="text-sm text-red-600 font-medium mb-2">{final.author.badge}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {final.author.description ||
                        "Expert education consultant specializing in international education and study abroad programs with years of experience helping students achieve their academic goals."}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Verified Expert
                    </div>
                  </div>
                </div>
              </div>

              {/* Social share */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Share this article</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center justify-center p-3 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center justify-center p-3 rounded-xl bg-[#1DA1F2] hover:bg-[#1A91DA] text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center justify-center p-3 rounded-xl bg-[#0A66C2] hover:bg-[#095BA8] text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center justify-center p-3 rounded-xl bg-[#25D366] hover:bg-[#22C55E] text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-full mt-3 flex items-center justify-center p-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-2/3 xl:w-3/4">
            {/* Content tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "content"
                      ? "border-red-700 text-red-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Article
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "comments"
                      ? "border-red-700 text-red-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Comments ({comments?.length || 0})
                  </div>
                </button>
              </nav>
            </div>

            {activeTab === "content" && (
              <div>
                {/* Article content */}
                <div
                  id="main-content"
                  className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-li:marker:text-gray-800 prose-li:marker:font-semibold"
                >
                  <style jsx>{`
                    .article-content ul li::marker {
                      color: #1f2937;
                      font-weight: 600;
                    }
                    .article-content ol li::marker {
                      color: #1f2937;
                      font-weight: 600;
                    }
                    .article-content ul li {
                      color: #374151;
                    }
                    .article-content ol li {
                      color: #374151;
                    }
                  `}</style>
                  {final.MarkdownData ? (
                    <ReactMarkdown className="article-content" remarkPlugins={[remarkGfm]}>
                      {final.MarkdownData}
                    </ReactMarkdown>
                  ) : (
                    <RenderEditor isJSON={false} renderFrontEndOnly={true} postData={final} onChange={(e) => {}} />
                  )}
                </div>

                {/* Leave a comment section in article tab */}
                <CommentForm />
              </div>
            )}

            {activeTab === "comments" && (
              <div>
                {/* Simplified Comments section */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Comments ({comments?.length || 0})</h2>

                  {comments && comments.length > 0 ? (
                    <div className="space-y-6 mb-8">
                      {comments
                        .filter((i) => i.isApproved === true && !i.isReply) // Only show approved comments
                        .map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                                {item?.user
                                  ? item.user
                                      .split(" ")
                                      .map((i) => i.substring(0, 1))
                                      .join("")
                                  : ""}
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="font-semibold text-gray-900">{item.user}</p>
                                <p className="text-gray-700 mt-1">{item.text}</p>
                                <p className="text-sm text-gray-500 mt-2">{getDate(item.created_at)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No Comment found on this post. You can leave a comment</p>
                    </div>
                  )}

                  {/* Leave a comment section in comments tab */}
                  <CommentForm />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-20 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You May Also Like</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover more insights and expert advice on studying abroad
              </p>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={mobile === "mobile" ? 1 : mobile === "tablet" ? 2 : 3}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {relatedPosts.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card
                    icons={item.icons}
                    title={item.title}
                    slug={item.slug}
                    description={item.intro}
                    image={item.img}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Enhanced CTA Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Our expert counselors can guide you through every step of the application process for studying in Germany
              and other countries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button text="Book a Free Consultation" />
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Post

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [data, datac] = await Promise.all([
    await supabase.from("categories").select("*"),
    await supabase.from("blog_posts").select("*,author!inner(*)").match({ slug: context.query.slug, isActive: true }),
  ])

  if (datac?.data?.length == 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  return { props: { data, datac } }
}