const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
require("dotenv").config();

// Initialize the OpenAI chat model
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

/**
 * Generate 3 interview questions based on job title and experience.
 * @param {Object} param0
 * @param {string} param0.jobTitle
 * @param {string} param0.experience
 * @returns {Promise<string>} A single interview question as a string
 */
async function generateQuestions({ jobTitle, experience }) {
  const prompt = PromptTemplate.fromTemplate(
    `Generate 3 unique interview questions for a {experience} level {jobTitle}. Return them as a numbered list.`
  );

  const input = await prompt.format({ jobTitle, experience });
  const res = await llm.invoke(input);

  // Split and clean the questions
  const lines = res.content
    .split('\n')
    .map((q) => q.replace(/^\d+\.\s*/, '').trim())
    .filter((q) => q.length > 0);

  // Return only one question per function call
  // So that each API call gives one clean string
  return lines[0]; // return only one question string
}

module.exports = generateQuestions;
