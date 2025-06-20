import express from 'express'


import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);  


// the functionality is to be added here.
export default router;