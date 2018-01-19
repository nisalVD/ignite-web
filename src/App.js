import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import SignInForm from './components/SignInForm'
import HomePage from './components/HomePage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import CalendarPage from './components/CalendarPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
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
    // const signedIn = !!decodedToken
    const signedIn = true
    return (
     

      <Router>
        <div className="App">
          <NavBar isAuthenticated={signedIn}/>
          <Switch>
            <Route exact path="/" render={()=><HomePage isAuthenticated={signedIn}/>}/>
            <Route exact path="/sign-in" component={SignInPage}/>
            <Route exact path="/sign-up" component={SignUpPage}/>
            <Route exact path="/calendar" component={CalendarPage}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
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
