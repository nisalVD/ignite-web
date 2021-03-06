import React from 'react'

function UserInfoFormSignIn ({
    onSignIn
})
    {
        return (
            <div className="user-info-form-sign-in">
              <form
                onSubmit={event => {
                  // Prevent default form submission
                  event.preventDefault()

                  const form = event.target
                  const elements = form.elements
                  // Get entered values
                  const email = elements.email.value
                  const password = elements.password.value
                  onSignIn({ email, password })
                }}
              > 
                <label>
                {'email'}
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                />
                <br /><br />
                <label>
                {'password'}
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                />
                <br />
                <button className="sign-in-button">SIGN IN</button>
              </form>
            </div>
        )
    }


export default UserInfoFormSignIn