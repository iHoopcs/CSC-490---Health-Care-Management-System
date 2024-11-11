const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
  userEmail: String,
  plan: String,
  date: String,
  completion: Boolean,
  foods: [],
});

const mealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = mealPlan;
