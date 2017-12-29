import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api