'use client'
import { useState } from 'react'
import {
  Book,
  Code,
  PenTool,
  Target,
  FileText,
  Globe,
  Award,
  Brain,
  ArrowRight,
  Bot,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Rocket,
  Zap
} from 'lucide-react'
import HeroSection from './dashboard/_components/HeroSection'

const ResourceCard = ({ icon, title, description, links }) => (
  <div className="group relative bg-white/70 backdrop-blur-lg border border-white/40 
  rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
  hover:-translate-y-3 p-6 flex flex-col h-full overflow-hidden">

    {/* Hover Glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
    bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transition duration-500"></div>

    <div className="relative z-10">
      <div className="flex items-center mb-5">
        <div className="p-3 bg-indigo-100 rounded-xl">
          {icon}
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <p className="text-gray-600 mb-6 flex-grow">{description}</p>

      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center justify-between 
            text-indigo-600 hover:text-indigo-900 font-medium 
            transition-all"
          >
            {link.name}
            <ArrowRight
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      resources: [
        {
          title: "Coding Platforms",
          description: "Practice coding and algorithmic problem-solving",
          icon: <Code className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
            { name: "LeetCode", url: "https://leetcode.com/" },
            { name: "HackerRank", url: "https://www.hackerrank.com/" },
            { name: "CodeChef", url: "https://www.codechef.com/" }
          ]
        },
        {
          title: "Technical Interview Preparation",
          description: "Resources for system design and technical interviews",
          icon: <Target className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "InterviewBit", url: "https://www.interviewbit.com/" },
            { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { name: "Pramp", url: "https://www.pramp.com/" }
          ]
        }
      ]
    },
    aptitude: {
      resources: [
        {
          title: "Aptitude & Reasoning",
          description: "Practice quantitative and logical reasoning skills",
          icon: <PenTool className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "IndiaBix", url: "https://www.indiabix.com/" },
            { name: "Freshersworld Aptitude", url: "https://www.freshersworld.com/aptitude-questions" },
            { name: "MathsGuru Reasoning", url: "https://www.mathsguru.com/reasoning-questions/" }
          ]
        },
        {
          title: "Competitive Exam Prep",
          description: "Resources for competitive and placement exams",
          icon: <Award className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "GATE Overflow", url: "https://gateoverflow.in/" },
            { name: "Career Power", url: "https://careerpower.in/" },
            { name: "Brilliant.org", url: "https://brilliant.org/" }
          ]
        }
      ]
    },
    interview: {
      resources: [
        {
          title: "Interview Guides",
          description: "Comprehensive interview preparation resources",
          icon: <Book className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "AmbitionBox", url: "https://www.ambitionbox.com/" },
            { name: "Glassdoor", url: "https://www.glassdoor.co.in/" },
            { name: "Geeks for Geeks", url: "https://www.geeksforgeeks.org/blogs/interview-preparation/" }
          ]
        },
        {
          title: "Global Learning Platforms",
          description: "Online courses and learning resources",
          icon: <Globe className="w-6 h-6 text-indigo-600" />,
          links: [
            { name: "Coursera", url: "https://www.coursera.org/" },
            { name: "edX", url: "https://www.edx.org/" },
            { name: "Udacity", url: "https://www.udacity.com/" }
          ]
        }
      ]
    }
  }

  return (
    <>
      <HeroSection />

      <div className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-20 flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Small decorative pill above */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Student Resource Hub</span>
            </div>
            
            <h2 className="text-5xl md:text-[3.5rem] font-black tracking-tight text-gray-900 leading-tight">
              B.Tech Interview & <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent relative inline-block mt-2 md:mt-0">
                Preparation Resources
                <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-yellow-500 animate-pulse hidden md:block" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mt-6">
              A curated collection of powerful tools, roadmaps, and platforms designed specifically to help you crack interviews and level up your engineering career.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-16 gap-6">
            {Object.keys(resourceCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/60 backdrop-blur-md border border-gray-200 text-gray-700 hover:scale-105 hover:shadow-md"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Resources
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
            {resourceCategories[activeCategory].resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          {/* Additional Section */}
          <div className="mt-24 bg-white/40 backdrop-blur-3xl border border-white/60 
          rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden px-8 py-16 sm:p-16">

            <div className="text-center mb-16 flex flex-col items-center justify-center animate-in zoom-in-95 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>Supercharge Workflow</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 flex flex-col sm:flex-row items-center gap-3">
                <span className="flex items-center gap-3">
                  Accelerate Your 
                </span>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent flex items-center gap-2 relative">
                   Preparation
                   <Rocket className="w-8 h-8 text-indigo-500 hover:-translate-y-2 hover:text-purple-600 transition-all duration-300 ml-2 hidden sm:block" />
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Everything you need to build your profile, practice speaking, and master your technical interviews in one single place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Resume Building",
                  description: "Design a professional and modern resume to pass automated ATS systems easily.",
                  icon: <FileText className="w-10 h-10 text-blue-600 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500" />,
                  bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
                  borderColor: "border-blue-100",
                  shadowColor: "hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]",
                  url: "https://www.overleaf.com/gallery/tagged/cv"
                },
                {
                  title: "AI Mock Interviews",
                  description: "Practice unlimited mock interviews with our terrifyingly realistic AI coach.",
                  icon: <Bot className="w-10 h-10 text-indigo-600 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500" />,
                  bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50",
                  borderColor: "border-indigo-100",
                  shadowColor: "hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]",
                  url: "/dashboard"
                },
                {
                  title: "Deep Skill Analysis",
                  description: "Get granular AI feedback algorithms to analyze and rapidly improve your core skills.",
                  icon: <BrainCircuit className="w-10 h-10 text-purple-600 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500" />,
                  bgColor: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
                  borderColor: "border-purple-100",
                  shadowColor: "hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]",
                  url: "/dashboard"
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className={`group bg-white/80 backdrop-blur-xl border border-white 
                  p-8 sm:p-10 rounded-[2rem] text-center hover:-translate-y-3 ${tip.shadowColor}
                  shadow-lg shadow-gray-200/40 transition-all duration-500 relative overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-[100px] -z-10`}></div>
                  
                  <div className={`w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-2xl ${tip.bgColor} border ${tip.borderColor} group-hover:shadow-inner transition-all duration-500`}>
                    {tip.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-medium">{tip.description}</p>
                  
                  <a
                    href={tip.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-bold text-sm bg-gray-50 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-full border border-gray-200 hover:border-indigo-200 transition-all group/btn w-full"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}