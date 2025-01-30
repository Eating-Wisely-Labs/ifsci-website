import accountApi, { IRedeemedItem } from '@/apis/account.api'
import { proxy, snapshot } from 'valtio'

export interface IRedeemStore {
  records: readonly IRedeemedItem[]
  page: number | null
  total: number
  pageSize: number
}

export const redeemStore = proxy<IRedeemStore>({
  records: [],
  page: null,
  total: 0,
  pageSize: 24
})

export function useredeemStore() {
  return snapshot(redeemStore)
}

async function getRedeemedList(address: string, page: number) {
  const res = await accountApi.getRedeemedList({
    user_id: address,
    page_no: page,
    page_size: redeemStore.pageSize,
    status: 3
  })
  redeemStore.records = res.data.list
  redeemStore.page = res.data.page_no
  redeemStore.total = res.data.count
  redeemStore.pageSize = res.data.page_size
  return res.data
}

export const redeemStoreActions = {
  getRedeemedList
}
