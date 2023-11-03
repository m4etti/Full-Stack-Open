const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
    {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
    },
    {
        username: 'admin',
        name: 'admin',
        password: '1234',
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    console.log(users)
    return users.map(u => u.toJSON())
}

const invalidUserFields = async (input, error, api) => {
    const usersAtStart = await usersInDb()
    const result = await api
        .post('/api/users')
        .send(input)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain(error)
}


module.exports = {
    initialBlogs,
    blogsInDb,
    initialUsers,
    usersInDb,
    invalidUserFields
}