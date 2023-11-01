const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('dummy', () => {
    test('dummy returns one', () => {
        expect(listHelper.dummy([])).toBe(1)
    })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes([blogs[0]])).toBe(7)
    })

    test('of a bigger list is calculated rigth', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        expect(listHelper.favoriteBlog([])).toBeNull()
    })

    test('when list has only one blog it is the favorite', () => {
        const { title, author, likes } = blogs[0]
        const answer = { title, author, likes }
        expect(listHelper.favoriteBlog([blogs[0]])).toEqual(answer)
    })

    test('of a bigger list the favorite is the rigth one', () => {
        const { title, author, likes } = blogs[2]
        const answer = { title, author, likes }
        expect(listHelper.favoriteBlog(blogs)).toEqual(answer)
    })
})

describe('most blogs', () => {
    test('of an empty list should return null', () => {
        expect(listHelper.mostBlogs([])).toBeNull()
    })

    test('of a list with single blog should return its blogger', () => {
        const answer = { author: blogs[0].author, blogs: 1 }
        expect(listHelper.mostBlogs([blogs[0]])).toEqual(answer)
    })

    test('of a bigger list the record blogger is rigth', () => {
        const answer = { author: 'Robert C. Martin', blogs: 3 }
        expect(listHelper.mostBlogs(blogs)).toEqual(answer)
    })
})

describe('most likes', () => {
    test('of an empty list should return null', () => {
        expect(listHelper.mostLikes([])).toBeNull()
    })

    test('of a list with single blog should return its blogger', () => {
        const answer = { author: blogs[0].author, likes: blogs[0].likes }
        expect(listHelper.mostLikes([blogs[0]])).toEqual(answer)
    })

    test('of a bigger list the record blogger is rigth', () => {
        const answer = { author: 'Edsger W. Dijkstra', likes: 17 }
        expect(listHelper.mostLikes(blogs)).toEqual(answer)
    })
})