import express from 'express'


import { addTask, getAllTasks, deleteTask, updateTask, updateTaskStatus,getTodayTasks, getTomorrowTasks, getUpcomingTasks } from '../controllers/task.controller.js'

const app = express();

app.post('/addTask', addTask)
app.get('/getAllTasks/:id', getAllTasks)//fetch all the tasks of the specific user on the basis of user id
app.delete('/deleteTask/:id', deleteTask)
app.put('/updateTask', updateTask)
app.post('/updateTaskStatus', updateTaskStatus)
app.get('/getTodayTasks/:id', getTodayTasks) // Assuming this is the same as getAllTasks for today
app.get('/getTomorrowTasks/:id', getTomorrowTasks) // Assuming this is the same as getAllTasks for tomorrow    
app.get('/getUpcomingTasks/:id',getUpcomingTasks)
export default app;