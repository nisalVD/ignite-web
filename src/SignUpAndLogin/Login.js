import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  state = {
  }

  render() {
    return (
      <div className="login-container">
        <div>
          <h1>Login</h1>
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="text"
            placeholder="Email"
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="password"
          />
        </div>

      </div>
    )
  }
}

export default Login
