const oAuthGen = require('../utility/oAuthGen');
const User = require('../Models/user.js');
const MealPlan = require('../Models/mealPlan.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const { getUnique, getRandomElements } = require('../utility/arrayUtils.js');
const { formatDate, parseDate, getDaysFromDate } = require('../utility/dateUtils.js');

const weight_loss_terms = ['leafy greens', 'fish', 'chicken breast',
  'lean meat', 'beans', 'soups', 'fruit'];

async function findFoods(searchTerms, amount) {
  const foodSearch = {
    method: 'foods.search',
    search_expression: searchTerms,
    max_results: amount
  };
  try {

    let url = 'https://platform.fatsecret.com/rest/server.api';
    let httpMethod = 'POST';

    const result = new oAuthGen(httpMethod, url, foodSearch);

    const response = await fetch(`${url}?${result.paramString}&oauth_signature=${result.signature}`, {
      method: 'POST'
    });

    const data = await response.json()

    return data.foods.food;
  }
  catch (error) {
    console.error(`Error fetching foods: ${error}`);
    return null;
  }
}

const searchFood = async (req, res) => {
  const searchTerms = req.body.searchTerms;
  return res.json(await findFoods(searchTerms, 1));
};

const findMealPlanByDate = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const date = String(req.body.date);

  return res.json
    (
      await MealPlan.findOne({ userEmail: userEmail, date: date })
    );
}

const setMealComplete = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const date = String(req.body.date);

  const mealPlan = await MealPlan.findOne({ userEmail: userEmail, date: date })

  if (!mealPlan) {
    return res.status(404).json({ error: 'Meal plan not found' });
  }

  mealPlan.completion = true;
  await mealPlan.save();

  return res.json('meal set complete');
}

const updateNutritionPlan = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const planPrefs = await WorkoutPrefs.findOne({ userEmail: userEmail });

  const currentRawDate = new Date();
  const currentDate = formatDate(currentRawDate);
  const futureDates = getDaysFromDate(currentDate, 30);

  let dateWithoutMealPlan;
  let mealsUpToDate = false;

  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < futureDates.length; i++) {
      let mealPlan = await MealPlan.findOne({ userEmail: userEmail, date: futureDates[i] });

      console.log(futureDates[i]);

      if (!mealPlan) {
        dateWithoutMealPlan = futureDates[i];
        mealsUpToDate = false;
        console.log("meal 1")
        break;
      }
      else {
        mealsUpToDate = true;
        dateWithoutMealPlan = null;
      }
    }

    if (dateWithoutMealPlan != null) {
      const newMealWeek = await generateWeekPlan(req, res);
      const newMealDates = getDaysFromDate(dateWithoutMealPlan, newMealWeek.length - 1);

      for (let i = 0; i < newMealWeek.length; i++) {
        const newMealPlan = new MealPlan({
          userEmail: userEmail,
          plan: planPrefs.workoutPlan,
          date: newMealDates[i],
          completion: false,
          foods: newMealWeek[i].foods
        });

        console.log('pass');

        await newMealPlan.save();
      }
    }
    else {
      console.log("meals already up to date");
      return res.json('meals already up to date');
    }
  }
  return res.json('meal plans updated');
}

const generateWeekPlan = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const planPrefs = await WorkoutPrefs.findOne({ userEmail: userEmail });
    let nutritionPlan = 'default';

    if (planPrefs != null) {
      nutritionPlan = planPrefs.workoutPlan;
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', 'Sunday']
    let foods = [];
    let foodDayPlans = [];
    const maxFoodsPerDay = 5;
    const maxCaloriesPerDay = 2000;

    for (let i = 0; i < 7; i++) {
      const newFoods = await findFoods(weight_loss_terms[i], maxFoodsPerDay);
      foods = foods.concat(newFoods);
    }

    foods = getUnique(foods);
    foods = getRandomElements(foods);

    for (let i = 0; i < days.length; i++) {
      let totalCalories = 0;
      let dailyFoods = [];

      for (let j = i * maxFoodsPerDay; j < (i + 1) * maxFoodsPerDay; j++) {
        let caloriesMatch = foods[j].food_description.match(/Calories:\s*(\d+)kcal/);
        let calories = parseInt(caloriesMatch[1]);

        if (totalCalories + calories <= maxCaloriesPerDay) {
          totalCalories += calories;
          dailyFoods.push(foods[j]);
        }
      }

      foodDayPlans.push({
        day: days[i],
        foods: dailyFoods
      });
    }

    return foodDayPlans;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  searchFood: searchFood,
  generateWeekPlan: generateWeekPlan,
  updatePlan: updateNutritionPlan,
  findMealPlanByDate: findMealPlanByDate,
  setMealComplete: setMealComplete
}
