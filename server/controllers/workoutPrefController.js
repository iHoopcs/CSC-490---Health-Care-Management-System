const User = require('../Models/user.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');
const { formatDate } = require('../utility/dateUtils.js');


const createWorkoutPreferences = async (req, res) => {
  const {
    userEmail,
    workoutPlan,
    workoutSchedule,
    healthIssues,
    gymAccess,
    homeEquipment,
  } = req.body;

  const date = new Date();
  const dateCreated = formatDate(date);

  User.findOne({
    email: userEmail
  })
    .then(async (foundUser) => {
      if (foundUser) {
        // Check if WorkoutPrefs already exists for this user
        let workoutPrefs = await WorkoutPrefs.findOneAndUpdate(
          { userEmail: userEmail },
          {
            workoutPlan: workoutPlan,
            workoutSchedule: workoutSchedule,
            healthIssues: healthIssues,
            gymAccess: gymAccess,
            homeEquipment: homeEquipment,
            dateCreated: dateCreated
          },
          { new: true, upsert: true }
        );

        console.log('Workout preferences updated or created');

        return res.status(200).json({
          msg: 'Workout Preferences Updated or Created',
          workoutPrefs: workoutPrefs
        })
      }
      else {
        console.log('no user exists');
        return res.status(400).send('Could not find account with inputted email')
      }
    })
}

module.exports = {
  updateWorkoutPreferences: createWorkoutPreferences,
}
