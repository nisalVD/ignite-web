import React, { Component } from 'react'
import LetterAvatar from './Avatar';
import UpdateDetailsButton from './UpdateDetailsButton'
import CheckList from './CheckList'
import { checkMarking } from '../api/question'

class ProfilePage extends Component {
  state = {
    currentUserMarkingData: null,
  }

  componentDidMount() {
    checkMarking(this.props.userId) 
    .then(currentUserMarkingData => {
      this.setState({currentUserMarkingData})
    })
  }

  isModuleCompleted(module) {
    const {currentUserMarkingData} = this.state
    const mappedMarking = currentUserMarkingData && currentUserMarkingData.reduce((acc,next) => {
      if (next.module === module._id){
        acc.push(next)
      }
      return acc
    },[])
    function isEveryTrue(element){
      return element.correct === true
    }
    console.log(mappedMarking)

    let isCorrect = false
    if (!!mappedMarking){
      if(mappedMarking.length > 0) {
        isCorrect = mappedMarking.every(isEveryTrue)
      } else {
        isCorrect = false
      }
    }
    return isCorrect
 }

  render () {

        return (
            <div>
               <div className="profile-page">
                    <div className="profile-page-div">
                        <LetterAvatar/>
                        <br/>
                        Nisal Don
                        <br /><br />
                        <button className="sign-out-button" onClick={(event => this.props.onSignOut())}>SIGN OUT</button>
                        <br /><br />
                        <UpdateDetailsButton/>
                        <br /><br />
                        <div className="modules-container">
                            <div className="profile-left">
                                Modules Completed:
                            </div>
                            <div className="profile-right">
                                <a href="./modules"><button type="button" className="modules-button">MODULES</button></a>
                            </div>
                        </div>
                        <br /><br />
                              <div className="induction-box">
                              <div className="induction-instructions">
                                In order to qualify to volunteer at Ignite you must complete the list of requirements.
                                <br /> 
                                Please ensure you have:
                              </div>
                                <br />
                              <div className="induction-list">
                                {/* <form className="induction-form">
                                  <label>
                                    <input className="induction-radio" type="radio" value="option1" />
                                    Completed Modules
                                  </label>
                                  <br />
                                  <label>
                                    <input className="induction-radio" type="radio" value="option2" />
                                    Sent Photo ID to Ignite
                                  </label>
                                  <br />
                                  <label>
                                    <input className="induction-radio" type="radio" value="option3" />
                                    Working With Children Check
                                  </label>
                                  <br /><br />
                                  <input type="submit"></input>
                                  <br /><br />
                                  <input type="reset"/>
                              </form> */}
                              <CheckList/>
                              </div>
                              </div>
                        <br /><br />
                            <div className="support-div">
                            Need help?
                            <br />
                            Contact us at ignite@gmail.com or on 040909090
                            </div>
                        <div className="admin-page-padder"/>
                    </div>

                </div>
            </div>
    )
  }
}

export default ProfilePage