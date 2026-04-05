import { Bot, Sparkles, BrainCircuit, Rocket, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-24 lg:px-8 w-full bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 overflow-hidden min-h-screen flex items-center">
      {/* Abstract Glowing Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none -z-10" style={{ animationDelay: "2s" }}></div>

      <div className="mx-auto max-w-6xl py-12 sm:py-20 flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">
        
        {/* Left Content Area */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="mb-6 flex justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-indigo-700 bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm hover:bg-white hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">Master Your AI Interview</span>
              <span className="mx-2 text-indigo-300">|</span>
              <a href="/how-it-works" className="font-bold text-indigo-600 flex items-center">
                Read more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-[4rem] leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Your Personal <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">AI Interview</span> Coach
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Double your chances of landing that dream job offer. Practice with our terrifyingly realistic AI interviewer, get instant tailored feedback, and track your improvement effortlessly.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <a
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Rocket className="w-5 h-5" />
              Get Started Free
            </a>
            <a 
              href="/dashboard" 
              className="flex items-center gap-2 px-8 py-4 text-sm font-bold text-gray-700 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white hover:text-indigo-600 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              View Dashboard
            </a>
          </div>
        </div>

        {/* Right Visual Floating UI Representation */}
        <div className="lg:w-1/2 relative min-h-[500px] w-full hidden md:block animate-in fade-in zoom-in-95 duration-1000 delay-500">
          
          {/* Decorative Ring Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[60px] border-indigo-50/40 rounded-full blur-2xl -z-10"></div>
          
          {/* Floating UI Card 1 (Interview Question) */}
          <div className="absolute top-4 right-10 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_20px_40px_rgba(99,102,241,0.15)] w-80 hover:-translate-y-4 hover:shadow-[0_30px_50px_rgba(99,102,241,0.2)] transition-all duration-500 z-20">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-sm border border-indigo-50">
                <Bot className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <div className="h-2.5 w-24 bg-indigo-100 rounded-full mb-2"></div>
                <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-2 top-2 bottom-2 w-1 bg-indigo-500 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-800 bg-gradient-to-r from-indigo-50/80 to-transparent p-4 rounded-xl border border-indigo-50/50">
                "Can you walk me through a time when you had to optimize a React component?"
              </p>
            </div>
          </div>

          {/* Floating UI Card 2 (AI Evaluation Response) */}
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_20px_40px_rgba(168,85,247,0.15)] w-80 hover:-translate-y-4 hover:shadow-[0_30px_50px_rgba(168,85,247,0.2)] transition-all duration-500 z-30">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-sm border border-green-50">
                  <BrainCircuit className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-sm">AI Evaluation</h4>
              </div>
              <span className="bg-white px-3 py-1 rounded-lg text-sm font-black text-green-600 shadow-sm border border-green-100">
                9/10
              </span>
            </div>
            
            <p className="text-xs text-gray-600 mb-4 leading-relaxed font-medium">
              Excellent problem-solving approach! You accurately identified the re-rendering issue and utilized <span className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">useMemo</span> effectively.
            </p>
            
            {/* Fake progress bars */}
            <div className="space-y-3">
              <div>
                <div className="flexjustify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Clarity</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full w-[90%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Technical Dept</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full w-[85%]"></div></div>
              </div>
            </div>
          </div>

          {/* Small floating decorative pill */}
          <div className="absolute top-1/2 left-8 bg-white/90 backdrop-blur shadow-lg border border-gray-100 py-3 px-5 rounded-full flex items-center gap-3 hover:-translate-y-2 transition-all duration-500 z-10">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700">Interview in Progress...</span>
          </div>

        </div>
      </div>
    </div>
  );
}