"use client";

import React from "react";
import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Create Your Account",
    description: "Sign up securely using Clerk and build your personalized interview profile.",
    color: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Settings,
    title: "Customize Interview",
    description: "Select interview type, difficulty level, topics, and duration.",
    color: "from-indigo-100 to-violet-100",
    iconColor: "text-indigo-600"
  },
  {
    icon: Play,
    title: "Start Interview",
    description: "AI generates intelligent, role-based questions one at a time.",
    color: "from-violet-100 to-purple-100",
    iconColor: "text-violet-600"
  },
  {
    icon: Send,
    title: "Submit Responses",
    description: "Answer via text or direct audio recording in a distraction-free interface.",
    color: "from-purple-100 to-fuchsia-100",
    iconColor: "text-purple-600"
  },
  {
    icon: ChartBar,
    title: "Get Instant Feedback",
    description: "Receive structured AI evaluation with scores and granular improvement tips.",
    color: "from-fuchsia-100 to-pink-100",
    iconColor: "text-fuchsia-600"
  },
  {
    icon: Repeat,
    title: "Track & Improve",
    description: "Review history, monitor progress, and continuously refine your skills.",
    color: "from-pink-100 to-rose-100",
    iconColor: "text-pink-600"
  }
];

const HowItWorksPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 text-gray-900 px-6 py-24 overflow-hidden flex items-center justify-center flex-col">

      {/* Abstract Glowing Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10" style={{ animationDelay: "2s" }}></div>

      <div className="relative max-w-5xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-white/80 backdrop-blur-xl shadow-xl shadow-indigo-500/10 rounded-3xl border border-white relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Bot size={48} className="text-indigo-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          <h1 className="text-5xl md:text-[4rem] font-black tracking-tight mb-6 leading-tight">
            How <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent relative">
              PrepAI
              <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-yellow-400 animate-pulse" />
            </span> Works
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            A structured, fully autonomous AI interview simulation platform designed to critically evaluate your skills and fast-track your career.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-fuchsia-200 rounded-full md:-translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12 sm:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col sm:flex-row items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step Number Dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 bg-white border-4 border-indigo-100 rounded-full w-12 h-12 hidden sm:flex items-center justify-center text-lg font-black text-indigo-600 shadow-xl z-10 transition-transform duration-500 hover:scale-125 hover:border-indigo-300">
                    {index + 1}
                  </div>

                  {/* Card Content */}
                  <div className={`w-full sm:w-1/2 ${isLeft ? "sm:pr-16" : "sm:pl-16"} px-4 sm:px-0 mt-8 sm:mt-0`}>
                    <div className="group bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                      
                      {/* Decorative Background Glow */}
                      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${step.color} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                      <div className="flex items-center gap-5 mb-5 relative z-10">
                        <div className={`p-4 bg-gradient-to-br ${step.color} rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white`}>
                          <Icon size={28} className={step.iconColor} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                          {step.title}
                        </h2>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed font-medium relative z-10 text-lg">
                        {step.description}
                      </p>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-32 animate-in fade-in zoom-in-95 duration-1000 delay-700">
          <div className="bg-white/60 backdrop-blur-xl border border-white p-12 rounded-[3rem] shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 pointer-events-none"></div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 relative z-10">Ready to ace your next interview?</h2>
             <p className="text-lg text-gray-600 mb-10 relative z-10">Create an account for free and start practicing immediately.</p>
             <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 relative z-10 group"
             >
               Start Practicing Now
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HowItWorksPage;