import accountApi from '@/apis/account.api'
import { proxy, useSnapshot } from 'valtio'

export interface IUserStore {
  twitter_user_name: string | null
  score: number
}

export const userStore = proxy<IUserStore>({
  twitter_user_name: null,
  score: 0
})

export function useUserStore() {
  return useSnapshot(userStore)
}

async function getTwitterUserInfo(address: string) {
  const { data } = await accountApi.getUserInfo(address)
  userStore.twitter_user_name = data.twitter_name
  userStore.score = data.score
}

async function clear() {
  userStore.twitter_user_name = ''
}

export const userStoreActions = {
  getTwitterUserInfo,
  clear
}
