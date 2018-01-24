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

export function postNewModule(name, content){
    return api.post('/module', {name, content})
    .then(res => res.data)
}