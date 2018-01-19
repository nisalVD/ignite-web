import React from 'react'

function UserInfoFormSignUp ({
    OnSignIn
})
    {
        return (
            <div className="user-info-form-sign-up">
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
                  autofocus="true"
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
                <br /><br />
                <label>
                {'confirm password'}
                </label>
                <br />
                <input
                  type="password"
                  name="password-confirmation"
                />
                <br /><br />
                <label>
                {'first name'}
                </label>
                <br />
                <input
                  type="text"
                  name="firstName"
                />
                <br /><br />
                <label>
                {'last name'}
                </label>
                <br />
                <input
                  type="text"
                  name="lastName"
                />
                <br /><br />
                <label>
                {'date of birth'}
                </label>
                <br />
                <input
                  type="date"
                  name="dateOfBirth"
                />
                <br /><br />
                <label>
                {'address'}
                </label>
                <br />
                <input
                  type="text"
                  name="address"
                />
                <br /><br />
                <label>
                {'postcode'}
                </label>
                <br />
                <input
                  type="text"
                  name="postCode"
                />
                <br /><br />
                <label>
                {'state'}
                </label>
                <br />
                <input
                  type="text"
                  name="state"
                />
                <br />
                <button type="button" className="sign-in-button">SIGN UP</button>
              </form>
            </div>
        )
    }


export default UserInfoFormSignUp