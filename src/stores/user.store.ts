import twitterApi from '@/apis/twitter.api'
import { proxy, useSnapshot } from 'valtio'

export interface IUserStore {
  twitter_user_name: string | null
}

export const userStore = proxy<IUserStore>({
  twitter_user_name: null
})

export function useUserStore() {
  return useSnapshot(userStore)
}

async function getTwitterUserInfo(address: string) {
  const { data } = await twitterApi.getTwitterUserInfo(address)
  console.log(data)
  userStore.twitter_user_name = data.twitter_user_name
}

async function clear() {
  userStore.twitter_user_name = ''
}

export const userStoreActions = {
  getTwitterUserInfo,
  clear
}
