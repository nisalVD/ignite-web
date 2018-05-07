import React, { Component } from 'react'
import { changePasswordEmailRequest } from '../api/updateUser.js'

class ForgetPassword extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    // send request to change password
    changePasswordEmailRequest(email)
      .then(({message}) => {
        console.log(message)
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" type="email">
          </input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ForgetPassword
