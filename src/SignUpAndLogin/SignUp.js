import React, { Component, Fragment } from 'react'
import {CircularProgress, Button} from 'material-ui'
import './SignUp.css'
import {isEmailValid} from '../api/auth.js'

class SignUp extends Component {
  state = {
    inputValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      address: '',
      postCode: '',
      state: '',
      mobileNumber: ''
    },
    emailValid: null,
    loadingEmailValid: false,
    page: 0,
    selectedInputValue: {
      email: false,
      password: false,
      confirmPassword: false,
      firstName: false,
      lastName: false,
      dateOfBirth: false,
      mobileNumber: false,
      address: false,
      postCode: false,
      state: false
    }
  }


  handleInputPlaceholder = (inputName) => {
    const {selectedInputValue} = this.state

    if (selectedInputValue[inputName]) {
      return ""
    } else {
      return this.convertCamelCaseToSentenceCase(inputName)
    }
  }

  // helper function
  handleSelectedInputValue = (inputName, value) => {
    const selectedInputValue = {
      ...this.state.selectedInputValue,
      [inputName]: value
    }

    this.setState({selectedInputValue})
  }

  // onFocus
  handleInputFocus = (inputName) => {
    this.handleSelectedInputValue(inputName, true)
  }

  // onBlur
  handleInputBlur = (inputName) => {
    const {password, confirmPassword} = this.state
    this.handleSelectedInputValue(inputName, false)

    if (inputName === 'confirmPassword') {
      // TODO add logic here to check if password is blank
      // confirm password match with password
      if (password === confirmPassword) {
        console.log('passwords match')
      } else {
        console.log('passwords dont match')
      }
    }

  }

  // On Email Blur
  checkEmailIsValid = (inputName) => {
    const {inputValues} = this.state
    const email = inputValues.email
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

    const {emailValid, inputValues} = this.state
    const email = inputValues.email
    const password = inputValues.password
    const confirmPassword = inputValues.confirmPassword

    const passwordConfirmation = password === confirmPassword
    if(emailValid && email && password && confirmPassword && passwordConfirmation){
      return false
    } else {
      return true
    }
  }

  handleDisabledSubmitButton = () => {
    const {inputValues} = this.state
    const everyValueFilled = Object.values(inputValues).every(value => value)
    // disabled is oposite
    return !everyValueFilled
  }


  handleInputOnChange = (inputName, e) => {
    const {inputValues} = this.state
    const newInputValues = {
      ...inputValues,
      [inputName]: e.target.value
    }
    this.setState({inputValues: newInputValues})
  }

  // Render the forms
  renderInput = (inputName) => {
    return (
      <Fragment key={inputName}>
        <label className="sign-up-label-style">{this.handleLabelText(inputName)}</label>
        <input
          type={inputName === 'dateOfBirth' ? 'date' : 'text'}
          className="sign-up-input"
          name={inputName}
          onFocus={this.handleInputFocus.bind(this, inputName)}
          placeholder={this.handleInputPlaceholder(inputName)}
          onChange={this.handleInputOnChange.bind(this, inputName)}
          onBlur={this.handleInputBlur.bind(this, inputName)}
          value={this.state.inputValues.inputName}
        />
      </Fragment>
    )
  }


  render() {
    const {email, password, confirmPassword, emailValid, selectedInputValue, loadingEmailValid, page, inputValues} = this.state
    // console.log('emailValid', emailValid)
    console.log('inputValues', inputValues)
    if (page === 0) {
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
            onChange={this.handleInputOnChange.bind(this, 'email')}
            onBlur={this.checkEmailIsValid.bind(this, 'email')}
            value={inputValues.email}
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
            onChange={this.handleInputOnChange.bind(this, 'password')}
            type="password"
            name="password"
            value={inputValues.password}
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
            onChange={this.handleInputOnChange.bind(this, 'confirmPassword')}
            value={inputValues.confirmPassword}
          />
        </div>
        {inputValues.password && inputValues.confirmPassword && inputValues.password === inputValues.confirmPassword && <div className="sign-up-password-match">Passwords Match</div> }
        {inputValues.password && inputValues.confirmPassword && inputValues.password !== inputValues.confirmPassword && <div className="sign-up-password-no-match">Passwords Dont Match</div> }
        <div className="sign-up-button-container">
          <Button
            onClick={() => this.setState({page: 1})}
            disabled={this.handleButtonDisabled()}
            raised
            color="primary"
          >Next
          </Button>
        </div>
      </div>
    )
    }


    else if (page === 1) {
      return (
        <div className="sign-up-form-container">
          <div className="sign-up-container">
          <h1>Details</h1>
          {Object.keys(this.state.inputValues).filter(value => value!=="email" && value!=="password" && value!=="confirmPassword").map(value => {
            return (
              this.renderInput(value)
            )
          })}
          <div className="submit-button-container">
            <Button
              disabled={this.handleDisabledSubmitButton()}
              raised
              color="primary"
            >
              Submit
            </Button>
          </div>
        </div>
        </div>
      )
    }
  }
}

export default SignUp
