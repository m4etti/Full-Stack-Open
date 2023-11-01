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
        return {}
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}