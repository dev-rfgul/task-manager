import express from 'express'
import { generateContent } from "../controllers/aiResponse.controller.js";


const app = express();




const reqData = [
    {
      message: "Fetched tasks successfully",
      tasks: [
        {
          _id: "67f7a6b18038e384842a0824",
          title: "work on assignment",
          dueDate: "2025-04-12T11:08:00.000Z",
          priority: "Medium",
          estTime: 70
        },
        {
          _id: "67f7a6d78038e384842a082c",
          title: "prepare for quiz",
          dueDate: "2025-04-12T11:09:00.000Z",
          priority: "Medium",
          estTime: 120
        },
        {
          _id: "67f7a78c626f380d750e00aa",
          title: "visit a friend",
          dueDate: "2025-04-11T11:09:00.000Z",
          priority: "Medium",
          estTime: 50
        },
        {
          _id: "67f7a7e6d6d23bc1af779533",
          title: "push code to deployemnt",
          dueDate: "2025-04-10T11:13:00.000Z",
          priority: "Low",
          estTime: 10
        },
        {
          _id: "67f7a8931be0f82e111f1bc0",
          title: "prepare for the exam",
          dueDate: "2025-04-20T11:16:00.000Z",
          priority: "Urgent",
          estTime: 200
        }
      ]
    }
  ]


app.get('/', async (req, res) => {
    try {
        const result = await generateContent(`
            You are a helpful assistant. I will give you a list of tasks.
            Rearrange the tasks based on:
            1. Earliest due date (ascending)
            2. Shortest estimated time to complete
            3. Priority: Urgent > High > Medium > Low

            Your response **must** be a JSON array of objects in the following format:
            [
              {
                "title": "task title here",
                "reason": "short 1-line reason why this task is at this position"
              },
              ...
            ]

            Do NOT add any explanation, intro, outro, or markdown formatting.
            Here are the tasks: ${JSON.stringify(reqData[0].tasks)}
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