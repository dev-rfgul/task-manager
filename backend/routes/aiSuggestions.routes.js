import express from 'express'
import { generateContent } from "../controllers/aiResponse.controller.js";
import { getUserTasks, tasksforAIArrangement } from '../controllers/task.controller.js';
import userModel from '../models/user.model.js'


const router = express.Router();


const RATE_LIMIT_MAX = 10; // example: max 5 AI calls per day
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export const checkAndUpdateRateLimit = async (user) => {
  const now = new Date();

  if (!user.rateLimit) {
    user.rateLimit = {
      count: 0,
      lastReset: now,
    };
  }

  // Check if the reset window has passed
  const timeSinceLastReset = now - new Date(user.rateLimit.lastReset);

  if (timeSinceLastReset > RATE_LIMIT_WINDOW) {
    // Reset limit
    user.rateLimit.count = 10;
    user.rateLimit.lastReset = now;
  } else {
    if (user.rateLimit.count >= RATE_LIMIT_MAX) {
      // ❌ Return status instead of throwing
      return { allowed: false, retryAfter: RATE_LIMIT_WINDOW - timeSinceLastReset };
    }

    // ✅ Still under limit, increment count
    user.rateLimit.count += 1;
  }

  await user.save();

  return { allowed: true };
};






router.post('/:id', async (req, res) => {
  const userID = req.params.id;

  const user = await userModel.findById(userID);
  if (!user) return res.status(404).json({ message: "User not found" });
  // ✅ Rate limiting check
  const rateLimitStatus = await checkAndUpdateRateLimit(user);

  if (!rateLimitStatus.allowed) {
    const minutes = Math.ceil(rateLimitStatus.retryAfter / 60000);
    return res.status(429).json({
      message: `Rate limit exceeded. Try again in ${minutes / 60} hour(s).`,
    });
  }
  const tasks = await tasksforAIArrangement(userID); // fetch tasks from DB
  console.log("tasks from ai suggestion", tasks)
  console.log(tasks)

  try {
    const result = await generateContent(`
            You are a helpful assistant. I will give you a list of tasks.
            Emotional Impact: Prioritize tasks that involve loved ones or critical situations.

            Urgency & Importance: Handle time-sensitive tasks first (e.g., deadlines, the task whose deadline is near is to be completed first).

            Time Efficiency: Give priority to quick tasks that have a significant impact.

            Long-Term Impact: Consider tasks that may not be urgent but are crucial for the future.

            Duration & Energy: Factor in how long tasks take and manage them accordingly.

            Arrange tasks in a human-like way, balancing emotional context, urgency, and impact.

            as well as keep in mind the deadline of the task.
           

            Your response **must** be a JSON array of objects in the following format:
            [
              {
                "title": "task title here",
                "reason": "short 1-line reason why you have kept this at this position",
              },
              ...
            ]

            Do NOT add any explanation, intro, outro, or markdown formatting.
            Here are the tasks: ${JSON.stringify(tasks)}
        `)

    // Log the response
    console.log(result)


    // Parse if it's a stringified JSON response (sometimes needed)
    let parsedResult
    try {
      parsedResult = JSON.parse(result)
    } catch (err) {
      // fallback, just return raw result if it's not parseable
      parsedResult = result
    }

    res.status(200).json({
      message: parsedResult,
      remainingTries: RATE_LIMIT_MAX - user.rateLimit.count
    });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})



export default router;