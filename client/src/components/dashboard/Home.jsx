import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const colors = {
    background: '#000000',
    card: '#111111',
    text: '#FFFFFF',
    subText: '#DDDDDD',
    accent: '#FFFFFF',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold text-center mb-6"
        style={{ color: colors.accent }}
      >
        Welcome to the AI-Powered Interview Simulator
      </h1>

      <p
        className="text-center text-lg md:text-xl max-w-2xl mb-8"
        style={{ color: colors.subText }}
      >
        Practice real interview questions powered by AI. Get instant feedback, improve your answers,
        and boost your confidence — all in a smart, simulated environment.
      </p>

      <div className="space-x-4">
        <button
          onClick={() => navigate('/choose-role')}
          className="px-6 py-3 rounded font-semibold border-2 transition duration-300"
          style={{
            borderColor: colors.accent,
            backgroundColor: 'transparent',
            color: colors.accent,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.accent;
            e.target.style.color = colors.background;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = colors.accent;
          }}
        >
          Start Interview
        </button>

        <button
          onClick={() => navigate('/actual-answer')}
          className="px-6 py-3 rounded font-semibold border-2 transition duration-300"
          style={{
            borderColor: colors.accent,
            backgroundColor: 'transparent',
            color: colors.accent,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.accent;
            e.target.style.color = colors.background;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = colors.accent;
          }}
        >
          View Feedback
        </button>
      </div>
    </div>
  );
}
