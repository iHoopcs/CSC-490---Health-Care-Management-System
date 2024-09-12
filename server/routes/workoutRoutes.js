const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get('/:plan', (req, res) => {
  const plan = req.params.plan;
  workoutController.generateWorkout(plan, req, res);
});

module.exports = router;
