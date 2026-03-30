"use client"

import { useState } from "react"
import DefaultLayout from "../../layouts/DefaultLayout"
import Head from "next/head"
import { motion } from "framer-motion"
import axios from "axios"

// ─── Lead Submission ───────────────────────────────────────────────────────────
const sendLead = async (leadData) => {
  const { name, phone, neetScore, cityState, preferredCountry } = leadData
  if (!name || !phone) throw new Error("Name and phone are required.")
  try {
    const response = await axios.post("/api/sendlead", leadData, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  } catch (error) {
    console.error("Error sending lead:", error.response?.data || error.message)
    throw error
  }
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const WHY_CARDS = [
  { icon: "💰", title: "₹18–25 Lakh Total", desc: "Complete your entire 6-year MBBS in Kyrgyzstan for under ₹25 Lakhs — including tuition, hostel, and food. No hidden costs, no capitation, no donation." },
  { icon: "🏛️", title: "NMC & WHO Approved", desc: "All our partner universities in Kyrgyzstan are recognised by India's National Medical Commission and the World Health Organisation — your degree is fully valid for FMGE/NExT." },
  { icon: "🇬🇧", title: "100% English Medium", desc: "Every lecture, practical, and exam in Kyrgyzstan's top medical universities is conducted entirely in English. No IELTS required. No language barrier to worry about." },
  { icon: "📋", title: "Simple Admission", desc: "NEET qualification + 10+2 PCB with 50% marks is all you need. No separate entrance exams, no interviews, no donations. The process is transparent and straightforward." },
  { icon: "🌍", title: "Indian-Friendly Environment", desc: "Bishkek has one of the largest Indian medical student communities in Central Asia. Indian food is widely available, the city is safe, and the culture is warm and welcoming." },
  { icon: "🔬", title: "Strong Clinical Training", desc: "Hands-on clinical training in university-affiliated hospitals from Year 2 onwards. Focused FMGE/NExT preparation embedded in the curriculum from final year." },
]

const OVERVIEW_META = [
  { key: "Total Cost (6 Yrs)", val: "₹18–25 Lakhs" },
  { key: "Duration", val: "6 Years" },
  { key: "Medium of Instruction", val: "English" },
  { key: "IELTS / TOEFL", val: "Not Required" },
  { key: "NMC Recognition", val: "✅ Approved" },
  { key: "Intake", val: "September / October" },
]

const HIGHLIGHTS = [
  { icon: "🏥", title: "University Hospital Training", desc: "All major Kyrgyz medical universities have affiliated teaching hospitals with high patient volume — giving students real clinical exposure from early years." },
  { icon: "📚", title: "NMC-Aligned Curriculum", desc: "The MBBS curriculum in Kyrgyzstan is structured to align with NMC competency requirements, giving graduates a clear path to FMGE/NExT qualification." },
  { icon: "🍛", title: "Indian Community & Food", desc: "Bishkek has a thriving Indian student community. Indian restaurants, grocery stores, and cultural associations ensure students feel at home from day one." },
  { icon: "✈️", title: "Easy Connectivity to India", desc: "Direct and one-stop flights from Delhi, Mumbai, and other major Indian cities to Bishkek's Manas International Airport. Travel time under 5 hours." },
  { icon: "🔒", title: "Safe, Stable Country", desc: "Kyrgyzstan consistently ranks as one of the safest Central Asian countries for international students. Low crime, friendly locals, and stable governance." },
  { icon: "💵", title: "Lowest Cost of Living", desc: "Monthly living expenses in Bishkek average ₹12,000–18,000 — among the lowest of any MBBS abroad destination — making every rupee go further throughout your 6 years." },
]

const UNIVERSITIES_KG = [
  {
    num: "1", featured: true,
    name: "Bishkek International Medical Institute",
    tags: ["NMC", "WHO", "English", "★ EduAbroad Partner"],
    desc: "One of Kyrgyzstan's premier NMC-recognised medical universities, BIMI is renowned for its structured English-medium MBBS program, strong FMGE/NExT preparation support, and modern teaching infrastructure. The university's teaching hospital provides early clinical exposure that builds exam-ready doctors.",
    partner: true,
  },
  {
    num: "2", featured: false,
    name: "Osh State University — Medical Faculty",
    tags: ["NMC", "WHO", "English", "Govt."],
    desc: "A government university with decades of experience in medical education, Osh State University's medical faculty offers a well-structured, NMC-aligned MBBS program. Located in Osh — Kyrgyzstan's second-largest city — with strong clinical training facilities and an active Indian student association.",
  },
  {
    num: "3", featured: false,
    name: "International School of Medicine, Bishkek",
    tags: ["NMC", "WHO", "English"],
    desc: "ISM Bishkek is known for its modern campus, international faculty, and a globally-oriented medical curriculum. Affiliated with the University of Central Asia, it attracts students from across Asia and has a strong track record for FMGE pass rates among Indian graduates.",
  },
  {
    num: "4", featured: false,
    name: "Kyrgyz State Medical Academy",
    tags: ["NMC", "WHO", "Govt.", "English"],
    desc: "The oldest and most established medical institution in Kyrgyzstan, KSMA has been training doctors since 1939. A government institution with the highest clinical training exposure in the country, strong infrastructure, and NMC approval making it a reliable and respected choice.",
  },
]

const OTHER_COUNTRIES = [
  {
    flag: "🇷🇺", name: "Russia", subtitle: "Most Popular · 30+ Years Track Record",
    cost: "₹22–30 L total", duration: "6 Years", medium: "English",
    unis: [
      { name: "Orenburg State Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "Tver State Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "Perm State Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "Kursk State Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "Kazan Federal University", tags: ["NMC", "WHO", "Govt."] },
    ],
  },
  {
    flag: "🇬🇪", name: "Georgia", subtitle: "European Feel · Safe · Student-Friendly",
    cost: "₹30–40 L total", duration: "6 Years", medium: "English",
    unis: [
      { name: "SEU — Georgian National University", tags: ["NMC", "WHO", "English"] },
      { name: "SEU Avicenna Medical College", tags: ["NMC", "WHO", "English"] },
      { name: "East West University of Georgia", tags: ["NMC", "WHO", "English"] },
      { name: "Caucasus International University", tags: ["NMC", "WHO", "English"] },
    ],
  },
  {
    flag: "🇵🇱", name: "Poland", subtitle: "EU Degree · Central European Hub",
    cost: "₹40–55 L total", duration: "6 Years", medium: "English",
    unis: [
      { name: "Medical University of Gdańsk", tags: ["NMC", "WHO", "Public"] },
      { name: "Medical University of Warsaw", tags: ["NMC", "WHO", "Public"] },
      { name: "Jagiellonian University Medical College", tags: ["NMC", "WHO", "Public"] },
      { name: "Medical University of Wrocław", tags: ["NMC", "WHO", "Public"] },
    ],
  },
  {
    flag: "🇨🇳", name: "China", subtitle: "World-Class Infrastructure · Research-Driven",
    cost: "₹28–42 L total", duration: "6 Years", medium: "English",
    unis: [
      { name: "Zhejiang University School of Medicine", tags: ["NMC", "WHO", "English"] },
      { name: "Dalian Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "Nanjing Medical University", tags: ["NMC", "WHO", "English"] },
      { name: "China Medical University", tags: ["NMC", "WHO", "Govt."] },
    ],
  },
  {
    flag: "🇮🇹", name: "Italy", subtitle: "EU Standard · Public Universities · IMAT",
    cost: "₹35–50 L total", duration: "6 Years", medium: "IMAT Req.",
    unis: [
      { name: "University of Bologna", tags: ["WHO", "Public", "English"] },
      { name: "University of Milan (La Statale)", tags: ["WHO", "Public", "English"] },
      { name: "University of Padua", tags: ["WHO", "Public", "English"] },
      { name: "Sapienza University of Rome", tags: ["WHO", "Public", "English"] },
      { name: "University of Turin", tags: ["WHO", "Public", "English"] },
      { name: "University of Naples Federico II", tags: ["WHO", "Public", "English"] },
    ],
  },
]

const ELIGIBILITY = [
  { title: "NEET Qualified", desc: "A valid NEET score is mandatory as per NMC regulations for all Indian students seeking to study MBBS in Kyrgyzstan or any country abroad." },
  { title: "10+2 with PCB — 50% Marks", desc: "Physics, Chemistry & Biology in Class 12 with a minimum aggregate of 50% (40% for SC/ST/OBC as per reservation norms)." },
  { title: "Age: 17 Years or Above", desc: "Students must be at least 17 years of age on or before 31st December of the year of admission to Kyrgyzstan." },
  { title: "Valid Passport", desc: "A valid Indian passport with a minimum 18 months of validity at the time of application is required for Kyrgyzstan student visa processing." },
  { title: "Medical Fitness Certificate", desc: "A fitness certificate from a registered medical practitioner confirming the student is in good health — required by Kyrgyz university admissions." },
  { title: "No IELTS / TOEFL Required", desc: "Kyrgyz medical universities conduct classes entirely in English and do not require IELTS or TOEFL scores for Indian student admissions." },
]

const PROCESS_STEPS = [
  { num: "1", title: "Free Counselling Session", desc: "We assess your NEET score, budget, and state to recommend the right Kyrgyzstan university — with priority BIMI seats for students from UP, MP, and Uttarakhand." },
  { num: "2", title: "University Application", desc: "We prepare and submit your complete application directly to our partner Kyrgyzstan university — including BIMI for partnered state students." },
  { num: "3", title: "Offer Letter & Fee Payment", desc: "Receive your official offer letter within 7–10 days. We guide you through structured fee payment and transparent cost planning for all 6 years." },
  { num: "4", title: "Kyrgyzstan Visa & Travel", desc: "Our team handles your Kyrgyzstan student visa documentation end-to-end, travel booking, and a detailed pre-departure orientation session." },
  { num: "5", title: "On-Ground Support in Bishkek", desc: "Airport pickup, university registration, hostel setup, and ongoing support throughout your 6 years — including FMGE/NExT preparation guidance in final year." },
]

const COMPARE_ROWS = [
  { label: "Total Cost", india: { val: "₹80 L – ₹1.5 Crore", note: "Tuition + capitation + management quota fees over 5.5 years", bad: true }, abroad: { val: "₹18 L – ₹55 Lakhs", note: "All-inclusive over 6 years depending on country; Kyrgyzstan from ₹18L", good: true } },
  { label: "Seats & Competition", india: { val: "20 Lakh+ compete for ~1 Lakh seats", note: "Acceptance rate under 5% in government colleges", bad: true }, abroad: { val: "Open admissions with NEET + PCB 50%", note: "No rank cut-offs, no management quota battles", good: true } },
  { label: "Hidden Fees", india: { val: "Donations up to ₹50–80 Lakhs", note: "Unofficial capitation fees are common in private colleges", bad: true }, abroad: { val: "Zero. No capitation, no donation", note: "Fee structure is fixed, transparent, and published upfront", good: true } },
  { label: "Duration", india: { val: "5.5 Years", note: "Plus 1 year mandatory rotating internship" }, abroad: { val: "6 Years", note: "Internship can be completed in India after returning" } },
  { label: "Degree Validity", india: { val: "India only", note: "Degree valid in India; additional exams needed for global practice" }, abroad: { val: "India + Global (NMC + WHO recognised)", note: "Valid for FMGE/NExT in India; pathway to practice in USA, UK, EU", good: true } },
  { label: "Admission Stress", india: { val: "Extreme stress, high rejection risk", note: "NEET rank pressure, limited seats, repeated attempts common", bad: true }, abroad: { val: "Simple, merit-based, stress-free", note: "NEET + documents — offer letter in 7–15 days, no repeat attempts", good: true } },
  { label: "Global Exposure", india: { val: "Single-country exposure", note: "Classmates from same region; limited global network" }, abroad: { val: "50+ nationalities in class", note: "Global medical network, international clinical mindset from day one", good: true } },
]

// ─── Tag style helper ──────────────────────────────────────────────────────────
const tagStyle = (tag) => {
  if (tag.includes("NMC")) return { background: "rgba(0,160,80,0.1)", color: "#15803d", border: "1px solid rgba(0,160,80,0.2)" }
  if (tag.includes("WHO")) return { background: "rgba(29,78,216,0.08)", color: "#1d4ed8", border: "1px solid rgba(29,78,216,0.18)" }
  if (tag.includes("English")) return { background: "rgba(180,120,0,0.08)", color: "#92600a", border: "1px solid rgba(180,120,0,0.2)" }
  if (tag.includes("Govt") || tag.includes("Public")) return { background: "rgba(175,1,0,0.08)", color: "#af0100", border: "1px solid rgba(175,1,0,0.18)" }
  if (tag.includes("Partner") || tag.includes("★")) return { background: "rgba(175,1,0,0.1)", color: "#8b0000", border: "1px solid rgba(175,1,0,0.3)", fontWeight: 700 }
  return { background: "rgba(13,27,62,0.06)", color: "#2a3550", border: "1px solid rgba(13,27,62,0.12)" }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function KyrgyzstanMBBS() {
  const [formData, setFormData] = useState({ name: "", phone: "", neetScore: "", cityState: "", preferredCountry: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")
    try {
      await sendLead(formData)
      setSubmitMessage("Thank you! Our counsellor will reach out within 2 hours.")
      setFormData({ name: "", phone: "", neetScore: "", cityState: "", preferredCountry: "" })
    } catch {
      setSubmitMessage("Sorry, there was an error. Please try again or WhatsApp us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>MBBS in Kyrgyzstan | EduAbroad — Study Medicine in Central Asia</title>
        <meta name="description" content="Pursue MBBS in Kyrgyzstan at NMC-approved universities. English medium, affordable fees from ₹18–25 Lakhs. Direct partner with Bishkek International Medical Institute for UP, MP & Uttarakhand." />
        {/* Fonts loaded via _document.js — see instructions below */}
      </Head>

      <DefaultLayout hideAI={true} navbar>
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#2a3550", overflowX: "hidden" }}>

          {/* ── HERO ─────────────────────────────────────────────────────────── */}
          <section style={{
            minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
            alignItems: "center", padding: "120px 6vw 80px", gap: "60px",
            background: "#0d1b3e", position: "relative", overflow: "hidden",
          }}>
            {/* radial glow */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(175,1,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Left — text */}
            <motion.div {...fadeUp}>
              {/* tag */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ffaaaa", marginBottom: 28 }}>
                <span style={{ display: "block", width: 28, height: 1, background: "#ffaaaa" }} />
                EduAbroad — MBBS Abroad Counselling · 8 Countries
              </div>

              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.1, color: "#ffffff", marginBottom: 24 }}>
                MBBS in<br />
                <em style={{ fontStyle: "italic", color: "#ff9090" }}>Kyrgyzstan</em><br />
                &amp; Beyond
              </h1>

              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
                We counsel students for MBBS across 8 countries — Russia, Georgia, Italy, Poland, China, Kazakhstan, Uzbekistan, and Kyrgyzstan. We hold a direct institutional partnership with Bishkek International Medical Institute, giving students from UP, MP &amp; Uttarakhand priority access.
              </p>

              {/* Partner banner */}
              <div style={{ background: "rgba(175,1,0,0.06)", border: "1px solid rgba(175,1,0,0.3)", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#af0100" }} />
                <span style={{ fontSize: "1.6rem" }}>🤝</span>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#af0100", marginBottom: 4 }}>★ Official EduAbroad Partner University</div>
                  <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", fontWeight: 600, marginBottom: 6 }}>Bishkek International Medical Institute</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Uttar Pradesh", "Madhya Pradesh", "Uttarakhand"].map((s) => (
                      <span key={s} style={{ padding: "2px 10px", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(175,1,0,0.25)", color: "#ffb3b3", border: "1px solid rgba(175,1,0,0.4)", borderRadius: 2 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                <motion.a href="#enquire" whileHover={{ translateY: -2 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#af0100", color: "#fff", padding: "14px 32px", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
                  Get Free Counselling
                </motion.a>
                <motion.a href="#universities" whileHover={{ borderColor: "rgba(255,255,255,0.7)", color: "#fff" }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "rgba(255,255,255,0.85)", padding: "14px 32px", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", marginLeft: 16 }}>
                  View Universities
                </motion.a>
              </div>
            </motion.div>

            {/* Right — stats grid */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
              {[
                { num: "₹25", suffix: "L", label: "Max. Total Cost (6 Yrs)" },
                { num: "4", suffix: "+", label: "NMC-Approved Universities" },
                { num: "6", suffix: "yr", label: "Full Program Duration" },
                { num: "₹", suffix: "0", label: "Donation / Capitation Fees" },
              ].map((s) => (
                <motion.div key={s.label} whileHover="hover" initial="rest" variants={{ rest: {}, hover: {} }}
                  style={{ background: "rgba(255,255,255,0.07)", padding: "32px 28px", position: "relative", cursor: "default" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>
                    <span style={{ color: s.suffix === "₹" ? "#ff9090" : "#ffffff" }}>{s.num}</span><span style={{ color: s.suffix === "₹" ? "#ffffff" : "#ff9090" }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
                  {/* hover underline via motion */}
                  <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.35 }}
                    style={{ position: "absolute", bottom: 0, left: 28, right: 28, height: 2, background: "#af0100", transformOrigin: "left" }} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── COUNTRIES STRIP ──────────────────────────────────────────────── */}
          <div style={{ background: "#fff", borderTop: "1px solid rgba(13,27,62,0.1)", borderBottom: "1px solid rgba(13,27,62,0.1)", padding: "36px 6vw", boxShadow: "0 2px 12px rgba(13,27,62,0.05)" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b7a99", marginBottom: 20, display: "block" }}>
              We counsel for MBBS across 8 countries — find the right fit for your profile &amp; budget
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { flag: "🇰🇬", name: "Kyrgyzstan", featured: true },
                { flag: "🇷🇺", name: "Russia" }, { flag: "🇬🇪", name: "Georgia" },
                { flag: "🇮🇹", name: "Italy" }, { flag: "🇵🇱", name: "Poland" },
                { flag: "🇨🇳", name: "China" }, { flag: "🇰🇿", name: "Kazakhstan" },
                { flag: "🇺🇿", name: "Uzbekistan" },
              ].map((c) => (
                <motion.a key={c.name} href="#enquire" whileHover={{ boxShadow: "0 2px 8px rgba(13,27,62,0.08)" }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                    background: c.featured ? "rgba(175,1,0,0.06)" : "#f4f7fc",
                    border: c.featured ? "1px solid rgba(175,1,0,0.4)" : "1px solid rgba(13,27,62,0.1)",
                    fontSize: "0.83rem", fontWeight: 500, color: "#2a3550", textDecoration: "none",
                  }}>
                  <span style={{ fontSize: "1.1rem" }}>{c.flag}</span>
                  <span>{c.name}</span>
                  {c.featured && <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#af0100", background: "rgba(175,1,0,0.1)", padding: "2px 6px", borderRadius: 2 }}>★ Partner</span>}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── WHY KYRGYZSTAN ───────────────────────────────────────────────── */}
          <section id="why" style={{ padding: "100px 6vw", background: "#f4f7fc" }}>
            <motion.div {...fadeUp} style={{ maxWidth: 560, marginBottom: 64 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>Why Kyrgyzstan</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15 }}>
                Why Kyrgyzstan is Our Most Recommended Destination Right Now
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#6b7a99", marginTop: 16, lineHeight: 1.7 }}>
                Of all the 8 countries we counsel for, Kyrgyzstan consistently offers the best value — NMC-approved, English-medium, and under ₹25 Lakhs total.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(13,27,62,0.1)" }}>
              {WHY_CARDS.map((card) => (
                <motion.div key={card.title} variants={fadeUp}
                  whileHover={{ backgroundColor: "#f0f4ff", boxShadow: "inset 0 0 0 1px rgba(13,27,62,0.12)" }}
                  style={{ background: "#ffffff", padding: "40px 32px", cursor: "default", transition: "background 0.25s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 2, background: "rgba(175,1,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.3rem" }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#0d1b3e", marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#6b7a99", lineHeight: 1.7 }}>{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── COUNTRY OVERVIEW ─────────────────────────────────────────────── */}
          <section id="overview" style={{ padding: "100px 6vw", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              {/* Left */}
              <motion.div {...fadeUp}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                  <span style={{ fontSize: "3.2rem" }}>🇰🇬</span>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#0d1b3e", lineHeight: 1 }}>Kyrgyzstan</div>
                    <div style={{ fontSize: "0.8rem", color: "#af0100", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Central Asia · EduAbroad Partner Country</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.95rem", color: "#6b7a99", lineHeight: 1.85, marginBottom: 32 }}>
                  Kyrgyzstan is one of Central Asia's most affordable and welcoming MBBS destinations for Indian students. Located in the heart of Central Asia with the majestic Tian Shan mountains as a backdrop, the country offers a peaceful, student-focused environment. Bishkek — the capital — is a modern, safe city with a large Indian student community, Indian restaurants, and easy connectivity to India.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                  {OVERVIEW_META.map((m) => (
                    <div key={m.key} style={{ background: "#fff", border: "1px solid rgba(13,27,62,0.1)", padding: "16px 18px", boxShadow: "0 1px 6px rgba(13,27,62,0.05)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{m.key}</div>
                      <div style={{ fontSize: "0.95rem", color: "#0d1b3e", fontWeight: 600 }}>{m.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "24px 28px", background: "rgba(175,1,0,0.07)", borderLeft: "3px solid #af0100" }}>
                  <p style={{ fontSize: "0.9rem", color: "#2a3550", lineHeight: 1.75 }}>
                    <strong style={{ color: "#af0100" }}>Bottom line:</strong> Kyrgyzstan delivers the NMC-approved, English-medium MBBS experience at the lowest total cost of any reputable destination — making it the smartest choice for budget-conscious Indian families who refuse to compromise on quality.
                  </p>
                </div>
              </motion.div>

              {/* Right */}
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", display: "block", marginBottom: 24 }}>What Makes Kyrgyzstan Stand Out</span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {HIGHLIGHTS.map((h, i) => (
                    <li key={h.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 0", borderBottom: i < HIGHLIGHTS.length - 1 ? "1px solid rgba(13,27,62,0.1)" : "none" }}>
                      <div style={{ width: 36, height: 36, minWidth: 36, borderRadius: 2, background: "rgba(175,1,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{h.icon}</div>
                      <div>
                        <h4 style={{ fontSize: "0.92rem", color: "#0d1b3e", fontWeight: 600, marginBottom: 4 }}>{h.title}</h4>
                        <p style={{ fontSize: "0.82rem", color: "#6b7a99", lineHeight: 1.6, margin: 0 }}>{h.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ── UNIVERSITIES IN KYRGYZSTAN ───────────────────────────────────── */}
          <section id="universities" style={{ padding: "80px 6vw 100px", background: "#eaeff8" }}>
            <motion.div {...fadeUp} style={{ maxWidth: 560, marginBottom: 56 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>Partner Universities</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15 }}>NMC-Approved Universities<br />in Kyrgyzstan</h2>
              <p style={{ fontSize: "0.95rem", color: "#6b7a99", marginTop: 16, lineHeight: 1.7 }}>
                All universities listed are recognised by India's NMC and the WHO. EduAbroad holds a direct institutional partnership with Bishkek International Medical Institute.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {UNIVERSITIES_KG.map((u) => (
                <motion.div key={u.name} whileHover={{ translateY: -3, boxShadow: "0 8px 28px rgba(13,27,62,0.1)" }}
                  style={{
                    background: u.featured ? "linear-gradient(135deg, rgba(175,1,0,0.04) 0%, #ffffff 60%)" : "#ffffff",
                    border: u.featured ? "1px solid rgba(175,1,0,0.35)" : "1px solid rgba(13,27,62,0.1)",
                    padding: "32px 28px", position: "relative",
                    boxShadow: "0 2px 12px rgba(13,27,62,0.06)",
                  }}>
                  {u.featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#af0100" }} />}
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "rgba(13,27,62,0.08)", fontStyle: "italic", lineHeight: 1, position: "absolute", top: 20, right: 24 }}>{u.num}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#0d1b3e", marginBottom: 12, lineHeight: 1.3, paddingRight: 48 }}>{u.name}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {u.tags.map((t) => (
                      <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: "3px 8px", borderRadius: 2, ...tagStyle(t) }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6b7a99", lineHeight: 1.65, margin: 0 }}>{u.desc}</p>
                  {u.partner && (
                    <div style={{ marginTop: 20, padding: "20px 22px", background: "rgba(175,1,0,0.05)", border: "1px dashed rgba(175,1,0,0.3)" }}>
                      <div style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#af0100", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>★ Official EduAbroad Direct Partnership</div>
                      <p style={{ fontSize: "0.82rem", color: "#6b7a99", lineHeight: 1.65, margin: "0 0 12px" }}>
                        EduAbroad holds a <strong style={{ color: "#2a3550" }}>direct institutional partnership</strong> with BIMI — giving students from select states exclusive access to <strong style={{ color: "#2a3550" }}>priority seat allocation, dedicated counsellor support, assisted documentation, and on-ground liaison</strong> throughout the 6-year program.
                      </p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["Uttar Pradesh", "Madhya Pradesh", "Uttarakhand"].map((s) => (
                          <span key={s} style={{ padding: "4px 14px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(175,1,0,0.08)", color: "#af0100", border: "1px solid rgba(175,1,0,0.25)", borderRadius: 2 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── OTHER COUNTRIES ──────────────────────────────────────────────── */}
          <section id="other-universities" style={{ padding: "100px 6vw", background: "#eaeff8" }}>
            <motion.div {...fadeUp} style={{ maxWidth: 700, marginBottom: 56 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>All Destinations</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15 }}>Universities Across All 8 Countries We Counsel For</h2>
              <p style={{ fontSize: "0.95rem", color: "#6b7a99", marginTop: 16, lineHeight: 1.7 }}>
                EduAbroad guides students to NMC-approved, WHO-recognised universities across 8 countries. Here are the institutions we actively counsel for — find the right fit for your profile and budget.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(13,27,62,0.1)" }}>
              {OTHER_COUNTRIES.map((country) => (
                <div key={country.name} style={{ background: "#ffffff", padding: "36px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(13,27,62,0.1)" }}>
                    <span style={{ fontSize: "1.8rem" }}>{country.flag}</span>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#0d1b3e", fontWeight: 600 }}>{country.name}</div>
                      <div style={{ fontSize: "0.68rem", color: "#af0100", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{country.subtitle}</div>
                    </div>
                  </div>
                  <div>
                    {country.unis.map((u, i) => (
                      <div key={u.name} style={{ padding: "12px 0", borderBottom: i < country.unis.length - 1 ? "1px solid rgba(13,27,62,0.1)" : "none" }}>
                        <div style={{ fontSize: "0.88rem", color: "#0d1b3e", fontWeight: 500, marginBottom: 6 }}>{u.name}</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {u.tags.map((t) => (
                            <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: "3px 8px", borderRadius: 2, ...tagStyle(t) }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 14, borderTop: "1px solid rgba(13,27,62,0.1)", fontSize: "0.75rem", color: "#6b7a99", fontWeight: 500, marginTop: 4 }}>
                    <span>💰 {country.cost}</span>
                    <span>⏱ {country.duration}</span>
                    <span>🗣 {country.medium}</span>
                  </div>
                </div>
              ))}

              {/* Uzbekistan + Kazakhstan combined cell */}
              <div style={{ background: "#ffffff", padding: "36px 32px", display: "flex", flexDirection: "column", gap: 32 }}>
                {[
                  { flag: "🇺🇿", name: "Uzbekistan", subtitle: "Most Affordable · Rising Fast", cost: "₹18–24 L total", duration: "6 Years", unis: ["Samarkand State Medical University", "Tashkent Medical Academy", "Bukhara State Medical Institute"] },
                  { flag: "🇰🇿", name: "Kazakhstan", subtitle: "Affordable · Govt. Universities · Stable", cost: "₹20–28 L total", duration: "5–6 Years", unis: ["Kazakh National Medical University", "Al-Farabi Kazakh National University", "Astana Medical University"] },
                ].map((c, ci) => (
                  <div key={c.name} style={ci > 0 ? { borderTop: "1px solid rgba(13,27,62,0.1)", paddingTop: 28 } : {}}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(13,27,62,0.1)" }}>
                      <span style={{ fontSize: "1.8rem" }}>{c.flag}</span>
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#0d1b3e", fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: "0.68rem", color: "#af0100", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{c.subtitle}</div>
                      </div>
                    </div>
                    {c.unis.map((u, i) => (
                      <div key={u} style={{ padding: "12px 0", borderBottom: i < c.unis.length - 1 ? "1px solid rgba(13,27,62,0.1)" : "none" }}>
                        <div style={{ fontSize: "0.88rem", color: "#0d1b3e", fontWeight: 500, marginBottom: 6 }}>{u}</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {["NMC", "WHO", "Govt."].map((t) => (
                            <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: "3px 8px", borderRadius: 2, ...tagStyle(t) }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 14, borderTop: "1px solid rgba(13,27,62,0.1)", fontSize: "0.75rem", color: "#6b7a99", fontWeight: 500, marginTop: 4 }}>
                      <span>💰 {c.cost}</span><span>⏱ {c.duration}</span><span>🗣 English</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: "0.78rem", color: "#6b7a99", marginTop: 20, textAlign: "center" }}>
              Not sure which country suits your NEET score and budget? Our counsellors will guide you to the right fit — free of charge.{" "}
              <a href="#enquire" style={{ color: "#af0100", textDecoration: "none", fontWeight: 600, marginLeft: 6 }}>Book a session →</a>
            </p>
          </section>

          {/* ── ELIGIBILITY & PROCESS ────────────────────────────────────────── */}
          <section id="eligibility" style={{ background: "#eaeff8", padding: "100px 6vw", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -20, top: 40, fontFamily: "'Playfair Display', serif", fontSize: "8rem", color: "rgba(13,27,62,0.04)", fontWeight: 700, whiteSpace: "nowrap", pointerEvents: "none" }}>KYRGYZSTAN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              {/* Eligibility */}
              <motion.div {...fadeUp}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>Who Can Apply</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15, marginBottom: 40 }}>Eligibility for MBBS in Kyrgyzstan</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {ELIGIBILITY.map((e, i) => (
                    <li key={e.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: i < ELIGIBILITY.length - 1 ? "1px solid rgba(13,27,62,0.1)" : "none" }}>
                      <div style={{ width: 22, height: 22, minWidth: 22, background: "#af0100", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#fff", marginTop: 1 }}>✓</div>
                      <div>
                        <h4 style={{ fontSize: "0.95rem", color: "#0d1b3e", fontWeight: 600, marginBottom: 4 }}>{e.title}</h4>
                        <p style={{ fontSize: "0.83rem", color: "#6b7a99", lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Process */}
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>How It Works</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15, marginBottom: 40 }}>Our Kyrgyzstan Admission Process</h2>
                {PROCESS_STEPS.map((s, i) => (
                  <div key={s.num} style={{ display: "flex", gap: 20, padding: "24px 0", borderBottom: i < PROCESS_STEPS.length - 1 ? "1px solid rgba(13,27,62,0.1)" : "none" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#af0100", fontStyle: "italic", lineHeight: 1, minWidth: 32, marginTop: 2 }}>{s.num}</div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", color: "#0d1b3e", fontWeight: 600, marginBottom: 6 }}>{s.title}</h4>
                      <p style={{ fontSize: "0.83rem", color: "#6b7a99", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── INDIA VS ABROAD ──────────────────────────────────────────────── */}
          <section id="compare-india" style={{ padding: "100px 6vw", background: "#f4f7fc", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: -10, bottom: 20, fontFamily: "'Playfair Display', serif", fontSize: "7rem", color: "rgba(13,27,62,0.04)", fontWeight: 700, whiteSpace: "nowrap", pointerEvents: "none" }}>INDIA vs ABROAD</div>
            <motion.div {...fadeUp} style={{ maxWidth: 560, marginBottom: 56 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#af0100", marginBottom: 16, display: "block" }}>India vs Abroad</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#0d1b3e", lineHeight: 1.15 }}>MBBS in India vs<br />MBBS Abroad — The Real Picture</h2>
              <p style={{ fontSize: "0.95rem", color: "#6b7a99", marginTop: 16, lineHeight: 1.7 }}>Before you decide, see what the numbers and ground realities actually say. No bias — just facts.</p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", border: "1px solid rgba(13,27,62,0.1)", boxShadow: "0 4px 24px rgba(13,27,62,0.08)" }}>
              {/* India col */}
              <div>
                <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: 14, background: "#eef1f8", borderBottom: "1px solid rgba(13,27,62,0.1)" }}>
                  <span style={{ fontSize: "2rem" }}>🇮🇳</span>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#0d1b3e", lineHeight: 1 }}>MBBS in India</div>
                    <div style={{ fontSize: "0.72rem", color: "#6b7a99", marginTop: 3, letterSpacing: "0.04em" }}>Private Medical Colleges · 2026 Reality</div>
                  </div>
                </div>
                {COMPARE_ROWS.map((row) => (
                  <div key={row.label} style={{ padding: "20px 32px", borderBottom: "1px solid rgba(13,27,62,0.1)", background: "#fff", minHeight: 72, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.4, color: row.india.bad ? "#c0392b" : "#6b7a99" }}>{row.india.val}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7a99", marginTop: 4, lineHeight: 1.5 }}>{row.india.note}</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: "flex", flexDirection: "column", background: "#eef1f8", borderLeft: "1px solid rgba(13,27,62,0.1)", borderRight: "1px solid rgba(13,27,62,0.1)", width: 110 }}>
                <div style={{ height: 97, borderBottom: "1px solid rgba(13,27,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#6b7a99", fontStyle: "italic" }}>vs</span>
                </div>
                {COMPARE_ROWS.map((row) => (
                  <div key={row.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 72, borderBottom: "1px solid rgba(13,27,62,0.1)", padding: 8, textAlign: "center" }}>
                    <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0d1b3e", fontWeight: 700, lineHeight: 1.4 }}>{row.label}</span>
                  </div>
                ))}
              </div>

              {/* Abroad col */}
              <div>
                <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: 14, background: "rgba(175,1,0,0.07)", borderBottom: "1px solid rgba(175,1,0,0.15)" }}>
                  <span style={{ fontSize: "2rem" }}>🌍</span>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#0d1b3e", lineHeight: 1 }}>MBBS Abroad</div>
                    <div style={{ fontSize: "0.72rem", color: "#8b4a00", marginTop: 3, letterSpacing: "0.04em" }}>NMC-Approved · Russia, Georgia, Kyrgyzstan &amp; More</div>
                  </div>
                </div>
                {COMPARE_ROWS.map((row) => (
                  <div key={row.label} style={{ padding: "20px 32px", borderBottom: "1px solid rgba(13,27,62,0.1)", background: row.abroad.good ? "rgba(0,160,80,0.04)" : "rgba(175,1,0,0.03)", minHeight: 72, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.4, color: row.abroad.good ? "#166534" : "#6b7a99" }}>{row.abroad.val}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7a99", marginTop: 4, lineHeight: 1.5 }}>{row.abroad.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: "0.78rem", color: "#6b7a99", marginTop: 20, textAlign: "center", lineHeight: 1.6 }}>
              * India fee data based on average private medical college costs 2025–26. Abroad data based on EduAbroad partner universities. Government MBBS seats in India are excellent but extremely limited — this comparison refers to the private college route most students end up taking.
            </p>
          </section>

          {/* ── CTA / ENQUIRY FORM ───────────────────────────────────────────── */}
          <section id="enquire" style={{ padding: "100px 6vw", background: "#0d1b3e", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <motion.div {...fadeUp}>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ffaaaa", marginBottom: 20, display: "block" }}>Free Counselling — MBBS Abroad</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "#ffffff", lineHeight: 1.15, marginBottom: 20 }}>
                Begin Your Journey of<br />
                <em style={{ fontStyle: "italic", color: "#af0100" }}>Becoming a Global Citizen as a Doctor</em>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 24 }}>
                Our counsellors — alumni of Harvard, Cambridge &amp; IIMs — have guided thousands of students to NMC-approved medical universities across 8 countries. Students from{" "}
                <strong style={{ color: "#ffffff", fontWeight: 700 }}>Uttar Pradesh, Madhya Pradesh, and Uttarakhand</strong>{" "}
                get direct priority access to Bishkek International Medical Institute through our exclusive partnership. Your first session is completely free.
              </p>
              <p style={{ fontSize: "0.85rem", color: "#6b7a99", lineHeight: 1.8 }}>
                📍 Serving students across India &nbsp;|&nbsp; WhatsApp response within 2 hours
              </p>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Student Name" required
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" }} />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone / WhatsApp" required
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <input type="text" name="neetScore" value={formData.neetScore} onChange={handleInputChange} placeholder="NEET Score"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" }} />
                  <input type="text" name="cityState" value={formData.cityState} onChange={handleInputChange} placeholder="City / State"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" }} />
                </div>
                <select name="preferredCountry" value={formData.preferredCountry} onChange={handleInputChange}
                  style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none", cursor: "pointer", appearance: "none", marginBottom: 12 }}>
                  <option value="" disabled>Preferred Country / University</option>
                  <option value="kyrgyzstan-bimi">Kyrgyzstan — Bishkek International Medical Institute (EduAbroad Partner)</option>
                  <option value="kyrgyzstan-other">Kyrgyzstan — Other University</option>
                  <option value="russia">Russia</option>
                  <option value="georgia">Georgia</option>
                  <option value="italy">Italy</option>
                  <option value="poland">Poland</option>
                  <option value="china">China</option>
                  <option value="kazakhstan">Kazakhstan</option>
                  <option value="uzbekistan">Uzbekistan</option>
                  <option value="guidance">Not Sure Yet — Need Guidance</option>
                </select>
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ backgroundColor: "#c90200" }} whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", padding: 16, background: "#af0100", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}>
                  {isSubmitting ? "Submitting..." : "Book Free Counselling for MBBS Abroad →"}
                </motion.button>
                {submitMessage && (
                  <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 4, background: submitMessage.includes("Thank you") ? "rgba(0,160,80,0.15)" : "rgba(175,1,0,0.15)", color: submitMessage.includes("Thank you") ? "#86efac" : "#fca5a5", fontSize: "0.85rem", textAlign: "center" }}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </motion.div>
          </section>

          {/* ── FOOTER ───────────────────────────────────────────────────────── */}
          <footer style={{ padding: "40px 6vw", background: "#0d1b3e", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#ffffff" }}>EduAbroad</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginTop: 6 }}>Harvard–Cambridge &amp; IIM Alumni Run · Official Cambridge IELTS Learning Partner</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>2,000+ Universities · 30+ Countries · 1,50,000+ Courses · 20+ Years Experience</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: 4 }}>© 2026 EduAbroad. All rights reserved.</div>
            </div>
          </footer>

        </div>
      </DefaultLayout>
    </>
  )
}