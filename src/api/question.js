import api from './init'

export function listQuestions(moduleId) {
  return api.get(`/module/${moduleId}/questions`)
  .then(res => res.data)
}

export function addMarking(data) {
  return api.post('/marking', data)
    .then(res => res.data)
}