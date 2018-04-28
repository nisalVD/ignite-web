import React from 'react'
import { resendVerificationToken } from '../api/auth.js'

const Verified = ({decodedToken}) => {
  return (
    <div>
      User not verified
      <button onClick={
        () => {
          resendVerificationToken(decodedToken.sub)
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }>resend verification</button>
    </div>
  )
}

export default Verified
