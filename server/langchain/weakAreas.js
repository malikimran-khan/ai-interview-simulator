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
You are a diagnostic AI specialized in talent assessment and hiring risk evaluation.
Analyze this interview response for specific technical gaps or communication red flags:

Question: {question}
User's Answer: {userAnswer}

Identify:
1. Gaps: Specific technical inaccuracies, lack of depth, or missed opportunities.
2. Action Points: Concrete steps or topics the user should study to improve this specific answer.

Return your response in the EXACT following format:
Gaps: [Detailed analysis of weaknesses]
Action Points: [Bullet points for improvement]
`);

  const input = await prompt.format({ question, userAnswer });
  const res = await llm.invoke(input);

  return res.content.trim();
}

module.exports = generateWeakAreas;
