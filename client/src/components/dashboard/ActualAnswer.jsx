import React, { useEffect, useState } from 'react';

export default function ActualAnswer() {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/interview/${userId}`);
        const allData = await res.json();
        console.log("available data", allData);

        const userRecords = allData
          .filter((record) => record.userId === userId)
          .reverse(); // latest records first

        const userResponses = userRecords.flatMap((record) => record.responses);

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
    const getFeedback = async () => {
      if (interviewData.length === 0) return;

      try {
        const res = await fetch('http://localhost:5000/api/interview/get-feedback', {
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
        console.log("feedback data", data);

        if (data.feedbacks) {
          setFeedbacks(data.feedbacks);
        } else {
          setError('Failed to generate feedback.');
        }
      } catch (err) {
        console.error(err);
        setError('Error getting feedback from AI.');
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [interviewData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl font-semibold">
        Generating AI feedback...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Your Interview Feedback
      </h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-8">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-white rounded-lg p-5 shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              Q{index + 1}: {item.question}
            </h2>

            <p className="mb-2">
              <span className="text-white font-semibold">Your Answer:</span>{' '}
              {item.userAnswer}
            </p>

            <div className="mt-4 bg-black border-l-4 border-white px-4 py-3 rounded-lg whitespace-pre-line">
              <p>
                <span className="text-white font-semibold">Feedback:</span>{' '}
                {item.feedback.feedback}
              </p>
              <p className="mt-2">
                <span className="text-white font-semibold">Improved Answer:</span>{' '}
                {item.feedback.improved}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
