import api from './init'

export function listFeeds() {
  return api.get('/feeds')
    .then(res => res.data)
}