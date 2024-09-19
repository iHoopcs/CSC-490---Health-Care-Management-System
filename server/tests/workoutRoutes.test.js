const request = require("supertest");
const app = require("../app.js");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");
const Workout = require("../Models/workout.js");
const Exercise = require("../Models/exercise.js");
const workoutController = require('./workoutController');

let mongoMemoryServer;
beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create(); //create in-memory db for testing
  await mongoose.connect(mongoMemoryServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

describe('Workout Model Test', () => {
  test('create & save workout successfully', async () => {
    const workoutData = {
      workoutPlan: 'weight-loss', date: '2024-01-01',
      completion: false, exercises: []
    };

    workoutData.exercises.push(new Exercise({
      name: 'pushups', muscle: 'chest', type: 'strength',
      equipment: 'body-only', difficulty: 'intermediate', instructions: 'sample-instructions', duration: 10
    }));

    const validWorkout = new Workout(workoutData);
    const savedWorkout = await validWorkout.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedWorkout._id).toBeDefined();
    expect(savedWorkout.plan).toBe(workoutData.plan);
    expect(savedWorkout.date).toBe(workoutData.date);
    expect(savedWorkout.completion).toBe(workoutData.completion);
    expect(savedWorkout.exercises).not.toHaveLength(0);
  });
});