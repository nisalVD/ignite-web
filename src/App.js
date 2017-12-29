import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { getStatus } from './api/status'
import { setToken } from './api/init'

class App extends Component {
  state = {
    decodedToken: null
  }

  OnSignIn = ({ email, password}) => {
    console.log('App Recieved', {email, password})
    signIn({email, password})
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        {
          !!decodedToken ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in At: { new Date(decodedToken.iat *1000).toISOString()}</p>
              <p>Expires At: { new Date(decodedToken.exp *1000).toISOString()}</p>
            </div>
          ) : (
            <SignInForm
              OnSignIn={ this.OnSignIn }
            />
          )
        }
      </div>
    );
  }

  // When app first appears on screen
  componentDidMount() {
    getStatus()
      .then(status => {
        console.log(status)
      })
      .catch(error => {
        console.error('error loading status', error)
      })
  }
}

export default App;
