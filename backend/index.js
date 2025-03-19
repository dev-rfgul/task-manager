import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'



import userRoutes from './routes/user.routes.js';
import {connectDB}from './config/db.js'

dotenv.config();    
const app = express();
app.use(express.json())
connectDB();

const corsOptions = {
    Credential:true,
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions)); 



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
})


app.use('/user',userRoutes);




app.listen(3000, console.log(`http://localhost:3000`));   