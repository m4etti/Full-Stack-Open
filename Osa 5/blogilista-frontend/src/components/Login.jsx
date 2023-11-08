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

export default Login
