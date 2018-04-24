import React, { Component } from 'react'
import './SignUp.css'
import {isEmailValid} from '../api/auth.js'

class SignUp extends Component {
  state = {
    email: '',
    isEmailValid: null,
    selectedInputValue: null
  }

  checkEmailIsValid = () => {
    this.setState({selectedInputValue: null})
    const {email } = this.state
    isEmailValid(email)
      .then(({message}) => {
        this.setState({isEmailValid: message})
      })
  }

  handleInputFocus = (selectedInputValue) => {
    this.setState({selectedInputValue})
  }

  handleInputPlaceholder = (inputName) => {
    const {selectedInputValue} = this.state
    if (selectedInputValue === inputName) {
      return ""
    } else {
      return inputName
    }
  }

  handleBlurInputValue = () => {
    this.setState({selectedInputValue: null})
  }

  handleLabelText = (inputName) => {
    const {selectedInputValue} = this.state

    if (inputName === selectedInputValue) {
      return inputName
    } else {
      return '_____'
    }
  }


  render() {

    const {email, isEmailValid, selectedInputValue} = this.state
    return (
      <div className="sign-up-form-container">
        <div className="sign-up-container">
          <h1>Sign Up</h1>
          <label className="sign-up-label-style">
            {this.handleLabelText('Email')}
          </label>
          <input
            ref={this.handleInputRef}
            className="sign-up-input"
            onFocus={this.handleInputFocus.bind(this, 'Email')}
            type="email"
            name="email"
            placeholder={this.handleInputPlaceholder('Email')}
            onChange={(e)=> this.setState({email: e.target.value})}
            onBlur={this.checkEmailIsValid}
            value={email}
          />
          <br/>
          <br/>

          <label className="sign-up-label-style">{this.handleLabelText('Password')}</label>
          <input
            className="sign-up-input"
            onFocus={this.handleInputFocus.bind(this, 'Password')}
            onBlur={this.handleInputFocus}
            placeholder={this.handleInputPlaceholder('Password')}
            type="password"
            name="password"
          />
          <br/>
          <br/>

          <label className="sign-up-label-style">{this.handleLabelText('Confirm Password')}</label>
          <input
            onFocus={this.handleInputFocus.bind(this, 'Confirm Password')}
            onBlur={this.handleInputFocus}
            placeholder={this.handleInputPlaceholder('Confirm Password')}
            className="sign-up-input"
            type="password"
            name="confirmPassword"
          />

        </div>
      </div>
    )
  }
}

export default SignUp
