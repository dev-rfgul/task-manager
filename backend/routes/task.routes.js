import express from 'express'


import { addTask, getAllTasks, deleteTask } from '../controllers/task.controller.js'

const app = express();

app.post('/addTask', addTask)
app.get('/getAllTasks/:id', getAllTasks)
app.delete('/deleteTask/:id', deleteTask)

export default app;