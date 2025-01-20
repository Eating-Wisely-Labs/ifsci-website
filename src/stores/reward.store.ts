import accountApi, { IRewardItem } from '@/apis/account.api'
import { proxy, snapshot } from 'valtio'

export interface IRewardStore {
  records: readonly IRewardItem[]
  page: number | null
  total: number
  pageSize: number
}

export const rewardStore = proxy<IRewardStore>({
  records: [],
  page: null,
  total: 0,
  pageSize: 24
})

export function useRewardStore() {
  return snapshot(rewardStore)
}

async function getRewardList(address: string, page: number) {
  const res = await accountApi.getRewardList({
    user_id: address,
    page_no: page,
    page_size: rewardStore.pageSize
  })
  rewardStore.records = res.data.list
  rewardStore.page = res.data.page_no
  rewardStore.total = res.data.count
  rewardStore.pageSize = res.data.page_size
  return res.data
}

export const rewardStoreActions = {
  getRewardList
}
