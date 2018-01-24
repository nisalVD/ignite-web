import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import AddModulePage from './components/AddModulePage'
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
import AdminQuestions from './components/AdminQuestions'
import Modal from 'react-modal'

class App extends Component {
  state = {
    // Restore the previous signed in data
    decodedToken: getDecodedToken(),
    error: null,
    modalOpen: false
  }

  onSignUp = ({email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber}) => {
    console.log('App Recieved', {email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber})
    signUp({email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber})
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch(error => {
        console.log(error)
        this.setState({error})
      })
  }

  onSignIn = ({ email, password}) => {
    signIn({email, password})
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch(error => {
        this.setState({error})
        this.setState({modalOpen: true})
      })
  }

  onSignOut = () => {
    console.log("onSignOut")
    signOutNow()
    this.setState({ decodedToken: null })
  }

  handleCloseModal () {
    this.setState({ modalOpen: false });
  }

  render() {
    const { decodedToken } = this.state
    const signedIn = !!decodedToken
    console.log(decodedToken)
    console.log('error', this.state.error && this.state.error)
    return (
      <Fragment>
        <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.handleCloseModal.bind(this)}
        style={customStyles}
        ariaHideApp={false}
        aria={{
          labelledby: "heading",
          describedby: "full_description"
        }}>
          <div>
            <p>{this.state.error && this.state.error}</p>
            <button className="admin-close-button" onClick={() => this.setState({modalOpen: false})}>X</button>
          </div>
      </Modal>
      <Router>
        <div className="App">
          <NavBar isAuthenticated={signedIn}/>

          <Switch>
            <Route exact path="/" render={()=><HomePage isAuthenticated={signedIn}/>}/>
            <Route exact path="/admin" render={()=> (
              decodedToken === null || decodedToken.admin === false ? (
                <Redirect to='/' />
              ) : (
                <AdminPage/>
              )
            )} />
            <Route exact path="/sign-in" render={()=> (
              signedIn ? (
                <Redirect to='/' />
              ) : (
                <SignInPage onSignIn={this.onSignIn}/>
              )
            )} />

            <Route exact path="/profile" render={()=> (
              signedIn ? (
                <ProfilePage decodedToken={decodedToken} onSignIn={this.onSignIn} onSignOut={this.onSignOut}/>
              ) : (
                <Redirect to='/' />
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
            
            <Route exact path="/admin/module/new" render={({routeProps})=>
                <AddModulePage {...routeProps}/>
              }/>

            <Route exact path="/modules" render={(routeProps)=>
                <ModuleList {...routeProps} userId={decodedToken.sub}/>
              }/>
            <Route exact path="/module/:id/questions" render={({match, routeProps})=>
                <Question {...routeProps} moduleId={match.params.id} userId={decodedToken.sub}/>
              }/>
              <Route exact path="/admin/module/:id/questions" render={({match, routeProps})=>
                decodedToken === null || decodedToken.admin === false ? (
                  <Redirect to='/' />
                ) : (
                  <AdminQuestions {...routeProps} moduleId={match.params.id} userId={decodedToken.sub}/>
                )
              }/>
          </Switch>
          <Footer/>
        </div>
      </Router>
      </Fragment>
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

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '30%',
    left                       : '30%',
    right                      : '30%',
    bottom                     : '50%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '5%',
  }
}

export default App;
