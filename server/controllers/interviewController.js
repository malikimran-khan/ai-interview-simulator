const generateQuestions = require('../langchain/generator');
const Interview = require('../models/Interview');
const generateFeedback = require('../langchain/feedback');
const generateWeakAreas = require('../langchain/weakAreas');
exports.startInterview = async (req, res) => {
  const { jobTitle, experience, userId, questionCount = 3 } = req.body;
  if (!jobTitle || !experience || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Define Category Sequences
  const technicalRoles = [
    'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 
    'Data Scientist', 'DevOps Engineer', 'Mobile App Developer', 'Cloud Architect'
  ];

  const techCategories = [
    'General Technical / Fundamentals',
    'Coding / Algorithmic Logic',
    'System Design / Scalability',
    'Behavioral / Engineering Culture',
    'Troubleshooting / Debugging Scenario'
  ];

  const nonTechCategories = [
    'Tools & Industry Software',
    'Domain Principles & Best Practices',
    'Workflow / Process Management',
    'Communication & Conflict Resolution',
    'Case Study / Innovation Scenario'
  ];

  const isTech = technicalRoles.includes(jobTitle);
  const selectedCategories = isTech ? techCategories : nonTechCategories;

  try {
    const questions = [];
    for (let i = 0; i < questionCount; i++) {
      // Rotate through categories if questionCount > categories length
      const category = selectedCategories[i % selectedCategories.length];
      const question = await generateQuestions({ jobTitle, experience, category });
      
      questions.push(Array.isArray(question) ? question[0] : question);
    }

    res.status(200).json({
      userId,
      jobTitle,
      experience,
      questionCount,
      questions,
    });
  } catch (error) {
    console.error('LangChain error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
};
exports.saveInterview = async (req, res) => {
  const { userId, jobTitle, experience, responses } = req.body;
  if (!userId || !jobTitle || !experience || !responses || responses.length !== 3) {
    return res.status(400).json({ error: 'Incomplete interview data' });
  }
  try {
    // 🛠 Validate each question is a string (defensive check)
    const formattedResponses = responses.map(({ question, answer }) => ({
      question: Array.isArray(question) ? question[0] : String(question),
      answer: String(answer),
    }));

    const interview = new Interview({
      userId,
      jobTitle,
      experience,
      responses: formattedResponses,
    });

    await interview.save();

    res.status(201).json({ message: 'Interview saved successfully' });
  } catch (error) {
    console.error('Save Interview error:', error);
    res.status(500).json({ error: 'Failed to save interview' });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await Interview.find({ userId }); // Filter by userId

    if (!interviews || interviews.length === 0) {
      return res.status(404).json({ error: 'No interviews found for this user' });
    }

    res.status(200).json(interviews);
  } catch (error) {
    console.error('Get Interviews error:', error);
    res.status(500).json({ error: 'Failed to fetch interviews' });
  }
};


exports.getFeedback = async (req, res) => {
  const { records } = req.body;
  console.log(req.body)

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid records' });
  }

  try {
    const feedbacks = await Promise.all(
      records.map(async ({ question, userAnswer }) => {
        // Defensive handling for skipped/empty answers
        const processedAnswer = userAnswer && userAnswer.trim() !== "" 
          ? userAnswer 
          : "(The candidate provided no response for this question)";

        const aiResponse = await generateFeedback({ question, userAnswer: processedAnswer });
        return {
          question,
          userAnswer: userAnswer || "",
          feedback: aiResponse,
        };
      })
    );

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Feedback Error:', error);
    res.status(500).json({ error: 'AI feedback generation failed' });
  }
};




exports.getWeakAreas = async (req, res) => {
  const { records } = req.body; // Expect: [{ question, userAnswer }, ...]

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid records' });
  }

  try {
    const weakAreasList = await Promise.all(
      records.map(async ({ question, userAnswer }) => {
        // Defensive handling for skipped/empty answers
        const processedAnswer = userAnswer && userAnswer.trim() !== "" 
          ? userAnswer 
          : "(The candidate provided no response for this question)";

        const weakAreas = await generateWeakAreas({ question, userAnswer: processedAnswer });
        return {
          question,
          userAnswer: userAnswer || "",
          weakAreas,
        };
      })
    );

    res.status(200).json({ weakAreasList });
  } catch (error) {
    console.error('Weak Areas Error:', error);
    res.status(500).json({ error: 'AI failed to generate weak areas' });
  }
};

