const { ChatOpenAI } = require("@langchain/openai");
require("dotenv").config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

async function generateFeedback({ question, userAnswer }) {
  const prompt = `
You are a senior technical interviewer and performance coach at a top-tier tech firm.
Review the following interview exchange and provide professional feedback:

Question: ${question}
User's Answer: ${userAnswer}

Analyze the response based on:
- Technical Accuracy and Depth.
- Structure and Clarity (Did the user use the STAR method? Was it concise?).
- Professionalism and Impact.

Provide:
1. Feedback: A detailed, constructive analysis highlighting strengths and specific areas for improvement.
2. Improved Answer: A high-quality, exemplary version of the answer that demonstrates mastery of the topic.

Return your response in the EXACT following format:
Feedback: [Detailed feedback here]
Improved Answer: [Complete professional answer here]
  `;

  const res = await llm.invoke(prompt);
  const content = res.content;

  // Robust Marker-based Parsing
  let feedback = 'No feedback generated.';
  let improved = 'No blueprint generated.';

  try {
    if (content.includes('Feedback:') && content.includes('Improved Answer:')) {
      const parts = content.split('Improved Answer:');
      feedback = parts[0].replace('Feedback:', '').trim();
      improved = parts[1].trim();
    } else if (content.includes('Feedback:')) {
       feedback = content.replace('Feedback:', '').trim();
    }
  } catch (err) {
    console.error('Parsing error in feedback.js:', err);
  }

  return { feedback, improved };
}

module.exports = generateFeedback;
