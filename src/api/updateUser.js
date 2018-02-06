import api from './init'

export function changePassword(oldPassword, newPassword) {
  return api.patch('/auth/update', {oldPassword, newPassword})
    .then(res => res.data)
}
