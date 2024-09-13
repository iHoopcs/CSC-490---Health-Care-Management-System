const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: String,
  muscle: String,
  type: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  duration: Number,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
