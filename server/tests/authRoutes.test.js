const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/user.js");
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

describe("POST /api/auth/signup", () => {
    //clear in-memory db before each test run
    beforeEach(async () => {
        await User.deleteMany({}); 
        //create user to save to in-memory db & add user for check
        const newUser = new User({
            firstName: "firstName",
            lastName: "lastName",
            height: 100,
            weight: 100,
            age: 100,
            password: 'hashedPassword',
            email: "myEmail@gmail.com",
        })

        await newUser.save(); 
    })

    test('should return 400 status code if user already exists w/ email', async () => {
        //check for existing user
        return request(app).post('/api/auth/signup')
            .send({
                firstName: "newFirstName",
                lastName: "newLastName",
                height: 100,
                weight: 100,
                age: 100,
                password: 'newHashedPassword',
                email: "myEmail@gmail.com", //same email - user already exists w/ user in memory db
            })
            .expect(400)
            .then((response) => {
                expect(response.text).toBe('User already exists')
            })
    })

    test('should return 201 status code & JSON {msg, user} if different email from existing db User', async () => {
        return request(app).post('/api/auth/signup')
            .send({
                firstName: "newFirstName",
                lastName: "newLastName",
                height: 100,
                weight: 100,
                age: 100,
                password: 'newHashedPassword',
                email: "myDifferentEmail@gmail.com", //different from in-memory db email
            })
            .expect(201)
            .then((response) => {
                
                expect(response.body.msg).toBe('*User Created*')
                expect(response.body.user).toEqual(
                    expect.objectContaining({})
                )
            })
    })
});

describe("POST /api/auth/login", () => {
    let newUser; 
    beforeEach(async () => {
        //clear db Users & create User for check
        await User.deleteMany({}) 
        const hashedPassword = await bcrypt.hash('hashPassword', 10); 
        newUser = new User({
            firstName: "firstName",
            lastName: "lastName",
            height: 100,
            weight: 100,
            age: 100,
            password: hashedPassword,
            email: "existingEmail@gmail.com",
        })

        await newUser.save(); 
    })

    test('should return 400 status code & error msg if user not found by email', async () => {
        return request(app).post('/api/auth/login')
            .send({
                email: 'emailNotFound@gmail.com',
                password: 'hashedPassword'
            })
            .expect(400)
            .then((response) => {
                expect(response.text).toBe('Could not find account with inputted email')
            })
    })

    test('should return 400 status code & error msg if email is correct but password not', async () => {
        return request(app).post('/api/auth/login')
            .send({
                email: 'existingEmail@gmail.com',
                password: 'notHashedPassword'
            })
            .expect(400)
            .then((response) => {
                expect(response.text).toBe('Error: incorrect password')
            })
    })

    test('should return 201 status code & {msg, token}', async () => {
        return request(app).post('/api/auth/login')
            .send({
                email: 'existingEmail@gmail.com',
                password: 'hashPassword'
            })
            .expect(201)
            .then((response) => {
                expect(response.body.msg).toBe('Welcome ' + newUser.firstName + '!')
                expect(response.body.token).toBeTruthy(); 

            })
    })
})