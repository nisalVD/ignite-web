import React, { Component } from 'react'
import { changePassword } from '../api/updateUser'

class UserChangePassword extends Component {
  state = {
    success: null
  }
    handleChangePassword = (event) => {
      event.preventDefault()
      const {elements} = event.target
      const newPassword = elements.newPassword.value
      const oldPassword = elements.oldPassword.value
      changePassword(oldPassword, newPassword)
        .then(response => {
          this.setState({success: response.success})
        })
        .catch(error => console.log(error))
    }
  render () {
    const {success} = this.state
    console.log('success', success)
    return (
      <div>
        {
          success === false && <p>Incorrect Password</p>
        }
        {
          success === true && <p>Password Changed</p>
        }
        <form onSubmit={this.handleChangePassword}>
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
              name="newPassword"
              />
          </label>
          <br/>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default UserChangePassword