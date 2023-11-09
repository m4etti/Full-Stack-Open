import Togglable from './Togglable'

const Blog = ({ blog, addLike, user, removeBlog }) => {
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
        <div style={divStyle}>
            {blog.title}
            {usersBlog && <button style={deleteButtonStyle} onClick={() => removeBlog(blog)}>Delete</button>}
            <Togglable buttonLabel={'View'} cancelLabel={'hide'}>
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={() => addLike(blog)}>Like</button></p>
                <p>{blog.author}</p>
            </Togglable>
        </div>
    )
}

export default Blog