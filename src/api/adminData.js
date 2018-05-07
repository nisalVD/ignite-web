import api from './init'

export function deleteUser(id) {
  return api.delete(`/admin/user/${id}`)
    .then(res => res.data)
}

export function getUserData(){
    return api.get('/users')
    .then(res => res.data)
}

export function getModuleData(){
  return api.get('/modules')
  .then(res => res.data)
}

export function deleteModuleData(id){
    return api.delete(`/module/${id}`)
    .then(res => res.data)
}

export function getQuestionData(){
    return api.get(`/questions`)
    .then(res => res.data)
}

export function addQuestion(data){
  return api.post('/question', data)
    .then(res => res.data)
}

export function listAnswers() {
  return api.get('/answers')
    .then(res => res.data)
}

export function addAnswer({question, answer}) {
  return api.post('/answer', {question, answer})
    .then(res => res.data)
}

export function deleteQuestion(id) {
  return api.delete(`/question/${id}`)
    .then(res => res.data)
}

export function deleteAnswer(id) {
  return api.delete(`/question/${id}/answer`)
  .then(res => res.data)
}

export function postNewModule(name, content){
    return api.post('/module', {name, content})
    .then(res => res.data)
}

export function listMarkings() {
  return api.get('/markings')
    .then(res => res.data)
}
