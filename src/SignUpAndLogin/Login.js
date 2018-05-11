import React, { Component } from 'react'
import './Login.css'
import {isEmailValid, signIn } from '../api/auth.js'
import {CircularProgress, Button} from 'material-ui'

class Login extends Component {
  state = {
    loading: false,
    loadingEmailValid: false,
    emailValid: null,
    password: '',
    email: '',
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

  handleLoginButton = () => {
    const {email, password} = this.state
    const loginDetails = {email, password}

    this.setState({loading: true})
    signIn(loginDetails)
      .then(decodedToken => {
        this.props.handleLogin(decodedToken)
        this.setState({loading: false})
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({loading: false})
        console.log(error)
      })
  }

  render() {
    const {loadingEmailValid, emailValid, email, password} = this.state
    if (this.state.loading) {
      return (
        <div className="login-loading-container">
          <CircularProgress size={80}/>
        </div>
      )
    }

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
              onClick={this.handleLoginButton}
            >
              Login
            </Button>
          </div>
          <div style={{textAlign: "center"}}>Don't have an account?
            <button onClick={() => this.props.history.push('/sign-up')} className="sign-up-now-link">Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
