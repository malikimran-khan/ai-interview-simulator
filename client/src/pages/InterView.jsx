import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InterView() {
  const colors = {
    primary: '#FFFFFF',        // Accent (white)
    dark: '#000000',           // Background (black)
    card: '#111111',           // Card background
    text: '#FFFFFF',           // Main text
    subText: '#DDDDDD',        // Secondary text
    border: '#FFFFFF',         // Border highlight
  };

  const [session, setSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem('interviewSession'));
    const userId = localStorage.getItem('userId');

    if (
      savedSession &&
      savedSession.questions &&
      savedSession.questions.length === 3 &&
      userId
    ) {
      setSession({ ...savedSession, userId });
    } else {
      alert('No valid interview session found. Please choose a role first.');
      navigate('/choose-role');
    }
  }, [navigate]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return alert('Please provide an answer.');

    const updatedAnswers = [
      ...answers,
      {
        question: session.questions[currentQuestionIndex],
        answer: answer.trim(),
      },
    ];

    setAnswers(updatedAnswers);
    setAnswer('');

    const isLastQuestion = currentQuestionIndex === 2;

    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoading(true);
      try {
        await axios.post('http://localhost:5000/api/interview/save', {
          userId: session.userId,
          jobTitle: session.jobTitle,
          experience: session.experience,
          responses: updatedAnswers,
        });

        alert('Interview saved successfully!');
        localStorage.removeItem('interviewSession');
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Failed to save interview.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!session) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: colors.dark }}
    >
      <div
        className="w-full max-w-2xl rounded-xl shadow-xl p-8 space-y-6"
        style={{ backgroundColor: colors.card, color: colors.text }}
      >
        <h2 className="text-2xl font-bold text-center" style={{ color: colors.primary }}>
          Interview Simulation
        </h2>

        <div className="text-sm text-center" style={{ color: colors.subText }}>
          <p><strong>Job Title:</strong> {session.jobTitle}</p>
          <p><strong>Experience Level:</strong> {session.experience}</p>
        </div>

        <div
          className="p-4 rounded text-lg font-medium border-l-4"
          style={{
            backgroundColor: colors.dark,
            borderColor: colors.border,
            color: colors.text,
          }}
        >
          🧠 <strong>AI Question {currentQuestionIndex + 1}/3:</strong><br />
          {session.questions[currentQuestionIndex]}
        </div>

        <form onSubmit={handleSubmitAnswer} className="space-y-4">
          <textarea
            rows={5}
            className="w-full p-3 rounded border focus:outline-none"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.dark,
              color: colors.text,
              borderWidth: '1px',
            }}
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded font-semibold transition duration-300"
            style={{
              backgroundColor: colors.primary,
              color: colors.dark,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Saving...' : currentQuestionIndex === 2 ? 'Save Interview' : 'Next Question'}
          </button>
        </form>
      </div>
    </div>
  );
}
