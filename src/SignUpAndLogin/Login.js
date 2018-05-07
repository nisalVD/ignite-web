import React, { Component } from 'react'
import './Login.css'
import {isEmailValid } from '../api/auth.js'
import {CircularProgress, Button} from 'material-ui'

class Login extends Component {
  state = {
    email: '',
    loadingEmailValid: false,
    emailValid: null,
    password: ''
  }

  checkEmailIsValid = () => {
    const { email } = this.state
    const emailValid = /^.+@.+$/.test(email.trim())
    if (emailValid === false) {
      this.setState({emailValid: false})
      return
    }

    this.setState({loadingEmailValid: true})
    isEmailValid(email)
      .then(({message}) => {
        // set opposite because this checks if email exist
        this.setState({loadingEmailValid: false, emailValid: !message})
      })
  }


  handleEmailValidLabel = () => {
    const {emailValid} = this.state
    if (emailValid === true) {
      return 'email-valid-success'
    }

    if (emailValid === false) {
      return 'email-valid-fail'
    }

  }

  handleDisableLoginButton= () => {
    const {emailValid, email, password} = this.state
    if (password && email && emailValid) {
      return false
    }
    return true
  }

  render() {
    const {loadingEmailValid, emailValid, email, password} = this.state
    console.log(emailValid)

    return (
      <div className="login-container">
        <div>
          <h1>Login</h1>
          <label className={`login-label ${this.handleEmailValidLabel()}`}>Email</label>
          {
              emailValid === true && <span className="login-label-span-success">Email Valid</span>
          }
          {
            emailValid === false && <span className="login-label-span-fail">Email Invalid</span>
          }
          {
          loadingEmailValid ?
              <div className="loading-email-valid-container">
                <CircularProgress size={30} />
              </div>
              :
              <input
                value={email}
                onChange={(e) => this.setState({email: e.target.value})}
                className="login-input"
                type="text"
                placeholder="Email"
                onBlur={() => this.checkEmailIsValid()}
              />
          }

          <label className="login-label">Password</label>
          <input
            value={password}
            onChange={(e) => this.setState({password: e.target.value})}
            className="login-input"
            type="password"
            placeholder="Password"
          />
          <div className="login-button-container">
            <button onClick={() => this.props.history.push('/user/forget-password')} className="login-forget-password">Forgot Password?</button>
            <Button
              raised
              color="primary"
              disabled={this.handleDisableLoginButton()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
