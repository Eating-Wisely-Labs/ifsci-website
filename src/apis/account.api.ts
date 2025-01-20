import { AxiosInstance } from 'axios'
import request, { IPaginationParams, IResponse } from './request'

export type TCheckInType = 'sixteen_and_eight' | 'eight_and_sixteen'

export interface IUserInfo {
  user_id: string
  twitter_name: string
  score: number
}

export interface ICheckInSettings {
  user_id: string
  checkin_type: TCheckInType
  start_time: string
  end_time: string
}

export interface IRewardItem {
  id: number
  reward_type_name: string
  score: number
  create_time: number
}

export interface IRewardListResponse {
  count: number
  page_no: number
  page_size: number
  list: IRewardItem[]
}

class AccountApi {
  constructor(private request: AxiosInstance) {}

  async getSignMessage(address: string) {
    const res = await this.request.post<IResponse<{ message: string }>>('/web/account/code', { user_id: address })
    return res.data
  }

  async login(props: { address: string; signature: string; message: string }) {
    const res = await this.request.post<IResponse<{ token: string }>>('/web/account/login', props)
    return res.data
  }

  async getUserInfo(address: string) {
    const res = await this.request.post<IResponse<IUserInfo>>('/web/account/info', {
      user_id: address
    })
    return res.data
  }

  async getUserCheckInSettings(address: string) {
    const res = await this.request.post<IResponse<ICheckInSettings>>('/web/checkin/plan/get', {
      user_id: address
    })
    return res.data
  }

  async updateUserCheckInSettings(params: ICheckInSettings) {
    const res = await this.request.post<IResponse<ICheckInSettings>>('/web/checkin/plan/save', params)
    return res.data
  }

  async getRewardList(params: IPaginationParams & { user_id: string }) {
    const res = await this.request.post<IResponse<IRewardListResponse>>('/web/account/reward/page', params)
    return res.data
  }
}

export default new AccountApi(request)
