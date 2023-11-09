import { useState } from 'react'

const CreateNew = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        createNewBlog(newBlog)
    }

    const newBlog = {
        title: title,
        author: author,
        url: url,
        setTitle: (newTitle) => setTitle(newTitle),
        setAuthor: (newAuthor) => setAuthor(newAuthor),
        setUrl: (newUrl) => setUrl(newUrl),
        clear: () => {
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    const formInputStyle = {
        marginBottom: '5px',
        marginLeft: '5px',
        display: 'flex',
        alignItems: 'center',
    }

    const formLabelStyle = {
        width: '50px',
        marginRight: '10px'
    }

    return (
        <div style={{ marginBottom: '10px' }}>
            <h2>Create new entry for bloglist</h2>
            <form onSubmit={handleSubmit}>
                <div style={formInputStyle}>
                    <label style={formLabelStyle}>Title:</label>
                    <input
                        type="text"
                        value={newBlog.title}
                        name="Title"
                        onChange={({ target }) => newBlog.setTitle(target.value)}
                    />
                </div>
                <div style={formInputStyle}>
                    <label style={formLabelStyle}>Author:</label>
                    <input
                        type="text"
                        value={newBlog.author}
                        name="Author"
                        onChange={({ target }) => newBlog.setAuthor(target.value)}
                    />
                </div>
                <div style={formInputStyle}>
                    <label style={formLabelStyle}>Url:</label>
                    <input
                        type="text"
                        value={newBlog.url}
                        name="Url"
                        onChange={({ target }) => newBlog.setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateNew