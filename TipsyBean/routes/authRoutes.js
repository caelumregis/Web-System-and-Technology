const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


// Login for existing user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    res.status(200).json({ 
      message: "Login successful!", 
      user: { username: user.username } 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

