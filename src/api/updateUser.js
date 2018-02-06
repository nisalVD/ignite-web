import api from './init'

export function changePassword(oldPassword, newPassword) {
  return api.patch('/user/password/update', {oldPassword, newPassword})
    .then(res => res.data)
}

export default api