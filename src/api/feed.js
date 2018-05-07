import api from './init'

export function listFeeds() {
  return api.get('/feeds')
    .then(res => res.data)
}

export function deleteFeedData(id){
  return api.delete(`/feed/${id}`)
  .then(res => res.data)
}

