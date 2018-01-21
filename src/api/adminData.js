import api from './init'

export function getUserData(){
    return api.get('/users')
    .then(res => res.data)
}

export function getModuleData(){
    return api.get('/modules')
    .then(res => res.data)
}