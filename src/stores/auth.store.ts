import { proxy, useSnapshot } from 'valtio'
import { userStoreActions } from './user.store'

export interface IAuthStore {
  token: string
}

export const authStore = proxy<IAuthStore>({
  token: localStorage.getItem('token') || ''
})

export function useAuthStore() {
  return useSnapshot(authStore)
}

async function logout() {
  userStoreActions.clear()
  localStorage.removeItem('token')
  authStore.token = ''
}

async function login(token: string) {
  localStorage.setItem('token', token)
  authStore.token = token
}

export const authStoreActions = {
  logout,
  login
}
