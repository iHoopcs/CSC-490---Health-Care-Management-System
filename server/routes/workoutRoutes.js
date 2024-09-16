const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.post('/plan', (req, res) => {
  workoutController.generateWorkout(req, res);
});

module.exports = router;
