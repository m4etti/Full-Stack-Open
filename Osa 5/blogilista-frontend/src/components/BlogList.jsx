import Blog from './Blog'

const Bloglist = ({ blogs, addLike }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
        <div>
            <h2>Blogs</h2>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike} />
            )}
        </div>
    )
}

export default Bloglist