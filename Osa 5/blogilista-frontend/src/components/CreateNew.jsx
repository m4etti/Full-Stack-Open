const CreateNew = ({ handleSubmit, newBlog }) => {
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