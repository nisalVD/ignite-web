import React from 'react'
import UserInfoFormSignIn from "./UserInfoFormSignIn"
import { Link } from "react-router-dom"


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
                        <Link to={`./sign-up`}><button type="button" className="sign-up-button-2">SIGN UP NOW</button></Link>
                    </div>
                </div>

                <UserInfoFormSignIn onSignIn = {onSignIn}/>
            </div>
        )
    }



export default SignInPage