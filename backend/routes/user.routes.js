import express from 'express'


import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'

const app = express();

app.get('/register',registerUser);
app.get('/login',loginUser);
app.get('/logout',logoutUser);  

export default app;