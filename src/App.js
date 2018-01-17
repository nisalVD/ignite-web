import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import NavBar from './components/NavBar'
import { signIn, signOutNow } from './api/auth'
import { getStatus } from './api/status'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    // Restore the previous signed in data
    decodedToken: getDecodedToken()
  }

  OnSignIn = ({ email, password}) => {
    console.log('App Recieved', {email, password})
    signIn({email, password})
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
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
              <button
                onClick={ this.onSignOut }
              >
                SignOut
              </button>
            </div>
          ) : (
            <div>
              <NavBar isAuthenticated={false}/>
              <SignInForm
                OnSignIn={ this.OnSignIn }
              />
            </div>
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
