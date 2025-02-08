import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'; 
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for all routes (important for front-end and back-end to communicate across different ports)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (in case you need it for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
