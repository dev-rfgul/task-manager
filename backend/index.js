import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';



import { connectDB } from './config/db.js'
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import aiSuggestions from './routes/aiSuggestions.routes.js'
import whatsapp from './routes/whatsapp.routes.js'


dotenv.config();
const app = express();
app.use(express.json())
connectDB();
app.use(cookieParser());
const allowedOrigins = ['https://task-ai-tau.vercel.app', 'http://localhost:5173']
const corsOptions = {
    Credential: true,
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    Credentials: true,
}

app.use(cors(corsOptions));



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
})


app.use('/user', userRoutes);
app.use('/task', taskRoutes)
app.use('/aiSuggestion', aiSuggestions)
app.use('/whatsapp', whatsapp)



app.listen(3000, console.log(`http://localhost:3000`));
export default app;