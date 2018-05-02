import React, { Component } from 'react'
import {Button} from 'material-ui'

import {changePasswordEmail} from '../api/updateUser.js'
import './ChangeForgetPassword.css'

class ChangeForgetPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
  }

  handleSubmit = () => {
    const {id} = this.props.match.params
    const {token} = this.props.match.params
    const {password, confirmPassword} = this.state

    if (password === confirmPassword) {
      changePasswordEmail(id, token, password)
        .then(res => {
          console.log(res.message)
        })
    } else {
      console.log('passwords dont match')
    }
  }

  handleButtonDisabled = () => {
    const {password, confirmPassword} = this.state
    if (password && confirmPassword && password === confirmPassword) {
      return false
    }
    return true
  }

  render() {
    const {password, confirmPassword} = this.state

    return (
      <div className="forget-password-container">
        <div
          className="forget-password-form-container"
          >
          <label className="forget-password-label">Password</label>
          <input
            value={password}
            className="forget-password-input"
            type="password"
            name="confirmPassword"
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <label className="forget-password-label">Confirm Password</label>

          <input
            className="forget-password-input"
            type="password"
            name="confirmPassword"
            onChange={(e) => this.setState({confirmPassword: e.target.value})}
          />
            {password && confirmPassword && password !== confirmPassword && <span className="forget-password-no-match">Password Don't Match</span>}
            {password && confirmPassword && password === confirmPassword && <span className="forget-password-match">Password Match</span>}
          <div className="forget-password-button-container">
            <Button
              raised
              color="primary"
              onClick={this.handleSubmit}
              disabled={this.handleButtonDisabled()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangeForgetPassword
