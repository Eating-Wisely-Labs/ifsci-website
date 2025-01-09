import userApi, { IAnalysisRecord } from '@/apis/user.api'
import { proxy, snapshot } from 'valtio'

export interface IAnnotationStore {
  records: readonly IAnalysisRecord[]
  page: number | null
  total: number
  pageSize: number
}

export const annotationStore = proxy<IAnnotationStore>({
  records: [],
  page: null,
  total: 0,
  pageSize: 12
})

export function useAnnotationStore() {
  return snapshot(annotationStore)
}

async function getAnnotationRecords(address: string, page: number) {
  const res = await userApi.getAnnotationRecords({
    user_id: address,
    page_no: page,
    page_size: annotationStore.pageSize
  })
  annotationStore.records = res.data.list
  annotationStore.page = res.data.page_no
  annotationStore.total = res.data.count
  annotationStore.pageSize = res.data.page_size
}

export const annotationStoreActions = {
  getAnnotationRecords
}
