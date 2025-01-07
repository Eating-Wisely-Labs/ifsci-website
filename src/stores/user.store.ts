import twitterApi from '@/apis/twitter.api'
import { proxy, snapshot } from 'valtio'

export interface IUserStore {
  twitter_user_name: string | null
}

export const userStore = proxy<IUserStore>({
  twitter_user_name: null
})

export function useUserStore() {
  return snapshot(userStore)
}

async function getTwitterUserInfo(address: string) {
  const res = await twitterApi.getTwitterUserInfo(address)
  userStore.twitter_user_name = res.data.twitter_user_name
}

export const userStoreActions = {
  getTwitterUserInfo
}
