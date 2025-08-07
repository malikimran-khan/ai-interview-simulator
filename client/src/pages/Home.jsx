import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const colors = {
    primary: '#000000',
    accent: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
  };

  useEffect(() => {
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1,
      ease: 'back.out(1.7)',
    });
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
      className="min-h-screen flex flex-col items-center justify-center p-6 opacity-0 translate-y-8"
      style={{ backgroundColor: colors.primary, color: colors.textPrimary }}
    >
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl font-bold text-center mb-6 opacity-0 -translate-y-4"
        style={{ color: colors.accent }}
      >
        AI-Powered Interview Simulator
      </h1>

      <button
        ref={buttonRef}
        className="px-6 py-3 border-2 rounded-full text-lg font-semibold transition duration-300 opacity-0 scale-90"
        style={{
          borderColor: colors.accent,
          color: colors.accent,
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.accent;
          e.target.style.color = colors.primary;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = colors.accent;
        }}
        onClick={handleStartClick}
      >
        Let's Start
      </button>
    </div>
  );
}
