import React from 'react'

const LoginForm = (props) => (
    <form onSubmit={props.handleLogin}>
        <div>
            username
             <input
                type="text"
                name="Username"
                value={props.userName}
                onChange={props.handleUsernameChange}
            />
        </div>
        <div>
            password
             <input
                type="password"
                name="Password"
                value={props.password}
                onChange={props.handlePasswordChange}
            />
        </div>
        <button type="submit">Login</button>
    </form>
)
export default LoginForm