import React from 'react'
import UserInfoFormSignIn from "./UserInfoFormSignIn"


function SignInPage ({
    onSignIn
})
    {
        return (
            <div className="sign-in-page">
                SIGN IN
                <div className="sign-in-blue-box">
                    <div className="sign-in-page-spacer">
                        <p> Don't have an account? </p>
                        <a href="./sign-up"><button type="button" className="sign-up-button-2">SIGN UP NOW</button></a>
                    </div>
                </div>

                <UserInfoFormSignIn onSignIn = {onSignIn}/>
            </div>
        )
    }



export default SignInPage