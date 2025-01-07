import { AxiosInstance } from 'axios'
import request, { IResponse } from './request'

type TVerifyStatus = 0 | 1 | 2

class twitterApi {
  constructor(private request: AxiosInstance) {}

  async getTwitterVerifyCode(address: string) {
    const res = await this.request.post<IResponse<{ code: string; link: string }>>('/ffs/twitter/code', {
      user_id: address
    })
    return res.data
  }

  async getTwitterUserInfo(address: string) {
    const res = await this.request.post<IResponse<{ twitter_user_name: string | null }>>('/ffs/twitter/user', {
      user_id: address
    })
    return res.data
  }

  async verifyTwitter(address: string, twitterShareLink: string) {
    const res = await this.request.post<{
      data: {
        status: TVerifyStatus
        twitter_user_name: string
        message: string
      }
    }>('/ffs/twitter/verify', { user_id: address, link: twitterShareLink })
    return res.data
  }

  async unbindTwitter(address: string) {
    const res = await this.request.post('/ffs/twitter/unbind', { user_id: address })
    return res.data
  }
}

export default new twitterApi(request)
