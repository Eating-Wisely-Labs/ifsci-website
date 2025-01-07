import userApi, { IAnalysisRecord } from '@/apis/user.api'
import { proxy, snapshot } from 'valtio'

export interface IProfileStore {
  records: IAnalysisRecord[]
  page: number | null
}

export const profileStore = proxy<IProfileStore>({
  records: [],
  page: null
})

export function useProfileStore() {
  return snapshot(profileStore)
}

async function getAnalysisRecords(address: string, page: number) {
  const res = await userApi.getAnalysisRecords({
    user_id: address,
    page_no: page,
    page_size: 12
  })
  profileStore.records = res.data.list
  profileStore.page = res.data.page_no
}

export const profileStoreActions = {
  getAnalysisRecords
}
