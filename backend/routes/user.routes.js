import express from 'express'


import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'

const app = express();

app.post('/register',registerUser);
app.get('/login',loginUser);
app.get('/logout',logoutUser);  


// the functionality is to be added here. 
export default app;