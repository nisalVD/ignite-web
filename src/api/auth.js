import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signIn({ email,password }) {
  return api.post('/auth', { email, password })
    .then(res => { 
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
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
