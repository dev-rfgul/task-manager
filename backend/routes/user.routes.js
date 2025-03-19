import express from 'express'


import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'

const app = express();

app.post('/register',registerUser);
app.post('/login',loginUser);
app.post('/logout',logoutUser);  


// the functionality is to be added here.
export default app;