import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'


const CreateNew = forwardRef(({ createNewBlog }, ref) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        createNewBlog(title, author, url)
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

    useImperativeHandle(ref, () => {
        return {
            setTitle,
            setAuthor,
            setUrl
        }
    })

    return (
        <div style={{ marginBottom: '10px' }}>
            <h2>Create new entry for bloglist</h2>
            <form onSubmit={handleSubmit}>
                <div style={formInputStyle}>
                    <label style={formLabelStyle} htmlFor="titleInput">Title:</label>
                    <input
                        id="titleInput"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div style={formInputStyle}>
                    <label style={formLabelStyle} htmlFor="authorInput">Author:</label>
                    <input
                        id="authorInput"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div style={formInputStyle}>
                    <label style={formLabelStyle} htmlFor="urlInput">Url:</label>
                    <input
                        id="urlInput"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
})

CreateNew.propTypes = {
    createNewBlog: PropTypes.func.isRequired
}

CreateNew.displayName = 'CreateNew'

export default CreateNew