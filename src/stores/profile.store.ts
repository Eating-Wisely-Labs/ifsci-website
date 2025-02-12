import postApi, { IPostRecord } from '@/apis/post.api'
import { proxy, snapshot } from 'valtio'

export interface IProfileStore {
  records: readonly IPostRecord[]
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

async function getAnalysisRecords(address: string, page: number, annotation_user_id?: string) {
  const res = await postApi.getPostList({
    user_id: address,
    page_no: page,
    page_size: profileStore.pageSize,
    annotation_user_id
  })
  profileStore.records = res.data.list
  profileStore.page = res.data.page_no
  profileStore.total = res.data.count
  profileStore.pageSize = res.data.page_size
  return res.data
}

export const profileStoreActions = {
  getAnalysisRecords
}
