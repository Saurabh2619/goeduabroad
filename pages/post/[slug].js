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

    // Add scroll progress indicator with higher z-index
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

  // Enhanced comment form component with better focus handling
  const CommentForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Leave a Comment</h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            id="comment-name"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
            value={commentData.name}
            onChange={(e) => setCommentData((prev) => ({ ...prev, name: e.target.value }))}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="comment-text" className="block text-sm font-medium text-gray-700 mb-2">
            Your Comment *
          </label>
          <textarea
            id="comment-text"
            placeholder="Share your thoughts about this article..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all duration-200 text-base"
            value={commentData.comment}
            onChange={(e) => setCommentData((prev) => ({ ...prev, comment: e.target.value }))}
            autoComplete="off"
          />
        </div>
        <button
          onClick={addComment}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-base"
        >
          Submit Comment
        </button>
      </div>
    </div>
  )

  // Author section component
  const AuthorSection = () => (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-lg p-8 mt-12">
      <div className="flex items-center mb-4">
        <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <h3 className="text-xl font-bold text-red-700 uppercase tracking-wide">About the Author</h3>
      </div>
      <div className="flex items-start">
        <div className="relative">
          <img
            src={final.author.profile_image || "/placeholder.svg"}
            alt={final?.author?.fullname}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0"
          />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 border-3 border-white rounded-full flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="ml-6 flex-1">
          <h4 className="font-bold text-gray-900 text-xl mb-1">{final.author.fullname}</h4>
          <p className="text-base text-red-600 font-medium mb-3">{final.author.badge}</p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            {final.author.description ||
              "Expert education consultant specializing in international education and study abroad programs with years of experience helping students achieve their academic goals."}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Verified Education Expert
          </div>
        </div>
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

      {/* Reading progress bar with higher z-index */}
      <div className="fixed top-0 left-0 z-[9999] w-full h-1 bg-gray-200">
        <div
          id="reading-progress"
          className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300"
          style={{ width: "0%" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-28 sm:px-6 lg:px-8">
        <PopupLeadForm />

        {/* Hero section */}
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">{final.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
            <div className="flex items-center">
              <img
                src={final.author.profile_image || "/placeholder.svg"}
                alt={final?.author?.fullname}
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover mr-3"
              />
              <span className="font-medium">{final.author.fullname}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="flex flex-wrap gap-3 mb-10">
            {final.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 text-sm font-medium px-4 py-2 rounded-full border border-red-200"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Social share buttons */}

        {/* Main article content with enlarged text */}
        <div
          id="main-content"
          className="prose prose-xl max-w-none mb-16 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:text-xl prose-p:leading-relaxed prose-a:text-red-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed prose-li:marker:text-gray-800 prose-li:marker:font-semibold"
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
              font-size: 1.125rem;
              line-height: 1.75;
            }
            .article-content ol li {
              color: #374151;
              font-size: 1.125rem;
              line-height: 1.75;
            }
            .article-content p {
              font-size: 1.125rem;
              line-height: 1.75;
              margin-bottom: 1.5rem;
            }
            .article-content h2 {
              font-size: 1.875rem;
              margin-top: 2.5rem;
              margin-bottom: 1.25rem;
            }
            .article-content h3 {
              font-size: 1.5rem;
              margin-top: 2rem;
              margin-bottom: 1rem;
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

        {/* Author section moved to end */}
        <AuthorSection />

        {/* Comments section moved after author */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Comments ({comments?.length || 0})</h2>

          {comments && comments.length > 0 ? (
            <div className="space-y-6 mb-12">
              {comments
                .filter((i) => i.isApproved === true && !i.isReply) // Only show approved comments
                .map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold flex-shrink-0 text-lg">
                        {item?.user
                          ? item.user
                              .split(" ")
                              .map((i) => i.substring(0, 1))
                              .join("")
                          : ""}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-gray-900 text-lg">{item.user}</p>
                        <p className="text-gray-700 mt-2 text-base leading-relaxed">{item.text}</p>
                        <p className="text-sm text-gray-500 mt-3">{getDate(item.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg mb-12">
              <svg
                className="h-16 w-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}

          {/* Comment form */}
          <CommentForm />
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-20 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You May Also Like</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
