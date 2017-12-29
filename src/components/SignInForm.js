import React, { Component } from 'react'

function SignInForm({
}) {
    return (
      <form
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