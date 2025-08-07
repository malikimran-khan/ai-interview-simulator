import React, { useEffect, useState } from 'react';

export default function WeakAreas() {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weakAreasList, setWeakAreasList] = useState([]);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/interview/${userId}`);
        const allData = await res.json();

        const userResponses = allData
          .filter((record) => record.userId === userId)
          .flatMap((record) => record.responses)
          .reverse();

        if (!userResponses || userResponses.length === 0) {
          setError('No interview record found.');
          setLoading(false);
          return;
        }

        setInterviewData(userResponses);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interview data.');
        setLoading(false);
      }
    };

    fetchInterview();
  }, [userId]);

  useEffect(() => {
    const fetchWeakAreas = async () => {
      if (interviewData.length === 0) return;

      try {
        const res = await fetch('http://localhost:5000/api/interview/get-weak-areas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            records: interviewData.map((item) => ({
              question: item.question,
              userAnswer: item.answer,
            })),
          }),
        });

        const data = await res.json();

        if (data.weakAreasList) {
          setWeakAreasList(data.weakAreasList);
        } else {
          setError('Failed to generate weak areas.');
        }
      } catch (err) {
        console.error(err);
        setError('Error getting weak areas from AI.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeakAreas();
  }, [interviewData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl font-semibold">
        Analyzing Weak Areas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Your Weak Areas</h1>

      {error && <p className="text-red-500 text-center font-medium">{error}</p>}

      <div className="space-y-8">
        {weakAreasList.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-white rounded-lg p-5 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              Q{index + 1}: {item.question}
            </h2>
            <p className="mb-2">
              <span className="text-white font-semibold">Your Answer:</span> {item.userAnswer}
            </p>
            <p className="mt-4 bg-black text-white border-l-4 border-red-500 px-4 py-3 rounded-lg whitespace-pre-line">
              <span className="text-red-500 font-semibold">Weak Area:</span> {item.weakAreas}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
