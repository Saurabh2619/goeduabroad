import { Spacer, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "tailwindcss/tailwind.css";

export default function IELTSMasterclass() {
  const testimonials = [
    {
      name: "Priya Sharma",
      band: "8.5",
      text: "The strategies taught in the masterclass were game-changing! The personalized feedback helped me identify my weak areas."
    },
    {
      name: "Rahul Verma",
      band: "8.0",
      text: "Excellent guidance from expert trainers. The mock tests were incredibly realistic and helpful."
    },
    {
      name: "Ananya Reddy",
      band: "7.5",
      text: "The lifetime access to recordings helped me practice repeatedly. I improved my score significantly!"
    },
    {
      name: "Arjun Patel",
      band: "8.0",
      text: "Comprehensive coverage of all modules with practical techniques that actually work in the exam."
    },
    {
      name: "Sneha Gupta",
      band: "7.5",
      text: "The grammar and vocabulary sessions were incredibly helpful! Highly recommend to everyone."
    }
  ];

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
      answer: "Masterclasses are free, introductory learning sessions. IELTS Plus is a premium, comprehensive program offering in-depth instruction, personalized guidance, and structured assessments."
    }
  ];

  return (
    <DefaultLayout>
      <Spacer y={48} />

      <div className="w-full h-auto flex flex-col items-start justify-start">
        <div className="mx-auto max-w-[95%] md:max-w-[85%] w-full">

          {/* Hero Section with Primary Background */}
          <div className="bg-gradient-to-br from-primary via-primary to-red-800 text-white rounded-3xl p-8 md:p-16 mb-12 shadow-2xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                Free IELTS MasterClasses
              </h1>
              <p className="text-xl md:text-2xl font-sans mb-2 opacity-95">
                500+ Students Enrolled. Limited Seats Only.
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Led by Expert Trainers from IIM, Cambridge & MIT
              </p>
              
              <div className="max-w-3xl mx-auto mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs opacity-90">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-white text-primary font-bold text-xl px-12 py-7 hover:shadow-2xl hover:scale-105 transition-transform"
              >
                Reserve Your Free Seat Now
              </Button>
              
              <p className="text-sm mt-4 opacity-80">
                🎁 Get exclusive practice materials & templates as giveaways
              </p>
            </div>
          </div>

          {/* What You Get Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
              What You'll Get in Our Free Masterclasses
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

          {/* Image Content Grid */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-10">
              Why Choose EduAbroad?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contentImages.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="w-full h-80 overflow-hidden">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-contain bg-gray-100"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg">{item.description}</p>
                  </div>
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

          {/* Success Stories - Names Only */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-3">
              <span className="bg-gradient-to-r from-primary to-red-900 bg-clip-text text-transparent">
                Success Stories from Our Learners
              </span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-10">
              Join hundreds of successful students who achieved their dream band scores
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="font-sans hover:shadow-xl transition-shadow">
                  <CardBody className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-red-800 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {testimonial.band}
                    </div>
                    <h3 className="font-sans text-xl font-bold text-primary mb-3">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm italic leading-relaxed">"{testimonial.text}"</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

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
              🔥 Limited Seats Available - Register Before They're Gone!
            </p>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join 500+ students who are already preparing with India's best IELTS trainers. Get lifetime access to recordings and exclusive practice materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary font-bold text-xl px-10 py-7 hover:shadow-2xl hover:scale-105 transition-transform"
              >
                Register Now - It's Free!
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