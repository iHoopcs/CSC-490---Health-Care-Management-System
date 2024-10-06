const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workoutSchema = new Schema({
  userEmail: String,
  plan: String,
  date: String,
  completion: Boolean,
  exercises: [],
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
