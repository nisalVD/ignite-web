import api from './init'

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

export function addAnswer(answer) {
  return api.post('/answer', answer)
    .then(res => res.data)
}