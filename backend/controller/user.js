const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exist!' });

    const user = await User.create({ name, email, password });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // optiions for cookie
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };

    res
      .status(200)
      .cookie('token', token, options)
      .json({ success: true, message: 'User created Successfuly Navigating to login page', user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all the fields!' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User don't exist!" });

    const isPasswordValid = await existingUser.comparePassword(password);

    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credintials!' });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };

    res
      .status(200)
      .cookie('token', token, options)
      .json({ success: true, message: 'login successful', existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/save-favorite-recipe', async (req, res) => {
  try {
    const { id, title, image } = req.body.data;
    const user = await User.findById('64d9c8bae0b7e290a3437ed1');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.recipe.push({ id, title, image });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/favorites-recipe', async (req, res) => {
  try {
    const recipe = await User.findById('64d9c8bae0b7e290a3437ed1').select('recipe');
    res.json(recipe);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete-favorite-recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    await User.updateOne(
      { _id: '64d9c8bae0b7e290a3437ed1' },
      {
        $pull: { recipe: { id: id } },
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
