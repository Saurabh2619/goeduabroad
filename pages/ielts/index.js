import { Spacer, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import IeltsResult from "../success-stories/ieltsresult";
import "tailwindcss/tailwind.css";

export default function IELTSMasterclass() {
  const benefits = [
    "Live interaction with top IELTS educators",
    "New topics covered daily",
    "Proven strategies used by 8+ Band achievers",
    "Exciting free giveaways in each class"
  ];

  const contentImages = [
    {
      url: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1764051384/indian_girrl_n1urlr.png",
      title: "Expert-Led Sessions",
      description: "Learn from trainers with IIM, Cambridge, and MIT experience"
    },
    {
      url: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1764051381/ielts_testimonial_1_uv6cny.png",
      title: "Structured Learning",
      description: "Comprehensive module-wise breakdown for all four sections"
    },
    {
      url: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1764051382/ChatGPT_Image_May_24_2025_12_04_54_PM_d5nlm1.png",
      title: "Practice Materials",
      description: "Access templates, worksheets, and curated resources"
    },
    {
      url: "https://res.cloudinary.com/duyo9pzxy/image/upload/v1764051380/envato-labs-image-edit_78_uaezrk.png",
      title: "Community Support",
      description: "Join 500+ motivated learners from across India"
    }
  ];

  const features = [
    {
      icon: "👥",
      title: "500+ Learners",
      description: "Join our growing community"
    },
    {
      icon: "🎯",
      title: "90% Achieve 7+ Bands",
      description: "Result-driven frameworks"
    },
    {
      icon: "⭐",
      title: "4.5/5 Rating",
      description: "Highly rated by students"
    },
    {
      icon: "🎥",
      title: "Lifetime Access",
      description: "Review recordings anytime"
    }
  ];

  const modules = [
    {
      title: "Listening",
      icon: "🎧",
      description: "Master techniques to capture key information and improve accuracy in all listening question types with proven strategies."
    },
    {
      title: "Reading",
      icon: "📖",
      description: "Learn time-management strategies and methods to tackle complex passages with confidence and precision."
    },
    {
      title: "Writing",
      icon: "✍️",
      description: "Develop structured responses for Task 1 and Task 2 with clear templates and insider scoring insights."
    },
    {
      title: "Speaking",
      icon: "🗣️",
      description: "Build fluency and coherence with practical strategies for all three speaking parts and confidence-building techniques."
    }
  ];

  const faqs = [
    {
      question: "What is an EduAbroad Masterclass?",
      answer: "A high-impact, expert-led session designed to help you understand IELTS modules, scoring logic, and practical strategies to improve performance."
    },
    {
      question: "How do I attend the session?",
      answer: "Register online, and you will receive the joining link via email or SMS."
    },
    {
      question: "What is the duration of each Masterclass?",
      answer: "Most sessions run for 60-90 minutes, depending on content depth and Q&A engagement."
    },
    {
      question: "Are recordings available?",
      answer: "Yes. You will have lifetime access to all Masterclass recordings for continued learning."
    },
    {
      question: "Is the Masterclass suitable for beginners?",
      answer: "Absolutely. Sessions introduce foundational concepts and progressively build towards advanced techniques."
    },
    {
      question: "How does the Masterclass differ from IELTS Plus Program?",
      answer: "Masterclasses are affordable, introductory learning sessions at just ₹49. IELTS Plus is a premium, comprehensive program offering in-depth instruction, personalized guidance, and structured assessments."
    }
  ];

  const handleEnrollClick = () => {
    window.open('https://rzp.io/rzp/gqOnTLIN', '_blank');
  };

  return (
    <DefaultLayout>
      <Spacer y={48} />

      <div className="w-full h-auto flex flex-col items-start justify-start">
        <div className="mx-auto max-w-[95%] md:max-w-[85%] w-full">

          {/* Hero Section with Primary Background */}
          <div className="bg-gradient-to-br from-primary via-primary to-red-800 text-white rounded-3xl p-6 md:p-10 mb-12 shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-1 md:gap-2 items-center">
              {/* Left side - Text content */}
              <div className="text-center md:text-left order-2 md:order-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3">
                  IELTS MasterClasses at Just ₹49
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-sans mb-1 opacity-95">
                  500+ Students Enrolled. Limited Seats Only.
                </p>
                <p className="text-sm sm:text-base md:text-lg mb-6 opacity-90">
                  Led by Expert Trainers from IIM, Cambridge & MIT
                </p>
                
                <div className="max-w-3xl mx-auto md:mx-0 mb-6">
                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-3 hover:bg-white/20 transition-all"
                      >
                        <div className="text-xl sm:text-2xl mb-1">{feature.icon}</div>
                        <h3 className="font-bold text-sm sm:text-lg mb-0.5">{feature.title}</h3>
                        <p className="text-sm opacity-90">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button
                  size="lg"
                  onClick={handleEnrollClick}
                  className="bg-white text-primary font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 hover:shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  Enroll Now at ₹49 Only
                </Button>
                <p className="text-xs sm:text-sm mt-3 opacity-80">
                  🎁 Get exclusive practice materials & templates as giveaways
                </p>
              </div>

              {/* Right side - Image */}
              <div className="order-1 md:order-2 flex justify-center md:justify-end -mr-0 md:-mr-1">
                <img
                  src="https://res.cloudinary.com/duyo9pzxy/image/upload/v1764570268/IELTS_GIRL_wwbqvu.png"
                  alt="IELTS Student"
                  className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-sm lg:max-w-md h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* What You Get Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
              What You'll Get in Our Masterclasses
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <span className="text-green-600 text-3xl mr-4">✓</span>
                  <p className="text-lg font-medium text-gray-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modules Covered Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-3">
              <span className="bg-gradient-to-r from-primary to-red-900 bg-clip-text text-transparent">
                All 4 IELTS Modules Covered
              </span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
              Comprehensive training for Listening, Reading, Writing, and Speaking with module-specific strategies
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module, index) => (
                <Card key={index} className="font-sans hover:shadow-xl transition-all hover:-translate-y-2 border-t-4 border-primary">
                  <CardBody className="p-6">
                    <div className="text-5xl mb-4 text-center">{module.icon}</div>
                    <h3 className="text-2xl font-bold text-primary mb-3 text-center">{module.title}</h3>
                    <p className="text-gray-600 text-center">{module.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
              Bonus Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start bg-white rounded-xl p-6 shadow-md">
                <span className="text-primary text-3xl mr-4">📚</span>
                <div>
                  <h4 className="font-bold text-xl mb-2">Grammar & Vocabulary</h4>
                  <p className="text-gray-600">Strengthen language fundamentals essential for a high band score</p>
                </div>
              </div>
              <div className="flex items-start bg-white rounded-xl p-6 shadow-md">
                <span className="text-primary text-3xl mr-4">🎯</span>
                <div>
                  <h4 className="font-bold text-xl mb-2">High-Utility Techniques</h4>
                  <p className="text-gray-600">Clear explanations aligned with official test expectations</p>
                </div>
              </div>
              <div className="flex items-start bg-white rounded-xl p-6 shadow-md">
                <span className="text-primary text-3xl mr-4">📝</span>
                <div>
                  <h4 className="font-bold text-xl mb-2">Practice Resources</h4>
                  <p className="text-gray-600">Access templates, worksheets, and curated practice material</p>
                </div>
              </div>
              <div className="flex items-start bg-white rounded-xl p-6 shadow-md">
                <span className="text-primary text-3xl mr-4">🌏</span>
                <div>
                  <h4 className="font-bold text-xl mb-2">PAN-India Community</h4>
                  <p className="text-gray-600">Collaborate with motivated students from across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* IELTS Results Component */}
          <IeltsResult />

          {/* Expert Trainers */}
          <div className="bg-gradient-to-r from-primary to-red-900 text-white rounded-3xl p-8 md:p-12 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Learn from India's Best IELTS Trainers
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
              Our expert trainers bring experience from premier institutions including IIM Ahmedabad, IIM Lucknow, University of Cambridge, and MIT. Each mentor is committed to your success with personalized guidance and proven strategies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                IIM Alumni
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                Cambridge Certified
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                MIT Experience
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                3+ Years Training
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-primary to-red-900 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="font-sans hover:shadow-lg transition-shadow border-l-4 border-primary">
                  <CardBody className="p-6">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-primary via-primary to-red-800 text-white rounded-3xl p-8 md:p-16 text-center mb-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Start Your IELTS Journey?
            </h2>
            <p className="text-lg md:text-xl mb-3 opacity-95">
              🔥 Limited Seats Available - Enroll at Just ₹49!
            </p>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join 500+ students who are already preparing with India's best IELTS trainers. Get lifetime access to recordings and exclusive practice materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleEnrollClick}
                className="bg-white text-primary font-bold text-xl px-10 py-7 hover:shadow-2xl hover:scale-105 transition-transform"
              >
                Enroll Now at ₹49!
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold text-xl px-10 py-7 hover:bg-white/20 transition-all"
              >
                Learn About IELTS Plus
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-80">
              💬 Need help? Our academic advisors are available for personalized guidance
            </p>
          </div>

        </div>
      </div>

      <Spacer y={48} />
    </DefaultLayout>
  );
}