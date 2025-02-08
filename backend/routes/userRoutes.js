import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).json({ message: 'Login successful', user: existingUser });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

userRouter.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Internal Server Error');
  }
});
userRouter.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { username, newEmail, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (username) user.username = username;
    if (newEmail) user.email = newEmail;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default userRouter;
