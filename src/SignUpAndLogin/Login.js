import React, { Component } from 'react'
import './Login.css'
import {isEmailValid } from '../api/auth.js'
import {CircularProgress, Button} from 'material-ui'

class Login extends Component {
  state = {
    email: '',
    loadingEmailValid: false,
    emailValid: null
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
        this.setState({loadingEmailValid: false, emailValid: message})
      })
  }

  handleEmailValidLabel = () => {
    const {emailValid} = this.state
    if (emailValid) {
      return 'email-valid-sucess'
    }
    if (emailValid === false) {
      return 'email-valid-fail'
    }
  }

  render() {
    const {loadingEmailValid, emailValid, email} = this.state
    console.log(email)

    return (
      <div className="login-container">
        <div>
          <h1>Login</h1>
          <label className={`login-label ${this.handleEmailValidLabel()}`}>Email</label>
          {emailValid!==null && emailValid === true ? <span className="login-label-span-success">Email valid</span> : <span className="login-label-span-fail">Email invalid</span>}
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
            className="login-input"
            type="password"
            placeholder="Password"
          />
          <div className="login-button-container">
            <Button
              raised
              color="primary"
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
