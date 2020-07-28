import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    userName,
    password
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    name="Username"
                    value={userName}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired

}
export default LoginForm