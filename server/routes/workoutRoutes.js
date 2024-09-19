const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const workoutPrefController = require('../controllers/workoutPrefController');
const WorkoutPrefs = require('../Models/workoutPrefs');

router.post('/plan', (req, res) => {
  workoutController.generateWorkout(req, res);
});

router.post('/userPreferences', (req, res) => {
  workoutPrefController.updateWorkoutPreferences(req, res);
});

router.get('/userPreferences', (req, res) => {
  const email = req.query.userEmail;

  WorkoutPrefs.findOne({ userEmail: email })
    .then(workoutPref => {
      if (workoutPref) {
        res.json(workoutPref);
      } else {
        res.status(404).json({ error: "No WorkoutPref found for this email" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
