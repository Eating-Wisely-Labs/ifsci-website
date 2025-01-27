import { AxiosInstance } from 'axios'
import request, { IPaginationParams, IResponse } from './request'

export type TCheckInType = 'sixteen_and_eight' | 'eight_and_sixteen'

export interface IUserInfo {
  user_id: string
  twitter_name: string
  score: number
  token: number
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

export interface IRedeemedItem {
  id: number
  create_time: number
  status: number
  hash: string
  redeemed_points: number
  earned_tokens: number
  finish_time: null | number
}

export interface IRewardListResponse {
  count: number
  page_no: number
  page_size: number
  list: IRewardItem[]
}

export interface IRedeemedListResponse<T> {
  count: number
  page_no: number
  page_size: number
  list: T[]
}

export interface IAccountScoreItem {
  exchange_id: number
  name: string
  start_time: null | number
  end_time: number
  claim_status: number
  score: number
  release_time: number
}

export interface IExchangeScoreParam {
  exchange_id: number
  user_id: string
  hash: string
  score: number
  token: number
  claim_status: number
}

export type IExchangeScoreResponse = Pick<IExchangeScoreParam, 'claim_status'> & { exchange_record_id: number }

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

  async getRedeemedList(params: IPaginationParams & { user_id: string; status: number }) {
    const res = await this.request.post<IResponse<IRedeemedListResponse<IRedeemedItem>>>(
      '/web/account/redeem/page',
      params
    )
    return res.data
  }

  async getAccoutScore(params: IPaginationParams & { user_id: string }) {
    const res = await this.request.post<IResponse<IRedeemedListResponse<IAccountScoreItem>>>(
      '/web/account/score/page',
      params
    )
    return res.data
  }

  async exchangeScore(param: IExchangeScoreParam) {
    const res = await this.request.post<IResponse<IExchangeScoreResponse>>('/web/account/score/exchange', param)
    return res.data
  }
}

export default new AccountApi(request)
