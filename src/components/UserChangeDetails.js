import React, { Component } from 'react'
import './UserChangeDetails.css'
import { Button, CircularProgress } from "material-ui";
import Dialog, {DialogContent, DialogContentText} from 'material-ui/Dialog';
import { getUserDetails, updateDetails } from '../api/updateUser.js'
class UserChangeDetails extends Component {
  state = {
    user: null,
    loadingSubmission: false,
    dialogOpen: false,
    dialogText: ''
  }

  componentDidMount() {
    getUserDetails()
      .then(user => {
        this.setState({user})
    })
  }

  parseDate = (date) => {
    const parsedDate = date.split('T')[0]
    return parsedDate
  }


  // Update dialog
  openDialogWithMessage(dialogText) {
    this.setState({dialogText})
    this.setState({dialogOpen: true})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const elements = e.target.elements

    const email = elements.email.value
    const firstName = elements.firstName.value
    const lastName = elements.lastName.value
    const dateOfBirth = elements.dateOfBirth.value
    const address = elements.address.value
    const postCode = elements.postCode.value
    const state = elements.state.value
    const mobileNumber = elements.mobileNumber.value


    this.setState({loadingSubmission: true})
    updateDetails({email, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber})
      .then(user => {
        this.setState({user})
        this.setState({loadingSubmission: false})
        this.openDialogWithMessage("User Details have been sucessfully updated")
      })
      .catch(error => {
        this.openDialogWithMessage("Something went wrong")
        console.log('error', error)
      })
  }

  render() {
    const {user, loadingSubmission, dialogOpen, dialogText} = this.state
    if (user === null) {
      return (
        <div className="user-details-spinner-container">
          <CircularProgress size={59.5} />
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit} className="change-details-form-container">
        <Dialog
          open={dialogOpen}
          onClose={() => this.setState({dialogOpen: false})}
        >
          <DialogContent>
            <DialogContentText>
              {dialogText}
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <label className="change-details-label">Email</label>
        <input
          defaultValue={user.email}
          name="email"
          placeholder="Email"
          className="change-details-input"
        />

        <label className="change-details-label">First Name</label>
        <input
          defaultValue={user.firstName}
          name="firstName"
          placeholder="First Name"
          className="change-details-input"
        />

        <label className="change-details-label">Last Name</label>
        <input
          defaultValue={user.lastName}
          name="lastName"
          placeholder="Last Name"
          className="change-details-input"
        />

        <label className="change-details-label">Date Of Birth</label>
        <input
          type="date"
          defaultValue={this.parseDate(user.dateOfBirth)}
          name="dateOfBirth"
          placeholder="Date Of Birth"
          className="change-details-input"
        />

        <label className="change-details-label">Address</label>
        <input
          defaultValue={user.address}
          name="address"
          placeholder="Address"
          className="change-details-input"
        />

        <label className="change-details-label">Post Code</label>
        <input
          defaultValue={user.postCode}
          name="postCode"
          placeholder="Post Code"
          className="change-details-input"
        />

        <label className="change-details-label">State</label>
        <input
          defaultValue={user.state}
          name="state"
          placeholder="State"
          className="change-details-input"
        />

        <label className="change-details-label">Mobile Number</label>
        <input
          defaultValue={user.mobileNumber}
          name="mobileNumber"
          placeholder="Mobile Number"
          className="change-details-input"
        />
        <div className="change-details-div">
          {loadingSubmission ?
            <CircularProgress />
            :
        <Button
          className="change-details-div"
          type="submit"
          raised
          color="primary"
        >
          Submit
        </Button>
        }
      </div>
      </form>
   )
  }
}

export default UserChangeDetails

