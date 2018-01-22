import api from './init'
export function listModules() {
  return api.get('/modules')
    .then(res => res.data)
}

import api from './init'
export function findModule(id){
  return api.get(`/module/${id}`)
    .then(res => res.data)
}