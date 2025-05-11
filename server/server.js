import express from 'express';
import cors from "cors";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import chatbotRoutes from './routes/chatbot.js';
import therapistRoutes from './routes/therapistRoutes.js';

const app = express();

const port = process.env.PORT || 4000   

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://www.krafcool.com',
    credentials: true,                     
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  };
  
  // Middleware
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
connectDB();

app.get('/',(req, res)=>{
    res.send("hello world")
})
app.use('/api/auth', authRouter)
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/user', userRouter)
app.use('/api/therapists', therapistRoutes);


app.listen(port,()=>{
    console.log(`server running on PORT ${port}`);
})