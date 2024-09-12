const Exercise = require('../Models/exercise.js');
const exerciseController = require('../controllers/exerciseController');

const plans =
  ['casual', 'weight-loss', 'building-muscle']

const exerciseTypes =
  ['cardio', 'strength', 'strecthing', 'strongman', 'powerlifting', 'ploymetrics'];

const generateWorkout = async (workoutPlan, req, res) => {
  try {
    let exerciseData = [];

    for (let type of exerciseTypes) {
      let data = await exerciseController.fetchExercises(type, req, res);
      exerciseData = exerciseData.concat(data);
    }

    if (Array.isArray(exerciseData)) {
      let exercises = filterExercisesByPlan(exerciseData, workoutPlan);
      return res.json(exercises);
    } else {
      console.error('fetchExercises did not return an array');
    }
  }
  catch (error) {
    console.error('Error fetching exercises:', error);
  }

}

function filterExercisesByPlan(exerciseData, workoutPlan) {
  if (workoutPlan = 'casual') {
    let cardioExercises = exerciseData.filter(exercise => exercise.type === 'cardio');
    let stretchExercises = exerciseData.filter(exercise => exercise.type === 'stretch');
    let plyometricExercises = exerciseData.filter(exercise => exercise.type === 'plyometric');

    let selectedCardio = getRandomElements(cardioExercises, 4);
    let selectedStretch = getRandomElements(stretchExercises, 3);
    let selectedPlyometric = getRandomElements(plyometricExercises, 1);

    selectedCardio.forEach(exercise => console.log(exercise.name));

    return [...selectedCardio, ...selectedStretch, ...selectedPlyometric];
  }
  else if (workoutPlan = 'weight-loss') {

  }
  else if (workoutPlan = 'building-muscle') {

  }
}

/*
 * Gets random elements from an array
 */
function getRandomElements(arr, count) {
  // Shuffle the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  return arr.slice(0, count);
}

module.exports = {
  generateWorkout,
}

