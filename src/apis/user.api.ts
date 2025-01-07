import { AxiosInstance } from 'axios'
import request, { IPaginationParams, IResponse } from './request'

export interface IAnalysisRecord {
  uid: string
  create_time: number
  text: string
}

export interface IAnalysisRecordResponse {
  count: number
  page_no: number
  page_size: number
  list: IAnalysisRecord[]
}

class UserApi {
  constructor(private request: AxiosInstance) {}

  async getAnalysisRecords(params: IPaginationParams & { user_id: string }) {
    const res = await this.request.post<IResponse<IAnalysisRecordResponse>>('/ffs/post/page', params)
    return res.data
  }
}

export default new UserApi(request)
