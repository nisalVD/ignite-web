import api from './init'

export function getStatus() {
  return api.get('/')
    .then(res => res.data)
}