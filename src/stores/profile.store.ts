import userApi, { IAnalysisRecord } from '@/apis/user.api'
import { proxy, snapshot } from 'valtio'

export interface IProfileStore {
  records: IAnalysisRecord[]
  page: number | null
  total: number
  pageSize: number
}

export const profileStore = proxy<IProfileStore>({
  records: [],
  page: null,
  total: 0,
  pageSize: 12
})

export function useProfileStore() {
  return snapshot(profileStore)
}

async function getAnalysisRecords(address: string, page: number) {
  const res = await userApi.getAnalysisRecords({
    user_id: address,
    page_no: page,
    page_size: profileStore.pageSize
  })
  profileStore.records = res.data.list
  profileStore.page = res.data.page_no
  profileStore.total = res.data.count
  profileStore.pageSize = res.data.page_size
}

export const profileStoreActions = {
  getAnalysisRecords
}
