import { AxiosInstance } from 'axios'
import request, { IPaginationParams, IResponse } from './request'

export interface IFoodItem {
  name: string
  unit: string
  value: string
}

export interface IAnalysisRecord {
  uid: string
  create_time: number
  text: string
  image: string
  food_items: readonly IFoodItem[]
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
    const res = await this.request.post<IResponse<IAnalysisRecordResponse>>('/web/post/page', params)
    return res.data
  }

  async submitAnnotation() {
    return { data: true }
  }

  async getAnalysisRecord(_id: string) {
    const item: IAnalysisRecord = {
      uid: '1234123',
      create_time: 0,
      text: '12341234123412',
      image: '23412341234123412',
      food_items: [
        {
          name: '123123',
          unit: '131',
          value: '123'
        }
      ] as readonly IFoodItem[]
    }

    return { data: item }
  }

  async getAnnotationRecords(params: IPaginationParams & { user_id: string }) {
    const res = await this.request.post<IResponse<IAnalysisRecordResponse>>('/web/annotation/page', params)
    return res.data
  }
}

export default new UserApi(request)
