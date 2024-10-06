const request = require("supertest");
const app = require("../app.js");

describe("GET /api/exercises/cardio", () => {
  test('should return data for cardio exercises', async () => {
    async () => {
      const response = await request(app).get('/api/exercises/cardio');

      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBeNull();
    }
  });
});
