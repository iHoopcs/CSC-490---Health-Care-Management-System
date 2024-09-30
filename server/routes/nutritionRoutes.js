const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.post('/search', (req, res) => {
  nutritionController.searchFood(req, res);
});

router.post('/search', (req, res) => {
  nutritionController.searchFood(req, res);
});

router.post('/genPlan', (req, res) => {
  nutritionController.generateWeekPlan(req, res);
});


module.exports = router;
