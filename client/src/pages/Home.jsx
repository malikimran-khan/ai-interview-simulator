import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, BrainCircuit } from 'lucide-react';

export default function Home() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 1,
    })
    .to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
    }, '-=0.5')
    .to(subHeadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5');
  }, []);

  const handleStartClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/choose-role');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100-80px)] overflow-hidden flex flex-col items-center justify-center p-6 bg-dark opacity-0"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-[60px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-full glass border-primary/20 text-primary text-sm font-medium mb-4"
        >
          <Sparkles size={14} />
          <span>AI Interview Simulator</span>
        </motion.div>

        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight opacity-0 translate-y-12 text-white"
        >
          Master Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Future</span> <br /> 
          with AI Intelligence
        </h1>

        <p
          ref={subHeadingRef}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl opacity-0 translate-y-8 leading-relaxed font-body"
        >
          Simulate real-world pressure with our advanced AI. Get instant feedback, 
          identify weak areas, and build the confidence to land your dream job.
        </p>

        <div ref={buttonRef} className="opacity-0 scale-75 mt-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartClick}
            className="group flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg transition-all glow-blue"
          >
            <BrainCircuit size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Launch Simulation</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Floating Icons Background */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 opacity-10 hidden lg:block"
      >
        <BrainCircuit size={120} className="text-primary" />
      </motion.div>
    </div>
  );
}
