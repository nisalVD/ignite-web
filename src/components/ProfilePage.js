import React from 'react';
import Avatar from 'material-ui/Avatar';
import LetterAvatar from './Avatar';


function ProfilePage ({
    onSignUp,
    onSignOut
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
                        <button className="update-details-button" onClick={(event => onSignOut())}>UPDATE MY DETAILS</button>
                        <br /><br />
                        <div class="modules-container">
                            <div className="profile-left">
                                Modules Completed:
                                <br /><br />
                                <form>
                                  <label>
                                    <input type="radio" value="option1" checked={true} />
                                    Option 1
                                  </label>
                                  <label>
                                    <input type="radio" value="option2" />
                                    Option 2
                                  </label>
                                  <label>
                                    <input type="radio" value="option3" />
                                    Option 3
                                  </label>
                              </form>
                                Code of Conduct
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
                            <div className="support-div">
                            Need help?
                            <br />
                            Contact us at ignite@gmail.com or on 040909090
                            </div>
                        </div>
                        <div className="admin-page-padder"/>
                    </div>

                </div>
            </div>
        )
    }



export default ProfilePage