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

    return (
        <div>
            <h2>Create new entry for bloglist</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:{' '}
                    <input
                        type="text"
                        value={newBlog.title}
                        name="Title"
                        onChange={({ target }) => newBlog.setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:{' '}
                    <input
                        type="text"
                        value={newBlog.author}
                        name="Author"
                        onChange={({ target }) => newBlog.setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:{' '}
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