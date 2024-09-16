const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const workoutPrefController = require('../controllers/workoutPrefController');

router.post('/plan', (req, res) => {
  workoutController.generateWorkout(req, res);
});

router.post('/userPreferences', (req, res) => {
  workoutPrefController.updateWorkoutPreferences(req, res);
});

module.exports = router;
