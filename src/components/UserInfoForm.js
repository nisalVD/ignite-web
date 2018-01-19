import React from 'react'

function UserInfoForm ({
    OnSignIn
})
    {
        return (
            <div className="user-info-form">
              <form
                onSubmit={event => {
                  // Prevent default form submission
                  event.preventDefault()

                  const form = event.target
                  const elements = form.elements
                  // Get entered values
                  const email = elements.email.value
                  const password = elements.password.value
                  OnSignIn({ email, password })
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
                <button type="button" className="sign-in-button">SIGN IN</button>
              </form>
            </div>
        )
    }


export default UserInfoForm