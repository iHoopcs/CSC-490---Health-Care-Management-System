const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutPrefs = new Schema({
  userEmail: String,
  workoutPlan: String,
  workoutSchedule: [String],
  healthIssues: [String],
  gymAccess: Boolean,
  homeEquipment: [String],
  dateCreated: String,
});

const Workout = mongoose.model('workoutPrefs', workoutPrefs);
module.exports = Workout;

