const Workout = require('../Models/workout.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const exerciseController = require('../controllers/exerciseController');

const exerciseTypes =
  ['cardio', 'strength', 'stretching', 'strongman', 'powerlifting',
    'ploymetrics', 'olympic_weightlifting'];

/*
 * generates a workout that consists of a mix of exercises
 */
const generateWorkout = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const planPrefs = await WorkoutPrefs.findOne({ userEmail: userEmail });

  console.log(userEmail);
  console.log(planPrefs);

  try {
    let exerciseData = [];

    for (let type of exerciseTypes) {
      let data = await exerciseController.fetchExercises(type, req, res);
      exerciseData = exerciseData.concat(data);
    }

    if (Array.isArray(exerciseData)) {
      let exercises = [];
      exercises = filterExercisesByPlan(exerciseData, planPrefs);

      const workout = new Workout({
        plan: planPrefs.workoutPlan,
        date: new Date().toISOString(),
        completion: false,
        exercises: exercises,
      });

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
function filterExercisesByPlan(exerciseData, planPrefs) {
  let exercises = [];

  for (let data of exerciseData) {
    const exercise = {
      name: data.name,
      muscle: data.muscle,
      type: data.type,
      equipment: data.equipment,
      difficulty: data.difficulty,
      instructions: data.instructions,
      duration: calculateExerciseDuration(data.difficulty)
    }

    exercises.push(exercise);
  }

  exercises = exercises.reduce((unique, exercise) => {
    return unique.filter(e => e.name === exercise.name).length > 0 ? unique : [...unique, exercise];
  }, []);

  if (planPrefs.healthIssues != null || planPrefs.healthIssues != '') {
    exercises = exercises.filter(exercise => exercise.difficulty != 'expert');
  }

  if (planPrefs.gymAccess == false) {
    exercises = exercises.filter(exercise => exercise.equipment != 'machine');
    exercises = exercises.filter(exercise => planPrefs.homeEquipment.includes(exercise.equipment) || exercise.equipment == 'body_only');
  }

  if (planPrefs.workoutPlan == 'weight-loss') {
    let cardioExercises = exercises.filter(exercise => exercise.type === 'cardio');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');
    let plyometricExercises = exercises.filter(exercise => exercise.type === 'plyometric');

    let selectedCardio = getRandomElements(cardioExercises, 4);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedPlyometric = getRandomElements(plyometricExercises, 1);

    return [...selectedCardio, ...selectedStretch, ...selectedPlyometric];
  }
  else if (planPrefs.workoutPlan == 'casual') {
    let cardioExercises = exercises.filter(exercise => exercise.type === 'cardio');
    let strengthExercises = exercises.filter(exercise => exercise.type === 'strength');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');

    let selectedCardio = getRandomElements(cardioExercises, 2);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);

    return [...selectedCardio, ...selectedStretch, ...selectedStrength];
  }
  else if (planPrefs.workoutPlan == 'build-muscle') {
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
    case 'expert':
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

