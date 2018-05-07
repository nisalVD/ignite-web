import React from 'react'
import UserInfoFormSignUp from "./UserInfoFormSignUp"

function SignUpPage ({
    onSignUp
})
    {
        return (
            <div>
               <div className="sign-up-page">
                SIGN UP

                <UserInfoFormSignUp onSignUp={onSignUp}/>

                </div>
            </div>
        )
    }



export default SignUpPage
