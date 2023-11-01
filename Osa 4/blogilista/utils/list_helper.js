const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    else {
        const reducer = (favorite, blog) => {
            if (favorite.likes < blog.likes) {
                return blog
            } else {
                return favorite
            }
        }

        const initialFavorite = { title: '', author: '', likes: 0 }
        const { title, author, likes } = blogs.reduce(reducer, initialFavorite)
        const favorite = { title, author, likes }

        return favorite
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authors = _.groupBy(blogs, 'author')
        const topBlogger = _.maxBy(Object.values(authors), author => author.length)
        return { author: topBlogger[0].author, blogs: topBlogger.length }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const reducer = (totallikes, blog) => totallikes + blog.likes
        const authors = _.groupBy(blogs, 'author')
        const mostLikedBlogger = _.maxBy(Object.values(authors), author => (
            author.reduce(reducer, 0)
        ))
        const totalLikes = mostLikedBlogger.reduce(reducer, 0)
        return { author: mostLikedBlogger[0].author, likes: totalLikes }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}