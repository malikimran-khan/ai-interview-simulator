const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

/**
 * Generate weak areas from user's answer.
 * @param {Object} param0
 * @param {string} param0.question
 * @param {string} param0.userAnswer
 * @returns {Promise<string>}
 */
async function generateWeakAreas({ question, userAnswer }) {
  const prompt = PromptTemplate.fromTemplate(`
You are an AI interview coach.

Question: {question}
User's Answer: {userAnswer}

Identify specific weak areas, gaps, or improvements the user should work on. Be clear and constructive, return only the weak points in one paragraph.
`);

  const input = await prompt.format({ question, userAnswer });
  const res = await llm.invoke(input);

  return res.content.trim();
}

module.exports = generateWeakAreas;
