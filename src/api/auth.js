import api, { setToken } from './init'
import { getDecodedToken } from './token'

//check if email is valid
export function isEmailValid(email) {
  return api.post('/user/email/is-valid', {email})
    .then(res => res.data)
}

export function signIn({ email,password }) {
  return api.post('/auth', { email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
    .catch((error) => {
      if (/ 401/.test(error.message)) {
        error = ('The email/password combination was incorrect')
      }

      throw error
    })
}

export function signUp({email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber}) {
  return api.post('/auth/register', {email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state, mobileNumber})
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}


export function signOutNow() {
  setToken(null)
}


export function verifyUser(id, token) {
  return api.post('/verify-token', {id, token})
    .then(res => res.data)
}
