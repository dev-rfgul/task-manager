import express from 'express'


import { addTask, getAllTasks, deleteTask, updateTask } from '../controllers/task.controller.js'

const app = express();

app.post('/addTask', addTask)
app.get('/getAllTasks/:id', getAllTasks)//fetch all the tasks of the specific user on the basis of user id
app.delete('/deleteTask/:id', deleteTask)
app.put('/updateTask', updateTask)

export default app;