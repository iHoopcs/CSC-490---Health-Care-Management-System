const Exercise = require('../Models/exercise.js');
const Workout = require('../Models/workout.js');
const exerciseController = require('../controllers/exerciseController');

const plans =
  ['casual', 'weight-loss', 'building-muscle']

const exerciseTypes =
  ['cardio', 'strength', 'stretching', 'strongman', 'powerlifting',
    'ploymetrics', 'olympic_weightlifting'];

/*
 * generates a workout that consists of a mix of exercises
 */
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
      let exercises = [];
      exercises = filterExercisesByPlan(exerciseData, workoutPlan);

      const workout = new Workout({
        plan: workoutPlan,
        date: new Date().toISOString(),
        completion: false,
        exercises: exercises,
      });

      await workout.save();

      return res.json(workout);
    } else {
      console.error('fetchExercises did not return an array');
    }
  }
  catch (error) {
    console.error('Error fetching exercises:', error);
  }

}

/*
 * the algorithim for sorting exercises returned from the api, currently
 * it is based on the workoutplan provided by the user but could include
 * more information from the user as the application grows
 */
function filterExercisesByPlan(exerciseData, workoutPlan) {
  // TODO: since api does not provide reps / time we should provide a duration
  // for each exercise based on difficulty
  // TODO: find if user has access to equipment then allow equipment use for
  // now assume access to equipment excluding large machines

  exerciseData = exerciseData.reduce((unique, exercise) => {
    return unique.filter(e => e.name === exercise.name).length > 0 ? unique : [...unique, exercise];
  }, []);

  exerciseData = exerciseData.filter(exercise => exercise.equipment != 'machine');

  let exercises = [];

  for (let data of exerciseData) {
    const exercise = new Exercise({
      name: data.name,
      muscle: data.muscle,
      type: data.type,
      equipment: data.equipment,
      difficulty: data.difficulty,
      instructions: data.instructions,
      duration: calculateExerciseDuration(data.difficulty)
    })

    exercises.push(exercise);
  }

  if (workoutPlan == 'weight-loss') {
    let cardioExercises = exercises.filter(exercise => exercise.type === 'cardio');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');
    let plyometricExercises = exercises.filter(exercise => exercise.type === 'plyometric');

    let selectedCardio = getRandomElements(cardioExercises, 4);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedPlyometric = getRandomElements(plyometricExercises, 1);

    return [...selectedCardio, ...selectedStretch, ...selectedPlyometric];
  }
  else if (workoutPlan == 'casual') {
    let cardioExercises = exercises.filter(exercise => exercise.type === 'cardio');
    let strengthExercises = exercises.filter(exercise => exercise.type === 'strength');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');

    let selectedCardio = getRandomElements(cardioExercises, 2);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);

    return [...selectedCardio, ...selectedStretch, ...selectedStrength];
  }
  else if (workoutPlan == 'building-muscle') {
    let strengthExercises = exercises.filter(exercise => exercise.type === 'strength');
    let powerliftingExercises = exercises.filter(exercise => exercise.type === 'powerlifting');
    let olympicExercises = exercises.filter(exercise => exercise.type === 'olympic_weightlifting');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');

    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);
    let selectedPowerlifting = getRandomElements(powerliftingExercises, 2);
    let selectedOlympic = getRandomElements(olympicExercises, 2);

    return [...selectedStretch, ...selectedStrength, ...selectedPowerlifting, ...selectedOlympic];
  }
}

/*
 * Calculate the exercises duration in minutes based on its difficulty,
 * additional information could also be used in the future to adjust this value
 */
function calculateExerciseDuration(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return 10;
    case 'intermediate':
      return 5;
    case 'hard':
      return 3;
    default:
      return 3;
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

