import express from 'express'


import {registerUser,loginUser,logoutUser,getAllUsers,createGuestUser} from '../controllers/user.controller.js'
// import { get } from 'mongoose';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);  
router.get('/logout',logoutUser); 
router.get('/getAllUsers',getAllUsers);
router.get('/guest',createGuestUser);


// the functionality is to be added here.
export default router;