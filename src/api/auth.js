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

export function signUp({ email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state}) {
  return api.post('/auth/register', {email, password, passwordConfirmation, firstName, lastName, dateOfBirth, address, postCode, state})
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

export function signOutNow() {
  setToken(null)
}
