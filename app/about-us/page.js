'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket,
  Sparkles
} from 'lucide-react'

const tabs = [
  {
    id: 'mission',
    title: 'Our Mission',
    icon: <Target size={18} />,
    content: `PrepAI is on a mission to revolutionize interview preparation by delivering intelligent, personalized AI coaching tailored strictly to your career goals. We bridge the gap between preparation and real-world success.`,
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 'story',
    title: 'Our Story',
    icon: <BookOpen size={18} />,
    content: `Born from real engineering interview struggles, PrepAI was created to simplify preparation and aggressively boost confidence. Built with passion and innovation, it's designed to empower job seekers everywhere to break into tech.`,
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: 'approach',
    title: 'Our Approach',
    icon: <Rocket size={18} />,
    content: `Using advanced generative AI algorithms, PrepAI synthesizes dynamic interview questions based strictly on your profile. Real-time feedback and granular skill analytics help you iterate and improve with every single session.`,
    color: "from-purple-600 to-fuchsia-600"
  }
]

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState('mission')

  const activeColor = tabs.find(t => t.id === activeTab)?.color

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 px-6 py-24 overflow-hidden flex flex-col items-center">

      {/* Abstract Glowing Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10" style={{ animationDelay: "2s" }}></div>

      <div className="relative max-w-5xl mx-auto w-full z-10">

        {/* Hero Section */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Discover Our Vision</span>
          </div>

          <h1 className="text-5xl md:text-[4rem] font-black tracking-tight text-gray-900 leading-tight mb-6">
            About <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent relative">PrepAI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Empowering professionals to ace complex software engineering interviews through incredibly intelligent, personalized AI coaching.
          </p>
        </div>

        {/* Premium Interactive Showcase Section */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] p-8 sm:p-12 mb-32 animate-in zoom-in-95 duration-1000 delay-300 relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 text-sm font-bold
                ${activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-xl shadow-indigo-500/20 scale-105`
                    : 'bg-white/80 border border-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-white hover:scale-105 hover:shadow-md'
                  }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>

          {/* Animated Tab Content */}
          <div className="min-h-[150px] flex items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
              {tabs.map(tab => (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <h3 className={`text-2xl font-black mb-6 bg-gradient-to-r ${tab.color} bg-clip-text text-transparent`}>
                      {tab.title}
                    </h3>
                    <p className="text-gray-700 text-xl leading-relaxed font-medium">
                      {tab.content}
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 font-medium">The principles that drive our engineering.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />,
                title: "Continuous Learning",
                desc: "Always striving to iterate, improve, and provide infinitely better tools for developer growth.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
                shadow: "hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]"
              },
              {
                icon: <Users className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />,
                title: "Empowerment",
                desc: "Building rock-solid confidence and actively enabling individuals to achieve their career success.",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                border: "border-indigo-100",
                shadow: "hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]"
              },
              {
                icon: <Briefcase className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />,
                title: "Excellence",
                desc: "Delivering massive, high-impact features to completely simplify technical preparation.",
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                shadow: "hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]"
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`group bg-white/70 backdrop-blur-xl border border-white p-10 rounded-[2rem] text-center hover:-translate-y-3 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${value.shadow}`}
              >
                <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-2xl mb-8 ${value.bg} ${value.color} border ${value.border} group-hover:shadow-inner transition-all duration-500`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}