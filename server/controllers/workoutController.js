const Exercise = require('../Models/exercise.js');
const exerciseController = require('../controllers/exerciseController');

const plans =
  ['casual', 'weight-loss', 'building-muscle']

const exerciseTypes =
  ['cardio', 'strength', 'stretching', 'strongman', 'powerlifting',
    'ploymetrics', 'olympic_weightlifting'];

const generateWorkout = async (workoutPlan, req, res) => {
  if (!plans.includes(workoutPlan)) {
    console.error(`Invalid workout plan: ${workoutPlan}`);
    throw new Error(`Invalid workout plan: ${workoutPlan}`);
  }

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
  // TODO: since api does not provide reps / time we should provide a duration
  // for each exercise based on difficulty
  // TODO: find if user has access to equipment then allow equipment use for
  // now assume access to equipment excluding large machines

  exerciseData = exerciseData.reduce((unique, exercise) => {
    return unique.filter(e => e.name === exercise.name).length > 0 ? unique : [...unique, exercise];
  }, []);


  exerciseData = exerciseData.filter(exercise => exercise.equipment != 'machine');

  if (workoutPlan == 'weight-loss') {
    let cardioExercises = exerciseData.filter(exercise => exercise.type === 'cardio');
    let stretchExercises = exerciseData.filter(exercise => exercise.type === 'stretching');
    let plyometricExercises = exerciseData.filter(exercise => exercise.type === 'plyometric');

    let selectedCardio = getRandomElements(cardioExercises, 4);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedPlyometric = getRandomElements(plyometricExercises, 1);

    return [...selectedCardio, ...selectedStretch, ...selectedPlyometric];
  }
  else if (workoutPlan == 'casual') {
    let cardioExercises = exerciseData.filter(exercise => exercise.type === 'cardio');
    let strengthExercises = exerciseData.filter(exercise => exercise.type === 'strength');
    let stretchExercises = exerciseData.filter(exercise => exercise.type === 'stretching');

    let selectedCardio = getRandomElements(cardioExercises, 2);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);

    return [...selectedCardio, ...selectedStretch, ...selectedStrength];
  }
  else if (workoutPlan == 'building-muscle') {
    let strengthExercises = exerciseData.filter(exercise => exercise.type === 'strength');
    let powerliftingExercises = exerciseData.filter(exercise => exercise.type === 'powerlifting');
    let olympicExercises = exerciseData.filter(exercise => exercise.type === 'olympic_weightlifting');
    let stretchExercises = exerciseData.filter(exercise => exercise.type === 'stretching');

    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);
    let selectedPowerlifting = getRandomElements(powerliftingExercises, 2);
    let selectedOlympic = getRandomElements(olympicExercises, 2);

    return [...selectedStretch, ...selectedStrength, ...selectedPowerlifting, ...selectedOlympic];
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

