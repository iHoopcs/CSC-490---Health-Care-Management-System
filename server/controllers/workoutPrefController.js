const User = require('../Models/user.js');
const WorkoutPrefs = require('../Models/workoutPrefs.js');

const createWorkoutPreferences = async (req, res) => {
  const {
    userEmail,
    workoutSchedule,
    healthIssues,
    gymAccess,
    homeEquipment,
  } = req.body;

  User.findOne({
    email: userEmail
  })
    .then(async (foundUser) => {
      if (foundUser) {
        const newWorkoutPrefs = new WorkoutPrefs({
          userEmail: userEmail,
          workoutSchedule: workoutSchedule,
          healthIssues: healthIssues,
          gymAccess: gymAccess,
          homeEquipment: homeEquipment,
        });

        await newWorkoutPrefs.save();

        return res.status(200).json({
          msg: 'Workout Preferences Created',
          workoutPrefs: newWorkoutPrefs
        })
      }
      else {
        return res.status(400).send('Could not find account with inputted email')
      }
    })
}


module.exports = {
  updateWorkoutPreferences: createWorkoutPreferences,
}
