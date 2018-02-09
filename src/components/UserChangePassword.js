import React, { Component } from 'react'
import { changePassword } from '../api/updateUser'

class UserChangePassword extends Component {
  render () {
    return (
      <form>
        <label>
          OldPassword:
          <input 
            type="text"
            name="oldPassword"
            />
        </label>
        <br/>
        <label>
          NewPassword:
          <input 
            type="text"
            name="oldPassword"
            />
        </label>
        <br/>
        <button className="button">Submit</button>
      </form>
    )
  }
}

export default UserChangePassword