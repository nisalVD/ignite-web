import React, {Component} from "react"
import LetterAvatar from "./Avatar"
import UpdateDetailsButton from "./UpdateDetailsButton"
import CheckList from "./CheckList"
import {Link} from "react-router-dom"
import {listModules} from "../api/module"
import {checkMarking} from "../api/question"

class ProfilePage extends Component {
  state = {
    currentUserMarkingData: null,
    modules: null,
  }

  componentDidMount() {
    checkMarking(this.props.decodedToken.sub)
      .then(currentUserMarkingData => {
        this.setState({currentUserMarkingData})
      })
      .catch(error => console.log(error))

    listModules()
      .then(modules => this.setState({modules}))
      .catch(error => console.log(error))
  }

  isModuleCompleted(module) {
    const {currentUserMarkingData} = this.state
    const mappedMarking =
      currentUserMarkingData &&
      currentUserMarkingData.reduce((acc, next) => {
        if (next.module === module._id) {
          acc.push(next)
        }
        return acc
      }, [])
    function isEveryTrue(element) {
      return element.correct === true
    }
    let isCorrect = false
    if (!!mappedMarking) {
      if (mappedMarking.length > 0) {
        isCorrect = mappedMarking.every(isEveryTrue)
      } else {
        isCorrect = false
      }
    }
    return isCorrect
  }

  render() {
    const {modules} = this.state
    return (
      <div>
        <div className="profile-page">
          <div className="profile-page-div">
            <LetterAvatar />
            <br />
            {this.props.decodedToken.email}
            <br />
            <br />
            <button
              className="sign-out-button"
              onClick={event => this.props.onSignOut()}>
              SIGN OUT
            </button>
            <br />
            <br />
            <Link to="/user/change-password">
              <button className="sign-out-button">CHANGE PASSWORD</button>
            </Link>
            <br />
            <br />
            {/* <UpdateDetailsButton onUpdateUser={onUpdateUser}/> */}
            <br />
            <br />
            <div className="modules-container">
              <div className="profile-left">
                <h3>Modules Completed: </h3>
                {modules &&
                  modules.map(module => {
                    return (
                      <div>
                        {this.isModuleCompleted.bind(this, module)() && (
                          <p>{module.name}</p>
                        )}
                      </div>
                    )
                  })}
              </div>
              <div className="profile-right">
                <Link to={`./modules`}>
                  <button type="button" className="modules-button">
                    MODULES
                  </button>
                </Link>
              </div>
            </div>
            <br />
            <br />
            <div className="induction-box">
              <div className="induction-instructions">
                In order to qualify to volunteer at Ignite you must complete the
                list of requirements.
                <br />
                Please ensure you have:
              </div>
              <br />
              <div className="induction-list">
                <CheckList />
              </div>
            </div>
            <br />
            <br />
            <div className="support-div">
              Need help?
              <br />
              Contact us at ignite@gmail.com or on 040909090
            </div>
            <div className="admin-page-padder" />
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
