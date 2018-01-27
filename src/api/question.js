import api from './init'

export function listQuestions(moduleId) {
  return api.get(`/module/${moduleId}/questions`)
  .then(res => res.data)
}

export function addMarking(data) {
  return api.post('/marking', data)
    .then(res => res.data)
}

export function checkMarking(userId) {
  return api.get(`/user/${userId}/markings`)
    .then(res => res.data)
}

export function checkIncorrectMarking(userId, moduleId){
  return api.get(`/user/${userId}/module/${moduleId}/markings/incorrect`)
  .then(res => res.data)
}