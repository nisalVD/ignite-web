import React, { Component } from 'react'
import {Button} from 'material-ui'
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';

import {changePasswordEmail} from '../api/updateUser.js'
import './ChangeForgetPassword.css'

class ChangeForgetPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    dialogOpen: false,
    message: ''
  }

  handleSubmit = () => {
    const {id} = this.props.match.params
    const {token} = this.props.match.params
    const {password, confirmPassword} = this.state

    if (password === confirmPassword) {
      changePasswordEmail(id, token, password)
        .then(res => {
          this.setState({dialogOpen: true})
          this.setState({message: res.message})
          // redirect in 3 seconds to homepage
          setTimeout(() => {
            this.props.history.push('/')
          }, 3000);
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

  handleDialogOkButton = () => {
    this.setState({dialogOpen: false})
    this.props.history.push('/')
  }

  render() {
    const {password, confirmPassword, dialogOpen, message} = this.state

    return (
      <div className="forget-password-container">
        <Dialog
          open={dialogOpen}
          onClose={() => this.setState({dialogOpen: false})}
          fullWidth={true}
        >
            <DialogTitle>
              Change Password
            </DialogTitle>
          <DialogContent>
            <DialogContentText>
                This will redirect to homepage in 3 seconds
          </DialogContentText>
            <DialogContentText>
                {message}
            </DialogContentText>
          </DialogContent>
            <br/>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleDialogOkButton}
              >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
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
