const oAuthGen = require('../utility/oAuthGen');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const { getUnique, getRandomElements } = require('../utility/arrayUtils.js');

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

    console.log(data);

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

    for (let i = 0; i < 7; i++) {
      const newFoods = await findFoods(weight_loss_terms[i], 8);
      foods = foods.concat(newFoods);
    }

    foods = getUnique(foods);
    foods = getRandomElements(foods);

    const foodsPerDay = Math.floor(foods.length / days.length);
    for (let i = 0; i < days.length; i++) {
      foodDayPlans.push({
        day: days[i],
        foods: foods.slice(i * foodsPerDay, (i + 1) * foodsPerDay)
      });
    }

    res.json(foodDayPlans);
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  searchFood: searchFood,
  generateWeekPlan: generateWeekPlan,
}
