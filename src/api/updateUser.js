import api from './init'
import { getUserData } from './adminData';

export function changePassword(oldPassword, newPassword) {
  return api.patch('/user/password/update', {oldPassword, newPassword})
    .then(res => res.data)
}

export function updateDetails(userDetails) {
  return api.patch('/user/details/update', {userDetails})
    .then(res => res.data)
}

export default api