import Togglable from './Togglable'

const Blog = ({ blog, addLike }) => {
    const divStyle = {
        border: '1px solid white',
        padding: '10px', // Optional: Add padding to the div
        margin: '10px', // Optional: Add margin around the div
    }

    return (
        <div style={divStyle}>
            {blog.title}
            <Togglable buttonLabel={'View'} cancelLabel={'hide'}>
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={() => addLike(blog)}>Like</button></p>
                <p>{blog.author}</p>
            </Togglable>
        </div>
    )
}

export default Blog