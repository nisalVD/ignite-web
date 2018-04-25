import React, { Component } from 'react'
import {CircularProgress, Button} from 'material-ui'
import './SignUp.css'
import {isEmailValid} from '../api/auth.js'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    emailValid: null,
    loadingEmailValid: false,
    selectedInputValue: {
      email: false,
      password: false,
      confirmPassword: false
    }
  }


  handleInputPlaceholder = (inputName) => {
    const {selectedInputValue} = this.state
    if (selectedInputValue === inputName) {
      return ""
    } else {
      return this.convertCamelCaseToSentenceCase(inputName)
    }
  }

  // onFocus
  handleInputFocus = (inputName) => {
    const selectedInputValue = {
      ...this.state.selectedInputValue,
      [inputName]: true
    }

    this.setState({selectedInputValue})
  }

  // onBlur
  handleInputBlur = (inputName) => {
    const selectedInputValue = {
      ...this.state.selectedInputValue,
      [inputName]: false
    }
    this.setState({selectedInputValue})
  }

  // On Email Blur
  checkEmailIsValid = (inputName) => {
    const {email} = this.state
    const emailValid = /^.+@.+$/.test(email.trim())
    if (emailValid === false) {
      this.setState({emailValid: false})
      return
    }

    this.setState({loadingEmailValid: true})
    isEmailValid(email)
      .then(({message}) => {
        const selectedInputValue = {
          ...this.state.selectedInputValue,
          [inputName]: true
        }
        this.setState({loadingEmailValid: false, emailValid: message, selectedInputValue})
      })

  }


  handleLabelText = (inputName) => {
    const {selectedInputValue} = this.state
    if (selectedInputValue[inputName] === true){
      return this.convertCamelCaseToSentenceCase(inputName)
    }
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

  // Helper function
  convertCamelCaseToSentenceCase = (input)  => {
    const parsedInput = input.replace( /([A-Z])/g, " $1" );
    return parsedInput.charAt(0).toUpperCase() + parsedInput.slice(1)
  }

  handleButtonDisabled = () => {
    const {email, password, confirmPassword, emailValid} = this.state
    if(emailValid && email && password && confirmPassword){
      return false
    } else {
      return true
    }
  }

  render() {

    const {email, password, confirmPassword, emailValid, selectedInputValue, loadingEmailValid} = this.state
    // console.log('emailValid', emailValid)
    // console.log('selectedInputValue', selectedInputValue)
    return (
      <div className="sign-up-form-container">
        <div className="sign-up-container">
          <h1>Sign Up</h1>
          <label className={`sign-up-label-style ${this.handleEmailValidLabel()}`} >
            {this.handleLabelText('email')}
          </label>
          {
            loadingEmailValid ?
              <div className="loading-email-valid-container">
                <CircularProgress size={30} />
              </div>
            :
          <input
            className="sign-up-input"
            onFocus={this.handleInputFocus.bind(this, 'email')}
            type="email"
            name="email"
            placeholder={this.handleInputPlaceholder('email')}
            onChange={(e)=> this.setState({email: e.target.value})}
            onBlur={this.checkEmailIsValid.bind(this, 'email')}
            value={email}
          />
          }
          {emailValid === null && <div className="empty-div" />}
          {emailValid === true && <div className="email-valid-sucess">Valid Email</div>}
          {emailValid === false && <div className="email-valid-fail">Email is invalid or Already in Use</div>}
          <label className="sign-up-label-style">{this.handleLabelText('password')}</label>
          <input
            className="sign-up-input"
            onFocus={this.handleInputFocus.bind(this, 'password')}
            onBlur={this.handleInputBlur.bind(this, 'password')}
            placeholder={this.handleInputPlaceholder('password')}
            onChange={(e)=> this.setState({password: e.target.value})}
            type="password"
            name="password"
            value={password}
          />
          <br/>
          <br/>

          <label className="sign-up-label-style">{this.handleLabelText('confirmPassword')}</label>
          <input
            onFocus={this.handleInputFocus.bind(this, 'confirmPassword')}
            onBlur={this.handleInputBlur.bind(this, 'confirmPassword')}
            placeholder={this.handleInputPlaceholder('confirmPassword')}
            className="sign-up-input"
            type="password"
            name="confirmPassword"
            onChange={(e)=> this.setState({confirmPassword: e.target.value})}
            value={confirmPassword}
          />
        </div>
        <div className="sign-up-button-container">
          <Button
            disabled={this.handleButtonDisabled()}
            raised
            color="primary"
          >Next
          </Button>
        </div>
      </div>
    )
  }
}

export default SignUp
