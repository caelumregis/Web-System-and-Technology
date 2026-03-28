const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("DATABASE ERROR:", err.message); 
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    res.status(200).json({ 
      message: "Login successful!", 
      user: { firstName: user.firstName } 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;