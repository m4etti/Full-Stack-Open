import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ id, blog, addLike, user, removeBlog }) => {
    const divStyle = {
        border: '1px solid white',
        padding: '10px',
        margin: '10px',
        position: 'relative'
    }

    const deleteButtonStyle = {
        position: 'absolute',
        top: '10px', // Adjust the top position as needed
        right: '10px', // Adjust the right position as needed
    }

    const usersBlog = user.username === blog.user.username


    return (
        <div id={`blogNumber${id}`} style={divStyle}>
            {blog.title}
            {usersBlog && <button id='deleteButton' style={deleteButtonStyle} onClick={() => removeBlog(blog)}>Delete</button>}
            <Togglable id={'togglableBlog'} buttonLabel={'View'} cancelLabel={'hide'}>
                <p>{blog.url}</p>
                <p>Likes:{` ${blog.likes}`} <button id={'likeButton'} onClick={() => addLike(blog)}>Like</button></p>
                <p>{blog.author}</p>
            </Togglable>
        </div>
    )
}

Blog.propTypes = {
    id: PropTypes.number.isRequired,
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    addLike: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Blog