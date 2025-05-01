import express from 'express'
import { generateContent } from "../controllers/aiResponse.controller.js";
import { getUserTasks } from '../controllers/task.controller.js';


const app = express();







app.post('/:id', async (req, res) => {
  const userID = req.params.id;
  console.log(userID)
  const tasks = await getUserTasks(userID); // fetch tasks from DB
  console.log(tasks)

  try {
    const result = await generateContent(`
            You are a helpful assistant. I will give you a list of tasks.
            Emotional Impact: Prioritize tasks that involve loved ones or critical situations.

Urgency & Importance: Handle time-sensitive tasks first (e.g., deadlines).

Time Efficiency: Give priority to quick tasks that have a significant impact.

Long-Term Impact: Consider tasks that may not be urgent but are crucial for the future.

Duration & Energy: Factor in how long tasks take and manage them accordingly.

Arrange tasks in a human-like way, balancing emotional context, urgency, and impact.
           

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

    res.status(200).json({ message: parsedResult })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})



export default app;