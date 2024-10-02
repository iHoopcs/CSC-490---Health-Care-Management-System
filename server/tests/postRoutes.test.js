const request = require('supertest'); 
const app = require('../app.js'); 
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose'); 
const Post = require('../Models/post.js'); 

let mongoMemoryServer; 
beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create(); //create in-memory db for testing
    await mongoose.connect(mongoMemoryServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoMemoryServer.stop();
});

describe('GET /api/posts', () => {
    //clear in-memory db before each test
    beforeEach(async () => {
        await Post.deleteMany({}); 

        //create new post to fetch
        newPost = new Post({
            firstName: 'firstName', 
            lastName: 'lastName', 
            accountName: 'accountName', 
            message: 'This is a test post!'
        })

        await newPost.save(); 

        secondNewPost = new Post({
            firstName: 'secondFirstName', 
            lastName: 'secondLastName', 
            accountName: 'secondAccountName', 
            message: 'This is another test post!'
        })

        await secondNewPost.save(); 
    })

    test('should return 200 status code if fetches all posts', () => {
        return request(app).get('/api/posts')
            .expect(200)
            .then((response) => {
                expect(response.body.posts).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({})
                    ])
                )
            })
    })
})

describe('POST /api/create-post', () => {
    //clear in-memory db before each test
    beforeEach(async () => {
        await Post.deleteMany({}); 
    })

    test('should return 201 status code if successful post creation - return "Post created!" msg', () => {
        return request(app).post('/api/create-post').send({
            firstName: 'firstName', 
            lastName: 'lastName', 
            accountName: 'accountName', 
            message: 'This is a new post!'
        })
            .expect(201)
            .then((response) => {
                expect(response.body.msg).toBe('Post created!')
            })
    })

    test('should return 404 status code if msg is missing', () => {
        
        return request(app).post('/api/create-post').send({
            firstName: 'firstName', 
            lastName: 'lastName', 
            accountName: 'accountName', 
        })
            .expect(404)
            .then((response) => {
                expect(response.body.errMsg).toBe('An error occured! - Missing message')
            })
    })

})

