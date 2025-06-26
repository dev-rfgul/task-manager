
import express from 'express';
import { generateContent } from "../controllers/aiResponse.controller.js";
import { tasksforAIArrangement } from '../controllers/task.controller.js';
import userModel from '../models/user.model.js';

const router = express.Router();

const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours for real use
const DEFAULT_RATE_LIMIT = 11; // fallback if user has no maxPerDay

export const checkAndUpdateRateLimit = async (user) => {
  const now = new Date();

  // Set default rateLimit object if not present
  if (!user.rateLimit) {
    user.rateLimit = {
      count: 0,
      lastReset: now,
      totalRequests: 0,
    };
  }

  const { lastReset, count } = user.rateLimit;
  const timeSinceLastReset = now - new Date(lastReset);

  // Reset if window has passed
  if (timeSinceLastReset > RATE_LIMIT_WINDOW) {
    user.rateLimit.count = 0;
    user.rateLimit.lastReset = now;
  }
console.log("Rate limit check:", user.rateLimit.maxPerDay)
  // Get max limit from user model or fallback to default
  const MAX_CALLS = user.maxPerDay ?? DEFAULT_RATE_LIMIT;

  if (user.rateLimit.count >= MAX_CALLS) {
    const retryAfter = RATE_LIMIT_WINDOW - timeSinceLastReset;
    return {
      allowed: false,
      retryAfter,
    };
  }

  // Update usage count and save
  user.rateLimit.count += 1;
  user.rateLimit.totalRequests = (user.rateLimit.totalRequests || 0) + 1;

  await user.save();

  return {
    allowed: true,
    remaining: MAX_CALLS - user.rateLimit.count,
  };
};

router.post('/:id', async (req, res) => {
  const userID = req.params.id;

  const user = await userModel.findById(userID);
  if (!user) return res.status(404).json({ message: "User not found" });

  const rateLimitStatus = await checkAndUpdateRateLimit(user);
  if (!rateLimitStatus.allowed) {
    const minutes = Math.ceil(rateLimitStatus.retryAfter / 60000);
    return res.status(429).json({
      message: `Rate limit exceeded. Try again in ${minutes} minute(s).`,
      remainingTries: 0,
    });
  }

  const tasks = await tasksforAIArrangement(userID);

  try {
    const prompt = `
      You are a helpful assistant. I will give you a list of tasks.

      Emotional Impact: Prioritize tasks that involve loved ones or critical situations.
      Urgency & Importance: Handle time-sensitive tasks first.
      Time Efficiency: Prioritize quick tasks with a big impact.
      Long-Term Impact: Consider tasks important for the future.
      Duration & Energy: Factor in task duration and energy.

      Arrange tasks in a human-like way, balancing emotional context, urgency, and impact.
      Keep deadlines in mind.

      Your response **must** be a JSON array of objects like:
      [
        {
          "title": "task title",
          "reason": "1-line reason"
        },
        ...
      ]

      Do NOT add explanation, intro, outro, or markdown formatting.

      Here are the tasks: ${JSON.stringify(tasks)}
    `;

    const rawResponse = await generateContent(prompt);
    // console.log("AI Response:", rawResponse);
    // Try extracting valid JSON
    let text;
    if (rawResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = rawResponse.candidates[0].content.parts[0].text;
      console.log("Extracted text from AI response:", text);
    } else if (typeof rawResponse === 'string') {
      text = rawResponse;
    } else {
      throw new Error("Invalid response from AI");
    }

    const cleaned = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    let parsedResult;

    try {
      parsedResult = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ JSON parsing failed, returning raw text");
      parsedResult = text;
    }

    res.status(200).json({
      message: parsedResult,
      remainingTries: (user.rateLimit.maxPerDay ) - user.rateLimit.count,
    });


  } catch (error) {
    console.error("❌ AI generation failed:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
