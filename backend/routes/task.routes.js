import express from 'express'


import { addTask, getAllTasks } from '../controllers/task.controller.js'

const app = express();

app.post('/addTask', addTask)
app.get('/getAllTasks/:id', getAllTasks)

export default app;