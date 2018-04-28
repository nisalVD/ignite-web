import React, { Component } from 'react'
import {verifyUser, signOutNow} from '../api/auth.js'
import { setToken } from '../api/init.js'

class VerifyAccount extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    if (this.props.decodedTokenUpdated) {
      this.props.history.push('/')
    }
    const {match} = this.props
    const params = match.params
    const id = params.id
    const token = params.token
    verifyUser(id, token)
      .then(res => {
          console.log('res', res)
        if(res.token) {
          console.log('token', res.token)
          this.setState({message: 'sucessfully verified'})
          setToken(res.token)
          this.props.updateDecodedToken()
          this.props.history.push('/')
          return
        } else {
          this.setState({message: res.message})
        }
      })
      .catch(error => {
        this.setState({message: error})
      })
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}

export default VerifyAccount
