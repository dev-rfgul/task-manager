import express from 'express'


import { addTask } from '../controllers/task.controller.js'

const app=express();

app.post('/addTask',addTask)

export default app;