import React, { Component } from 'react'
import { changePassword } from '../api/updateUser'

class UserChangePassword extends Component {
  state = {
    error : null,
    passwordChanged: false
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
        .then(() => {
          const later = (delay, value) =>
          new Promise(resolve => setTimeout(resolve, delay, value));
          later(3000, null)
            .then(error => this.setState({error}))
        })
        .catch(error => {
          this.setState({passwordChanged: error.response.data.sucess})
          // if(error.response.data.success === true) {
          //   this.setState({passwordChanged: true})
          // }
        })
    }
  render () {
    const {error, passwordChanged} = this.state
    console.log('error', error)
    console.log('password Changed', this.state.passwordChanged)
    return (
      <div>
        { passwordChanged &&
          <p>Password Changed</p>
        }
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