import PropTypes from 'prop-types'
import Blog from './Blog'

const Bloglist = ({ blogs, addLike, user, removeBlog }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
        <div id='blogList'>
            <h2>Blogs</h2>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
            )}
        </div>
    )
}

Bloglist.propTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    addLike: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Bloglist