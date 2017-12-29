import React from 'react'

function SignInForm({
  OnSignIn
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
          OnSignIn({ email, password })
        }}
      >
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