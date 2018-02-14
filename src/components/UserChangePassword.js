import React, { Component } from 'react'
import { changePassword } from '../api/updateUser'

class UserChangePassword extends Component {
  state = {
    error : null
  }
    handleChangePassword = (event) => {
      event.preventDefault()
      const {elements} = event.target
      const newPassword = elements.newPassword.value
      const newPasswordConfirm = elements.newPasswordConfirm.value
      const oldPassword = elements.oldPassword.value
      console.log('newPassword', newPassword)
      console.log('newPasswordConfirm', newPasswordConfirm)
      changePassword(oldPassword, newPassword)
        .then(response => {
          if(response.success !== 'success'){
            this.setState({error: 'Incorrect Password'})
          }
        })
        .catch(error => console.log(error))
    }
  render () {
    const {error} = this.state
    console.log('error', error)
    return (
      <div>
        <p>{error && error}</p>
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
          <label>
            Confirm NewPassword:
            <input 
              type="text"
              name="newPasswordConfirm"
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