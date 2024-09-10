const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/biceps', (req, res) => exerciseController.
  fetchExercises('biceps', req, res));

module.exports = router;
