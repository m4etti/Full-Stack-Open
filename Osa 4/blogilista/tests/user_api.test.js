const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('GET /apia/users', () => {
    test('GET all', async () => {
        const response = await api.get('/api/users')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(response.body).toHaveLength(helper.initialUsers.length)
        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST /api/users', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        console.log(usersAtEnd)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken or username or password missing', async () => {
        const usersAtStart = await helper.usersInDb()
        const shortUsername = {
            username: 'm',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
        const noUsername = {
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
        const shortPassword = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: '1',
        }
        const noPasword = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
        }

        helper.invalidUserFields(usersAtStart[0], 'expected `username` to be unique', api)
        helper.invalidUserFields(shortUsername, '`) is shorter than', api)
        helper.invalidUserFields(noUsername, 'Path `username` is required.', api)
        helper.invalidUserFields(shortPassword, 'Password is shorter than', api)
        helper.invalidUserFields(noPasword, 'Password is required', api)
    })
})
