import axios from 'axios'
import {rememberToken, getValidToken} from './token'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export function setToken(token) {
  rememberToken(token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Validates the token and if its invalid, remove it from local storage
setToken(getValidToken())

export default api
