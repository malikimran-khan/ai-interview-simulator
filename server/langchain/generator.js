const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
require("dotenv").config();

// Initialize the OpenAI chat model
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

/**
 * Generate a single interview question based on role, experience, and category.
 * @param {Object} param0
 * @param {string} param0.jobTitle
 * @param {string} param0.experience
 * @param {string} param0.category
 * @returns {Promise<string>} 
 */
async function generateQuestions({ jobTitle, experience, category }) {
  const prompt = PromptTemplate.fromTemplate(
    `You are an elite Tech Recruiter and hiring manager for a global leader in innovation.
    Your goal is to generate a single, highly relevant, and challenging interview question in the following category: {category}.
    
    Target Profile:
    - Role: {jobTitle}
    - Level: {experience}
    - Focus Area: {category}

    Ensure the question is:
    1. Specifically tailored to {jobTitle} at a {experience} level.
    2. Deeply related to {category}.
    3. Practical and designed to reveal the candidate's true depth and logic.

    Return only the question text as a single string.`
  );

  const input = await prompt.format({ jobTitle, experience, category });
  const res = await llm.invoke(input);

  return res.content.trim();
}

module.exports = generateQuestions;
