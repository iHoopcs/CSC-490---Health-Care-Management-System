const oAuthGen = require('../utility/oAuthGen');
const MealPlan = require('../Models/mealPlan.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const { getUnique, getRandomElements } = require('../utility/arrayUtils.js');
const { formatDate, parseDate, getDaysFromDate } = require('../utility/dateUtils.js');

const muscle_gain_breakfasts_terms = ['eggs', 'yougurt', 'protien smoothie'];
const muscle_gain_lunches_terms = ['grilled fish', 'shrimp', 'spinach'];
const muscle_gain_dinners_terms = ['chicken breast', 'steak', 'turkey'];
const muscle_gain_snacks_terms = ['nuts', 'hummus', 'peanut butter sandwich'];

const weight_loss_breakfasts_terms = ['fruit', 'smoothie', 'fruit salad'];
const weight_loss_lunches_terms = ['grilled chicken salad', 'quinoa bowl', 'vegetable soup'];
const weight_loss_dinners_terms = ['baked salmon', 'steamed vegetables', 'lentil stew'];
const weight_loss_snacks_terms = ['carrot sticks', 'apple slices', 'rice cakes'];

const casual_breakfasts_terms = ['pancakes', 'eggs', 'toast'];
const casual_lunches_terms = ['sandwich', 'burger', 'chicken'];
const casual_dinners_terms = ['pasta', 'tacos', 'stir-fry'];
const casual_snacks_terms = ['meal bar', 'cookies', 'popcorn'];

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

    foods = getUnique(data.foods.food);
    foods = getRandomElements(foods);
    return foods;
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

      if (!mealPlan) {
        dateWithoutMealPlan = futureDates[i];
        mealsUpToDate = false;
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

        await newMealPlan.save();
      }
    }
    else {
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

    let breakfast_terms, lunch_terms, dinner_terms, snack_terms;
    let breakfasts = [], lunches = [], dinners = [], snacks = [];

    let foodDayPlans = [];

    switch (nutritionPlan) {
      case 'weight-loss':
        breakfast_terms = weight_loss_breakfasts_terms;
        lunch_terms = weight_loss_lunches_terms;
        dinner_terms = weight_loss_dinners_terms;
        snack_terms = weight_loss_snacks_terms;
        break;
      case 'build-muscle':
        breakfast_terms = muscle_gain_breakfasts_terms;
        lunch_terms = muscle_gain_lunches_terms;
        dinner_terms = muscle_gain_dinners_terms;
        snack_terms = muscle_gain_snacks_terms;
        break;
      case 'casual':
        breakfast_terms = casual_breakfasts_terms;
        lunch_terms = casual_lunches_terms;
        dinner_terms = casual_dinners_terms;
        snack_terms = casual_snacks_terms;
        break;
      default:
        throw new Error('Unknown nutrition plan');
    }
    console.log("weight-loss breakfast terms: " + breakfast_terms.length);

    //find foods for each meal of the day
    for (let i = 0; i < breakfast_terms.length; i++) {
      if (i < breakfast_terms.length) {
        let nextBreakfasts = await findFoods(breakfast_terms[i], 5);
        nextBreakfasts = nextBreakfasts.map(food => formatFood(food, nutritionPlan));
        breakfasts.push(...nextBreakfasts);
      }
      if (i < lunch_terms.length) {
        let nextLunches = await findFoods(lunch_terms[i], 5);
        nextLunches = nextLunches.map(food => formatFood(food, nutritionPlan));
        lunches.push(...nextLunches);
      }
      if (i < dinner_terms.length) {
        let nextDinners = await findFoods(dinner_terms[i], 5);
        nextDinners = nextDinners.map(food => formatFood(food, nutritionPlan));
        dinners.push(...nextDinners);
      }
      if (i < snack_terms.length) {
        let nextSnacks = await findFoods(snack_terms[i], 5);
        nextSnacks = nextSnacks.map(food => formatFood(food, nutritionPlan));
        snacks.push(...nextSnacks);
      }

      if (nutritionPlan == 'weight-loss') {
        breakfasts = removeFoodsOverCalorieLimit(750, breakfasts);
        lunches = removeFoodsOverCalorieLimit(750, lunches);
        dinners = removeFoodsOverCalorieLimit(750, dinners);
        snacks = removeFoodsOverCalorieLimit(750, snacks);
      } else if (nutritionPlan == 'build-muscle') {
        breakfasts = removeFoodsOverCalorieLimit(1100, breakfasts);
        lunches = removeFoodsOverCalorieLimit(1100, lunches);
        dinners = removeFoodsOverCalorieLimit(1100, dinners);
        snacks = removeFoodsOverCalorieLimit(1100, snacks);
      } else {
        breakfasts = removeFoodsOverCalorieLimit(1000, breakfasts);
        lunches = removeFoodsOverCalorieLimit(1000, lunches);
        dinners = removeFoodsOverCalorieLimit(1000, dinners);
        snacks = removeFoodsOverCalorieLimit(1000, snacks);
      }
    }

    for (let i = 0; i < days.length; i++) {
      let dailyFoods = [];

      dailyFoods.push(breakfasts.pop());
      dailyFoods.push(lunches.pop());
      dailyFoods.push(dinners.pop());
      dailyFoods.push(snacks.pop());

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

const formatFood = (food, nutritionPlan) => {
  if (!food || !food.food_description) {
    console.log('no food description found');
    return null;
  }

  const description = food.food_description;

  let caloriesMatch = description.match(/Calories:\s*(\d+)kcal/);
  let proteinMatch = description.match(/Protein:\s*([\d.]+)g/);
  let carbsMatch = description.match(/Carbs:\s*([\d.]+)g/);
  let fatMatch = description.match(/Fat:\s*([\d.]+)g/);

  let calories = caloriesMatch ? parseInt(caloriesMatch[1]) : 0;
  let protein = proteinMatch ? parseFloat(proteinMatch[1]) : 0.0;
  let carbs = carbsMatch ? parseFloat(carbsMatch[1]) : 0.0;
  let fat = fatMatch ? parseFloat(fatMatch[1]) : 0.0;

  let proteinDailyValue = (protein / 50 * 100).toFixed(2);
  let carbsDailyValue = (carbs / 275 * 100).toFixed(2);
  let fatDailyValue = (fat / 75 * 100).toFixed(2);

  let servings = 1;

  console.log("nutrition plan: " + nutritionPlan);

  if (nutritionPlan == 'build-muscle') {
    while (calories * servings < 600) {
      servings++;
    }
  }
  else if (nutritionPlan == 'weight-loss') {
    while (calories * servings < 290) {
      servings++;
    }
  }
  else {
    while (calories * servings < 480) {
      servings++;
    }
  }

  return {
    name: food.food_name,
    calories: calories,
    servings: servings,
    proteinDv: proteinDailyValue,
    carbsDv: carbsDailyValue,
    fatDv: fatDailyValue,
    link: food.food_url
  };
};

const removeFoodsOverCalorieLimit = (calorieLimit, formattedFoods) => {
  return formattedFoods.filter(food => food.calories <= calorieLimit);
};


module.exports = {
  searchFood: searchFood,
  generateWeekPlan: generateWeekPlan,
  updatePlan: updateNutritionPlan,
  findMealPlanByDate: findMealPlanByDate,
  setMealComplete: setMealComplete
}
