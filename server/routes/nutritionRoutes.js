const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.post('/search', (req, res) => {
  nutritionController.searchFoods(req, res);
});


module.exports = router;
