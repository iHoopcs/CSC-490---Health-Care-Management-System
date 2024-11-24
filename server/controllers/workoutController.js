const Workout = require('../Models/workout.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const User = require('../Models/user.js');
const exerciseController = require('../controllers/exerciseController');
const { formatDate, parseDate, getDaysFromDate, filterDateDays, removeDatesBefore } = require('../utility/dateUtils.js');


const exerciseTypes =
  ['cardio', 'strength', 'stretching', 'strongman', 'powerlifting',
    'ploymetrics', 'olympic_weightlifting'];

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


const updateWorkoutMonth = async (req, res) => {
  try {
    const userEmail = String(req.body.userEmail);
    const planPrefs = await WorkoutPrefs.findOne({ userEmail: userEmail });

    const currentRawDate = new Date();
    const currentDate = formatDate(currentRawDate);
    let futureDates = getDaysFromDate(currentDate, 7);
    futureDates = filterDateDays(futureDates, planPrefs.workoutSchedule);

    for (let i = 0; i < futureDates.length; i++) {
      let workout = await Workout.findOne({ userEmail: userEmail, date: futureDates[i] });

      if (!workout) {
        let generatedWorkout = await generateWorkout(req, res);
        let exercises = generatedWorkout.exercises;

        let newWorkout = new Workout({
          userEmail: userEmail,
          plan: planPrefs.workoutPlan,
          date: futureDates[i],
          completion: false,
          exercises: exercises,
        });

        await newWorkout.save();
      }
    }

    res.status(201).json({
      msg: '*Workouts Created*'
    })
  }
  catch (err) {
    console.error('Error updating workouts:', err);
    res.status(400).send(err);
  }
}


/* finds a workout from the user from thier email and
 * an ISO date string
 */
const findWorkout = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const date = String(req.body.date);

  const workout = await Workout.findOne({ userEmail: userEmail, date: date });

  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }

  return res.status(200).json(workout);
}


const deleteWorkouts = async (req, res) => {
  try {
    const userEmail = String(req.body.userEmail);

    const result = await Workout.deleteMany({ userEmail: userEmail });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No workouts found for this user' });
    }

    return res.status(200).json({ message: 'All workouts deleted successfully' });
  } catch (err) {
    console.error('Error deleting workouts:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const setWorkoutComplete = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const date = String(req.body.date);

  const workout = await Workout.findOne({ userEmail: userEmail, date: date });

  workout.completion = true;
  workout.save();

  return res.json('workout on ' + date + ' set complete');
}

/*
 * generates a workout that consists of a mix of exercises
 */
const generateWorkout = async (req, res) => {
  const userEmail = String(req.body.userEmail);
  const planPrefs = await WorkoutPrefs.findOne({ userEmail: userEmail });

  try {
    let exerciseData = [];

    for (let type of exerciseTypes) {
      let data = await exerciseController.fetchExercises(type, req, res);
      exerciseData = exerciseData.concat(data);
    }

    if (Array.isArray(exerciseData)) {
      let exercises = [];
      exercises = filterExercisesByPlan(exerciseData, planPrefs);
      let currentDate = new Date().toISOString().split('T')[0];

      const workout = new Workout({
        plan: planPrefs.workoutPlan,
        date: currentDate,
        completion: false,
        exercises: exercises,
      });

      return workout;
    } else {
      console.error('fetchExercises did not return an array');
    }
  }
  catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

const provideSampleWorkout = async (req, res) => {
  const workout = await generateWorkout(req, res);
  return res.json(workout);
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
      duration: 0,
      reps: 0,
    }

    exercises.push(exercise);
  }

  // filter adding duration or reps based on muscle
  exercises.forEach((exercise) => {
    if (exercise.type === 'cardio') {
      exercise.duration = calculateExerciseDuration(exercise.difficulty);
    }
    else {
      exercise.reps = calculateExerciseReps(exercise.difficulty);
    }
  });

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

    let finalExercises = [...selectedCardio, ...selectedStretch, ...selectedPlyometric];
    finalExercises = getRandomElements(finalExercises, finalExercises.length);

    return finalExercises;
  }
  else if (planPrefs.workoutPlan == 'casual') {
    let cardioExercises = exercises.filter(exercise => exercise.type === 'cardio');
    let strengthExercises = exercises.filter(exercise => exercise.type === 'strength');
    let stretchExercises = exercises.filter(exercise => exercise.type === 'stretching');

    let selectedCardio = getRandomElements(cardioExercises, 2);
    let selectedStretch = getRandomElements(stretchExercises, 2);
    let selectedStrength = getRandomElements(strengthExercises, 3);

    let finalExercises = [...selectedCardio, ...selectedStretch, ...selectedStrength];
    finalExercises = getRandomElements(finalExercises, finalExercises.length);

    return finalExercises;
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

    let finalExercises = [...selectedStretch, ...selectedStrength, ...selectedPowerlifting, ...selectedOlympic];
    finalExercises = getRandomElements(finalExercises, finalExercises.length);

    return finalExercises;
  }
}

/*
 * Calculate the exercises duration in minutes based on its difficulty,
 * additional information could also be used in the future to adjust this value
 */
function calculateExerciseDuration(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return 15;
    case 'intermediate':
      return 10;
    case 'expert':
      return 5;
    default:
      return 3;
  }
}

function calculateExerciseReps(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return 10;
    case 'intermediate':
      return 15;
    case 'expert':
      return 8;
    default:
      return 5;
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


const getCompleteCount = async (req, res) => {
  const userEmail = req.query.email;

  try {
    const workouts = await Workout.find({ userEmail: userEmail });
    const completedWorkouts = workouts.filter(workout => workout.completion == true);

    res.json({
      completeCount: completedWorkouts.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentStreak = async (req, res) => {
  const userEmail = req.query.email;

  try {
    const workouts = await Workout.find({ userEmail: userEmail });

    const todaysDate = new Date();

    const tomorrowsDate = new Date(todaysDate);
    tomorrowsDate.setDate(todaysDate.getDate() + 1);

    const formattedDate = new Date(todaysDate).toLocaleDateString('en-CA'); // 'en-CA' locale formats date as yyyy-mm-dd

    const lastWorkouts = workouts
      .filter(workout => new Date(workout.date) <= todaysDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    let currentStreak = 0;

    for (const workout of lastWorkouts) {
      if (workout.completion == true) {
        currentStreak++;
      } else {
        break;
      }
    }

    res.json({
      streak: currentStreak
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  provideSampleWorkout,
  updateWorkoutMonth,
  findWorkout,
  setWorkoutComplete,
  deleteWorkouts,
  getCompleteCount,
  getCurrentStreak,
}

