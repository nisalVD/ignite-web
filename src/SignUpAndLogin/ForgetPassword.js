import React, { Component } from 'react'
import { changePasswordEmailRequest } from '../api/updateUser.js'
import "./ForgetPasword.css"
import {Button} from 'material-ui'

class ForgetPassword extends Component {
  state = {
    email: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    // send request to change password
    changePasswordEmailRequest(email)
      .then(({message}) => {
        console.log(message)
      })
  }

  handleSubmit = () => {
    const {email} = this.state

    changePasswordEmailRequest(email)
      .then(({message}) => {
        console.log(message)
      })
  }

  handleDisable = () => {
    const {email} = this.state
    const emailValid = /^.+@.+$/.test(email.trim())
    return !emailValid
  }

  render() {
    const {email} = this.state

    return (
      <div className="forget-password-form-container">
        <h1>Forget Password</h1>
      <label style={{fontWeight: 600}}>Email</label>
      <input className="forget-password-input" name="email" type="email" value={email} onChange={(e) => this.setState({email: e.target.value})} placeholder="example@email.com">
          </input>
          <div style={{textAlign: 'right', paddingTop: 5}}>
          <Button raised color="primary" type="submit" onClick={this.handleSubmit} disabled={this.handleDisable()}>Submit</Button>
      </div>
      </div>
    )
  }
}

export default ForgetPassword
