import React from 'react'

function SignInForm({
  onSignIn
}) {
    return (
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
      >     Sign In Page
      <div class="container">
          <div class="box"></div>
          <div class="container-forms">
              <div class="container-info">
              <div class="info-item">
                  <div class="table">
                  <div class="table-cell">
                      <p>
                      Have an account?
                      </p>
                      <div class="btn">
                      Log in
                      </div>
                  </div>
                  </div>
              </div>
              <div class="info-item">
                  <div class="table">
                  <div class="table-cell">
                      <p>
                      Don't have an account? 
                      </p>
                      <div class="btn">
                      Sign up
                      </div>
                  </div>
                  </div>
              </div>
              </div>
              <div class="container-form">
              <div class="form-item log-in">
                  <div class="table">
                  <div class="table-cell">
                      <input name="Username" placeholder="Username" type="text" /><input name="Password" placeholder="Password" type="Password" />
                      <div class="btn">
                      Log in
                      </div>
                  </div>
                  </div>
              </div>
              <div class="form-item sign-up">
                  <div class="table">
                  <div class="table-cell">
                      <input name="email" placeholder="Email" type="text" /><input name="fullName" placeholder="Full Name" type="text" /><input name="Username" placeholder="Username" type="text" /><input name="Password" placeholder="Password" type="Password" />
                      <div class="btn">
                      Sign up
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          </div>
          </div>
        <label

        >
        {'Email: '}
        </label>
        <input
          type="email"
          name="email"
        />
        <label

        >
        {'Password: '}
        </label>
        <input
          type="password"
          name="password"
        />
        <button>
          Sign In
        </button>
      </form>
    )
}

export default SignInForm