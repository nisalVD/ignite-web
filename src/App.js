import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from './components/HomePage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import CalendarPage from './components/CalendarPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { signUp, signIn, signOutNow } from './api/auth'
import { getStatus } from './api/status'
import { getDecodedToken } from './api/token'
import AdminPage from './components/AdminPage';
import Redirect from 'react-router-dom/Redirect';
import ModuleList from './components/ModuleList'
import CodeOfConduct from './components/CodeOfConduct'
import Question from './components/Question'

class App extends Component {
  state = {
    // Restore the previous signed in data
    decodedToken: getDecodedToken(),
    error: null
  }

  onSignUp = ({ email, password, passwordConfirmation, firstName, lastName, mobileNumber, dateOfBirth, address, postCode, state }) => {
    // console.log('App Recieved', {email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state})
    signUp({email, password, passwordConfirmation, firstName, lastName, mobileNumber, dateOfBirth, address, postCode, state})
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch(error => {
        this.setState({error})
      })
  }

  onSignIn = ({ email, password}) => {
    // console.log('App Recieved', {email, password})
    signIn({email, password})
      .then(decodedToken => {
        // console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
      .catch(error => {
        this.setState({error})
      })
  }

  onSignOut = () => {
    console.log("onSignOut")
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken } = this.state
    const signedIn = !!decodedToken
    // const signedIn = false
    return (
     

      <Router>
        <div className="App">
          <NavBar isAuthenticated={signedIn}/>
          <Switch>
            <Route exact path="/" render={()=><HomePage isAuthenticated={signedIn} onSignOut={this.onSignOut}/>}/>
            <Route exact path="/admin" component={AdminPage}/>
            <Route exact path="/sign-in" render={()=> (
              signedIn ? (
                <Redirect to='/' />
              ) : (
                <SignInPage onSignIn={this.onSignIn}/>
              )
            )} />

            <Route exact path="/sign-up" render={()=> (
              signedIn ? (
                <Redirect to='/' />
              ) : (
                <SignUpPage onSignUp={this.onSignUp}/>
              )
            )} />

            <Route exact path="/calendar" render={()=> (
              signedIn ? (
                <CalendarPage/>
              ) : (
                <Redirect to='/' />
              )
            )} />

            <Route exact path="/modules" render={()=>
                <ModuleList userId={decodedToken.sub}/>
              }/>
            <Route exact path="/module/:id/questions" render={({match})=>
                <Question moduleId={match.params.id} userId={decodedToken.sub}/>
              }/>
            <Route exact path="/code-of-conduct-module" component={CodeOfConduct}/>                                    
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
