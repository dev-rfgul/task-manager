import express from 'express'


import { addTask, getAllTasks, deleteTask, updateTask, updateTaskStatus,getTodayTasks, getTomorrowTasks, getUpcomingTasks } from '../controllers/task.controller.js'

const router = express.Router();

router.post('/addTask', addTask)
router.get('/getAllTasks/:id', getAllTasks)//fetch all the tasks of the specific user on the basis of user id
router.delete('/deleteTask/:id', deleteTask)
router.put('/updateTask', updateTask)
router.post('/updateTaskStatus', updateTaskStatus)
router.get('/getTodayTasks/:id', getTodayTasks) // Assuming this is the same as getAllTasks for today
router.get('/getTomorrowTasks/:id', getTomorrowTasks) // Assuming this is the same as getAllTasks for tomorrow    
router.get('/getUpcomingTasks/:id',getUpcomingTasks)
export default router;