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

router.post('/updatePlan', (req, res) => {
  nutritionController.updatePlan(req, res);
})

router.post('/findMeal', (req, res) => {
  nutritionController.findMealPlanByDate(req, res);
})

router.post('/setMealComplete', (req, res) => {
  nutritionController.setMealComplete(req, res);
})


module.exports = router;
