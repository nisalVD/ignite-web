import React, {Component} from "react"
import {changePassword} from "../api/updateUser"
import "./UserChangePassword.css"

class UserChangePassword extends Component {
  state = {
  }

  render() {
    return (
      <form className="change-password-form-container">
        <label className="change-password-label">Old Password</label>
        <br />
        <input className="change-password-input"></input>

        <label className="change-password-label">New Password</label>
        <input className="change-password-input"></input>

        <label className="change-password-label">New Password Confirm</label>
        <input className="change-password-input"></input>
      </form>
    )
  }
}

export default UserChangePassword
