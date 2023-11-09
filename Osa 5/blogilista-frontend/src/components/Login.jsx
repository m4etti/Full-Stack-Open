import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

const Login = ({ user, logOut, handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <div>
            {user && (
                <p>
                    {`${user.name} `}
                    <button onClick={logOut()}>Logout</button>
                </p>
            )}
            {!user && (
                <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
            )}

        </div>
    )
}

Login.propTypes = {
    user: PropTypes.object, // Assuming user is an object
    logOut: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default Login
