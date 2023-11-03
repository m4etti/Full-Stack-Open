const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const paswordMinLength = 3

    if (!password) {
        response
            .status(400)
            .json({ error: 'User validation failed: Password is required.' })
    }
    else if (password.length < paswordMinLength) {
        response
            .status(400)
            .json({ error: `User validation failed: Password is shorter than the minimum allowed length (${paswordMinLength})` })
    }
    else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        console.log(passwordHash)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    }
})

module.exports = usersRouter