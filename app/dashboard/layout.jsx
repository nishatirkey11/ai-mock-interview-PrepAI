import React from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30">
      {/* Background Animated Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header />
      
      <main className="container mx-auto my-8 px-4 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
