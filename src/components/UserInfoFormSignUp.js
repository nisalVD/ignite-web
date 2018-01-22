import React from 'react'

function UserInfoFormSignUp ({
    onSignUp
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
                  const passwordConfirmation = elements.passwordConfirmation.value
                  const firstName = elements.firstName.value
                  const lastName = elements.lastName.value
                  const mobileNumber = elements.mobileNumber.value
                  const dateOfBirth = elements.dateOfBirth.value
                  const address = elements.address.value
                  const postCode = elements.postCode.value
                  const state = elements.state.value

                  console.log(elements)
                  onSignUp({ email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber })
                }}
              > 
                <label>
                {'email'}
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  autoFocus="true"
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
                  name="passwordConfirmation"
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
                {'mobile number'}
                </label>
                <br />
                <input
                  type="number"
                  name="mobileNumber"
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
                <br />< br />
                <label>
                {'mobile number'}
                </label>
                <br />
                <input
                  type="text"
                  name="mobileNumber"
                />
                <br />
                <button className="sign-in-button">SIGN UP</button>
              </form>
            </div>
        )
    }


export default UserInfoFormSignUp