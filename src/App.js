import React, {Component, Fragment} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Modal from "react-modal"
import Redirect from "react-router-dom/Redirect"

// static pages
import HomePage from "./HomePage/HomePage"
import ProfilePage from "./components/ProfilePage"
import CalendarPage from "./components/CalendarPage"

// SignIn And SignUp Update User
import SignInPage from "./components/SignInPage"
import SignUpPage from "./components/SignUpPage"
import UserChangePassword from "./components/UserChangePassword"
import UserChangeDetails from "./components/UserChangeDetails.js"
import ForgetPassword from "./SignUpAndLogin/ForgetPassword.js"
import ChangeForgetPassword from './SignUpAndLogin/ChangeForgetPassword.js'

// SignUp Test
import SignUp from './SignUpAndLogin/SignUp.js'
import Login from './SignUpAndLogin/Login.js'

// not verified test
import VerifyAccount from './SignUpAndLogin/VerifyAccount.js'
import Verified from './SignUpAndLogin/Verified.js'

// Navbar And Footer
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

// api calls
import {signUp, signIn, signOutNow} from "./api/auth"
import {getDecodedToken} from "./api/token"

// Module and questions
import ModuleList from "./Modules/ModuleList"
import Question from "./Modules/Question"

// Admin Panel
import AdminModuleView from "./AdminPanel/AdminModuleView"
import AdminQuestions from "./AdminPanel/AdminQuestions"
import AdminIndex from "./AdminPanel/AdminIndex"
import AddModulePage from "./AdminPanel/AddModulePage"

class App extends Component {
  state = {
    // Restore the previous signed in data
    decodedToken: getDecodedToken(),
    error: null,
    modalOpen: false,
    width: window.innerWidth,
    decodedTokenUpdated: false
  }

  componentDidMount() {
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    window.addEventListener("resize", this.updateWindowDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({width: window.innerWidth})
  }

  onSignUp = ({
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
    dateOfBirth,
    address,
    postCode,
    state,
    mobileNumber,
  }) => {
    signUp({
      email,
      password,
      passwordConfirmation,
      firstName,
      lastName,
      dateOfBirth,
      address,
      postCode,
      state,
      mobileNumber,
    })
      .then(decodedToken => {
        this.setState({decodedToken})
      })
      .catch(error => {
        this.setState({error})
      })
  }

  handleLogin = (decodedToken) => {
    console.log(decodedToken)
    this.setState({decodedToken})
  }

  onSignIn = ({email, password}) => {
    signIn({email, password})
      .then(decodedToken => {
        this.setState({decodedToken})
      })
      .catch(error => {
        this.setState({error})
        this.setState({modalOpen: true})
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({decodedToken: null})
  }

  handleCloseModal() {
    this.setState({modalOpen: false})
  }

  updateDecodedToken = () => {
    this.setState({decodedToken: getDecodedToken(), decodedTokenUpdated: true})
  }

  render() {
    const {decodedToken} = this.state
    const signedIn = !!decodedToken
    const {width} = this.state

    if (width < 1100) {
      return (
        <center>
          <h1>Something Went Wrong :(</h1>
          <p style={{maxWidth:400}}>You may be attempting to access the Ignite Volunteer portal from a device smaller than 1100px in width.<br /> If you are on a mobile or tablet device please try again from a laptop or desktop.</p>
        </center>
      )
    }

    if (decodedToken && decodedToken.verified === false && decodedToken.admin === false) {
      return (
        <Router>
          <Switch>

            <Route
              exact
              path="/verify-account/:id/:token"
              render={(props) =>
                <VerifyAccount {...props} updateDecodedToken={this.updateDecodedToken} />}
              />

            <Route
              path="/"
              render={() => <Verified decodedToken={decodedToken}/>}
            />

          </Switch>
        </Router>
      )
    }

    return (
      <Fragment>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.handleCloseModal.bind(this)}
          style={customStyles}
          ariaHideApp={false}
          aria={{
            labelledby: "heading",
            describedby: "full_description",
          }}>
          <div>
            <p>{this.state.error && this.state.error}</p>
            <button
              className="admin-close-button"
              onClick={() => this.setState({modalOpen: false})}>
              X
            </button>
          </div>
        </Modal>
        <Router>
          <div className="App">
            <NavBar isAuthenticated={signedIn} />

            <Switch>


              <Route
                exact
                path="/"
                render={() => <HomePage isAuthenticated={signedIn} />}
              />

              <Route exact
                path="/verify-account/:id/:token"
                render={(props) =>
                <VerifyAccount {...props} updateDecodedToken={this.updateDecodedToken} decodedTokenUpdated={this.state.decodedTokenUpdated}/>}
              />

              <Route
                exact
                path="/user/forget-password"
                render={() =>
                    signedIn ? <Redirect to="/" /> :  <ForgetPassword />
                }
              />

              <Route
                exact
                path="/user/forget-password/update/:id/:token"
                render={(props) =>
                      signedIn ? <Redirect to="/" /> :  <ChangeForgetPassword {...props} />
                }
              />

              <Route
                exact
                path="/verify-account-message"
                render={() =>
                    !signedIn && <Verified />
                }
              />

              <Route
                exact
                path="/admin"
                render={routeProps =>
                  decodedToken === null || decodedToken.admin === false ? (
                    <Redirect to="/" />
                  ) : (
                    <AdminIndex {...routeProps} />
                  )
                }
              />

              <Route
                exact
                path="/profile"
                render={() =>
                  signedIn ? (
                    <ProfilePage
                      decodedToken={decodedToken}
                      onSignIn={this.onSignIn}
                      onSignOut={this.onSignOut}
                    />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />

              <Route
                exact
                path="/sign-in"
                render={(props) =>
                  signedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Login {...props} handleLogin={this.handleLogin}/>
                  )
                }
              />

              <Route
                exact
                path="/sign-up"
                render={(props) =>
                  signedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SignUp {...props}/>
                  )
                }
              />

              {/*###### Change Password */}
              <Route
                exect
                path="/user/change-password"
                render={() =>
                  signedIn ? <UserChangePassword /> : <Redirect to="/" />
                }
              />
              <Route
                exect
                path="/user/change-details"
                render={() =>
                  signedIn ? <UserChangeDetails /> : <Redirect to="/" />
                }
              />

              <Route
                exact
                path="/calendar"
                render={() =>
                  signedIn ? <CalendarPage /> : <Redirect to="/" />
                }
              />

              <Route
                exact
                path="/admin/module/new"
                render={routeProps =>
                  decodedToken === null || decodedToken.admin === false ? (
                    <Redirect to="/" />
                  ) : (
                    <AddModulePage {...routeProps} />
                  )
                }
              />

              <Route
                exact
                path="/admin/module/:id/view"
                render={({match}) =>
                  decodedToken === null || decodedToken.admin === false ? (
                    <Redirect to="/" />
                  ) : (
                    <AdminModuleView selectedModuleId={match.params.id} />
                  )
                }
              />

              <Route
                exact
                path="/modules"
                render={routeProps =>
                  !signedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <ModuleList {...routeProps} userId={decodedToken.sub} />
                  )
                }
              />
              <Route
                exact
                path="/module/:id/questions"
                render={({match, routeProps}) => (
                  <Question
                    {...routeProps}
                    moduleId={match.params.id}
                    userId={decodedToken.sub}
                  />
                )}
              />
              <Route
                exact
                path="/admin/module/:id/questions"
                render={({match, routeProps}) =>
                  decodedToken === null || decodedToken.admin === false ? (
                    <Redirect to="/" />
                  ) : (
                    <AdminQuestions
                      {...routeProps}
                      moduleId={match.params.id}
                      userId={decodedToken.sub}
                    />
                  )
                }
              />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </Fragment>
    )
  }
}

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    top: "30%",
    left: "30%",
    right: "30%",
    bottom: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "5%",
  },
}

export default App
