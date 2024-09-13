const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exercise = require('../Models/exercise.js');


const workoutSchema = new Schema({
  plan: String,
  date: String,
  completion: Boolean,
  exercises: [Exercise.schema],
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
