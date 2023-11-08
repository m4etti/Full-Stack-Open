import { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ text: '', type: '' })


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    // Function for displaying notifications with a timeout
    const setNotification = (content) => {
        setMessage(content)
        setTimeout(() => {
            setMessage({ text: '', type: '' })
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({ text: 'logged in', type: 'success' })

        } catch (exception) {
            setNotification({ text: 'error logging in', type: 'error' })
        }
    }

    return (
        <div>
            <h1>Bloglist</h1>
            {user && <p>{user.name}</p>}
            {!user && (
                <Login
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />)
            }
            <Notification message={message} />
            {user && (
                <div>
                    <h2>blogs</h2>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </div>
            )}
        </div>
    )
}

export default App