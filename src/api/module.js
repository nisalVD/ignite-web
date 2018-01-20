import api from './init'
export function listModules() {
  return api.get('/modules')
  .then(res => res.data)
}