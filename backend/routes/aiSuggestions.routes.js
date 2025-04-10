import express from 'express'
import { generateContent } from "../controllers/aiResponse.controller.js";


const app = express();




const reqData = [

    {
        "message": "Fetched tasks successfully",
        "tasks": [
        {
        "_id": "67f7a6b18038e384842a0824",
        "user_id": "67db052384187f9f3a970a57",
        "title": "work on assignment",
        "description": "assignment of the subject web systems",
        "dueDate": "2025-04-12T11:08:00.000Z",
        "priority": "Medium",
        "createdAt": "2025-04-10T11:08:33.158Z",
        "updatedAt": "2025-04-10T11:14:16.081Z",
        "__v": 0,
        "estTime": 70
        },
        {
        "_id": "67f7a6d78038e384842a082c",
        "user_id": "67db052384187f9f3a970a57",
        "title": "prepare for quiz",
        "description": "quiz of the theory of automata",
        "dueDate": "2025-04-12T11:09:00.000Z",
        "priority": "Medium",
        "createdAt": "2025-04-10T11:09:11.584Z",
        "updatedAt": "2025-04-10T11:14:27.772Z",
        "__v": 0,
        "estTime": 120
        },
        {
        "_id": "67f7a78c626f380d750e00aa",
        "user_id": "67db052384187f9f3a970a57",
        "title": "visit a friend",
        "description": "must visit friend who is in hospital",
        "dueDate": "2025-04-11T11:09:00.000Z",
        "priority": "Medium",
        "createdAt": "2025-04-10T11:12:12.624Z",
        "updatedAt": "2025-04-10T11:14:08.828Z",
        "__v": 0,
        "estTime": 50
        },
        {
        "_id": "67f7a7e6d6d23bc1af779533",
        "user_id": "67db052384187f9f3a970a57",
        "title": "push code to deployemnt",
        "description": "push code to dep, to mantain the github streak",
        "estTime": 10,
        "dueDate": "2025-04-10T11:13:00.000Z",
        "priority": "Low",
        "createdAt": "2025-04-10T11:13:42.996Z",
        "updatedAt": "2025-04-10T11:13:42.996Z",
        "__v": 0
        },
        {
        "_id": "67f7a8931be0f82e111f1bc0",
        "user_id": "67db052384187f9f3a970a57",
        "title": "prepare for the exam",
        "description": "prepare for the mid sem exams which are from next week",
        "estTime": 200,
        "dueDate": "2025-04-20T11:16:00.000Z",
        "priority": "Urgent",
        "createdAt": "2025-04-10T11:16:35.774Z",
        "updatedAt": "2025-04-10T11:16:35.774Z",
        "__v": 0
        }
        ]
        

}]

app.get('/', async (req, res) => {
    try {
        const result = await generateContent(`Analyze these tasks carefully  and rearrange them on the basis of their due date,estimate time to complete and priority and just retun their names with the reason why , you have gived this task this priority in just 1 line: ${JSON.stringify(reqData[0].tasks)}`)
        console.log(result)
        res.status(200).json({ message: result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default app;