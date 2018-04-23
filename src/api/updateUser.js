import api from './init'
import { getUserData } from './adminData';

export function changePassword(oldPassword, newPassword) {
  return api.patch('/user/password/update', {oldPassword, newPassword})
    .then(res => res.data)
}

export function getUserDetails() {
  return api.get('/user/details/get-details')
    .then(res => res.data)
}

export function updateDetails(userDetails) {
  return api.patch('/user/details/update', userDetails)
    .then(res => res.data)
}

export function userFinishedChecklist() {
  return api.post('/user/check-list-complete')
    .then(res => res.data)
}

export default api
