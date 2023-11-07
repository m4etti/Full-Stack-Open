const _ = require('lodash')

const dummy = () => {
    return 1
}

// Function to calculate the total number of likes for all blogs
const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

// Function to find the blog with the most likes
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

// Function to find the author with the most blogs
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authors = _.groupBy(blogs, 'author')
        const topBlogger = _.maxBy(Object.values(authors), author => author.length)
        return { author: topBlogger[0].author, blogs: topBlogger.length }
    }
}

// Function to find the author with the most total likes on their blogs
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