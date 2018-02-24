import React, { Component } from "react"
import { changePassword } from "../api/updateUser"

class UserChangePassword extends Component {
  state = {
    error: null,
    passwordChanged: false,
    newPassword: null,
    newPasswordConfirm: null
  }

  handleChangePasswordForm = event => {
    event.preventDefault()
    const { elements } = event.target
    const newPassword = elements.newPassword.value
    const newPasswordConfirm = elements.newPasswordConfirm.value
    const oldPassword = elements.oldPassword.value
    if (newPassword !== newPasswordConfirm) {
      this.setState({ error: "passwords don't match" })
    } else {
      changePassword(oldPassword, newPassword)
        .then(response => {
          if (response.success !== "success") {
            this.setState({ error: "Incorrect Password" })
          }
        })
        .then(() => {
          const later = (delay, value) =>
            new Promise(resolve => setTimeout(resolve, delay, value))
          later(3000, null).then(error => this.setState({ error }))
        })
        .catch(error => {
          this.setState({ passwordChanged: error.response.data.sucess })
        })
    }
  }
  handleNewPasswordChange = (passwordType, event) => {
    const { newPassword, newPasswordConfirm } = this.state
    this.setState({ [passwordType]: event.target.value })
    if (newPassword !== newPasswordConfirm) {
      this.setState({ error: "passwords don't match" })
    }
  }

  render() {
    const { error, passwordChanged } = this.state
    const { newPassword, newPasswordConfirm } = this.state
    return (
      <div>
        {passwordChanged && <p>Password Changed</p>}
        <p>{error && error}</p>
        <form onSubmit={this.handleChangePasswordForm}>
          <label>
            OldPassword:
            <input type="password" name="oldPassword" />
          </label>
          <br />
          <label>
            NewPassword:
            <input
              type="password"
              name="newPassword"
              onChange={this.handleNewPasswordChange.bind(this, "newPassword")}
            />
          </label>
          <label>
            Confirm NewPassword:
            <input
              type="password"
              name="newPasswordConfirm"
              onChange={this.handleNewPasswordChange.bind(
                this,
                "newPasswordConfirm"
              )}
            />
          </label>
          <br />
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default UserChangePassword
