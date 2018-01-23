import React from 'react';
import Avatar from 'material-ui/Avatar';
import LetterAvatar from './Avatar';
import UpdateDetailsButton from './UpdateDetailsButton'
import CheckList from './CheckList'


function ProfilePage ({
    onSignUp,
    onSignOut,
    onUpdateUser
})
    {
        return (
            <div>
               <div className="profile-page">
                    <div className="profile-page-div">
                        <LetterAvatar/>
                        <br/>
                        Nisal Don
                        <br /><br />
                        <button className="sign-out-button" onClick={(event => onSignOut())}>SIGN OUT</button>
                        <br /><br />
                        <UpdateDetailsButton onUpdateUser={onUpdateUser}/>
                        <br /><br />
                        <div class="modules-container">
                            <div className="profile-left">
                                Modules Completed:
                                <br /><br />
                                Code of Conduct
                                <br />
                                OH&S
                                <br />
                                Camping
                                <br />
                                Mentoring
                                <br />
                                OH&S
                                <br />
                                Camping
                                <br />
                                Mentoring
                                <br /> 
                                OH&S
                                <br />
                                Camping
                                <br />
                                Mentoring
                                <br /> 
                                OH&S
                                <br />
                                Camping
                                <br />
                                Mentoring
                                <br />  
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



export default ProfilePage