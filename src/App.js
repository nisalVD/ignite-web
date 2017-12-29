import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'

class App extends Component {
  OnSignIn = ({ email, password}) => {
    console.log('App Recieved', {email, password})
    signIn({email, password})
      .then(data => {
        console.log('signed in', data)
      })
  }
  render() {
    return (
      <div className="App">
        <SignInForm
          OnSignIn={ this.OnSignIn }
        />
      </div>
    );
  }
}

export default App;
