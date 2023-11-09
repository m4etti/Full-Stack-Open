import { useState, useEffect, useRef } from 'react'
import './App.css'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateNew from './components/CreateNew'
import Togglable from './components/Togglable'

const App = () => {
    // State hooks for managing application data
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ text: '', type: '' })


    // State hook for managing the need to refresh data from the server
    const [refreshNeeded, setRefreshNeeded] = useState(true)

    const createNewRef = useRef()



    // Effect hook for initializing blogs data or refreshing it when needed
    useEffect(() => {
        if (refreshNeeded) {
            (async () => {
                try {
                    const blogsFromDb = await blogService.getAll()
                    setBlogs(blogsFromDb)
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    setRefreshNeeded(false)
                }
            })()
        }
    }, [refreshNeeded])

    // Effect hook to get user from local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
        }
    }, [])

    // Function for displaying notifications with a timeout
    const setNotification = (content) => {
        setMessage(content)
        setTimeout(() => {
            setMessage({ text: '', type: '' })
        }, 5000)
    }

    // Function to handle login
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({ text: `Welcome back ${user.name}`, type: 'success' })

        } catch (exception) {
            setNotification({ text: 'Wrong username or password!', type: 'error' })
        }
    }

    const logOut = () => (() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    })

    // Function to add new entry to bloglist
    const postNewBlog = async (newBlog) => {
        try {
            const blogToSend = {
                title: newBlog.title,
                author: newBlog.author,
                url: newBlog.url
            }
            console.log('Creating new blog entry')

            createNewRef.current.toggleVisibility()
            await blogService.create(blogToSend, user.token)
            newBlog.clear()
            setRefreshNeeded(true)


            setNotification({ text: `New blog ${blogToSend.title} by ${blogToSend.author} added.`, type: 'success' })
            console.log('New blog entry created')
        }
        catch (error) {
            setNotification({ text: error.response.data.error, type: 'error' })
            console.log(error.response.data)
        }
    }

    const addLike = async (blog) => {
        try {
            console.log(`Add like to ${blog.title}`)

            await blogService.like(blog, user.token)
            setRefreshNeeded(true)

            setNotification({ text: `Liked blog: ${blog.title}`, type: 'success' })
            console.log('Blog Likked')
        }
        catch (error) {
            setNotification({ text: error.response.data.error, type: 'error' })
            console.log(error.response.data)
        }
    }

    const removeBlog = async (blog) => {
        try {
            console.log(`Removing blog: ${blog.title}`)

            await blogService.remove(blog, user.token)
            setRefreshNeeded(true)

            setNotification({ text: `Deleted blog: ${blog.title}`, type: 'success' })
            console.log('Blog removed')
        } catch (error) {
            setNotification({ text: error.response.data.error, type: 'error' })
            console.log(error.response.data)
        }
    }


    // JSX rendering of the application components
    return (
        <div>
            <h1>Bloglist</h1>
            <Login
                logOut={logOut}
                user={user}
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />
            <Notification message={message} />
            {user && (
                <div>
                    <Togglable buttonLabel='New' ref={createNewRef}>
                        <CreateNew createNewBlog={postNewBlog} />
                    </Togglable>
                    <BlogList blogs={blogs} addLike={addLike} removeBlog={removeBlog} user={user} />
                </div>
            )}
        </div>
    )
}

export default App