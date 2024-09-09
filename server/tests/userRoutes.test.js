const request = require("supertest"); 
const jwt = require('jsonwebtoken')
const app = require('../app.js'); 
const mongoose = require('mongoose'); 
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/user.js");
const SECRET_KEY = process.env.SECRET_KEY; 

let mongoMemoryServer; 
beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create(); //create in-memory db for testing
    await mongoose.connect(mongoMemoryServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoMemoryServer.stop();
});

describe("GET /api/userData", () => {
    //clear in-memory db before each test run
    let newUser; 
    let token; 
    beforeEach(async () => {
        await User.deleteMany({}); 
        //create user to save to in-memory db & add user for check
        newUser = new User({
            firstName: "firstName",
            lastName: "lastName",
            height: 100,
            weight: 100,
            age: 100,
            password: 'hashedPassword',
            email: "myEmail@gmail.com",
        })

        await newUser.save(); 

        //generate token
        token = jwt.sign(
            {userFirstName: 'firstName', userEmail: 'lastName', userEmail: 'myEmail@gmail.com'},
            SECRET_KEY, 
            {expiresIn: '1hr'}
        )
    })

    test('should return 200 status code, verify jwt & return {code, user}', () => {
        return request(app).get('/api/userData')
            .set('Authorization', `Bearer ${token}`)
            .set('X-User-Email', newUser.email)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('code')
                expect(response.body).toHaveProperty('user')
            })
    })

    test('shoud return 403 status code, if token/email not provided' , () => {
        return request(app).get('/api/userData')
            .set('Authorization', null)
            .set('X-User-Email', null)
            .expect(403)
    })
})

