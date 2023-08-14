const express = require('express');
const router = express.Router();
const axios = require('axios');

// Recipe search routes
router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
