import accountApi from '@/apis/account.api'
import { proxy, useSnapshot } from 'valtio'
import { IAccountScoreItem, IExchangeScoreParam } from '@/apis/account.api'

export interface IUserStore {
  twitter_user_name: string | null
  score: number
  sol_token: number
  airdropList: IAccountScoreItem[]
  pageSize: number
  total: number
}

export const userStore = proxy<IUserStore>({
  twitter_user_name: null,
  score: 0,
  airdropList: [],
  sol_token: 0,
  pageSize: 12,
  total: 0
})

export function useUserStore() {
  return useSnapshot(userStore)
}

async function getUserInfo(address: string) {
  const { data } = await accountApi.getUserInfo(address)
  userStore.twitter_user_name = data?.twitter_name
  userStore.score = data?.score
  userStore.sol_token = data?.token
  return data
}

async function clear() {
  userStore.twitter_user_name = ''
}

async function getAccountScore(address: string, page: number) {
  const { data } = await accountApi.getAccoutScore({
    user_id: address,
    page_no: page,
    page_size: userStore.pageSize
  })
  userStore.airdropList = data.list
  userStore.pageSize = data.page_size
  userStore.total = data.count
}

async function exchangeScore(item: IExchangeScoreParam) {
  const { data } = await accountApi.exchangeScore(item)
  console.log(data)
  return data
}

export const userStoreActions = {
  getUserInfo,
  clear,
  getAccountScore,
  exchangeScore
}
