const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Exercise = require("../Models/exercise.js");
const bcrypt = require('bcrypt');


let mongoMemoryServer;
beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create(); //create in-memory db for testing
  await mongoose.connect(mongoMemoryServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

describe("GET /api/exercises/biceps", () => {
  it('should return data for exercises for biceps', async () => {
    const response = await request(app).get('/api/exercises/biceps');

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });
});
