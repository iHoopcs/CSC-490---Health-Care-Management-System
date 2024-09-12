const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/:exerciseType', (req, res) => {
  const exerciseType = req.params.exerciseType;
  exerciseController.fetchExercises(exerciseType, req, res);
});

module.exports = router;


