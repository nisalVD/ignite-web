import api from './init'

export function channgePassword(oldPassword, newPassword) {
  return api.patch('/auth/update', {oldPassword, newPassword})
    .then(res => res.data)
}
