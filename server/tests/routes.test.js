const request = require('supertest'); 
const app = require('../app.js'); 

describe('GET /api/users', () => {
    test('return 200 status code', async () => {
        const response = await request(app).get('/api/users'); 
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Success!')
    })
})

describe('POST /api/create-user', ()=> {
    test('should return 201 status code & text User Created!', async ()=> {
        const response = await request(app).post('/api/create-user').send({
            firstName: 'firstName', 
            lastName: 'lastName'
        }); 

        expect(response.status).toBe(201)
        expect(response.text).toBe('User Created!')
    })
    
})

