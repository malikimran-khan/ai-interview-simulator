const { ChatOpenAI } = require("@langchain/openai");
require("dotenv").config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

async function generateFeedback({ question, userAnswer }) {
  const prompt = `
You are an expert interview coach.

Question: ${question}

User's Answer: ${userAnswer}

✅ Provide:
- Constructive feedback on the user's answer.
- A suggested improved version of the answer.

Return format:
Feedback: ...
Improved Answer: ...
  `;

  const res = await llm.invoke(prompt);

  const content = res.content;
  const feedbackMatch = content.match(/Feedback:\s*(.*)/i);
  const improvedMatch = content.match(/Improved Answer:\s*(.*)/i);

  return {
    feedback: feedbackMatch ? feedbackMatch[1].trim() : 'No feedback.',
    improved: improvedMatch ? improvedMatch[1].trim() : 'No improved answer.',
  };
}

module.exports = generateFeedback;
