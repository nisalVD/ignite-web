import React, { Component } from 'react'
import { resendVerificationToken } from '../api/auth.js'
import {Button} from 'material-ui'
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';

class Verified extends Component {
  state = {
    res: null,
    dialogOpen: false
  }

  handleVerificationButton = () => {
    resendVerificationToken(this.props.decodedToken.sub)
      .then(res => {
        this.setState({res})
        this.setState({dialogOpen: true})
      })
  }

  render() {
    const {dialogOpen, res} = this.state
    return (
      <div>
        <Dialog
          open={dialogOpen}
          onClose={() => this.setState({dialogOpen: false})}
          fullWidth={true}
        >
            <DialogTitle>
              Verification
            </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {res && res.message.split(' ').map(item=> item.charAt(0).toUpperCase() + item.slice(1)).join(' ')}
          </DialogContentText>
          </DialogContent>
            <br/>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => this.setState({dialogOpen: false})}
              >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        User not verified
        <br />
        click <button onClick={this.handleVerificationButton}>here</button> to resend verification
      </div>
    )
  }
}

export default Verified
