import api from './init'

export function getUserData(){
    return api.get('/users')
    .then(res => res.data)
}