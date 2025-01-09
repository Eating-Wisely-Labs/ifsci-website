import { AxiosInstance } from 'axios'
import request, { IResponse } from './request'

type TVerifyStatus = 0 | 1 | 2

class twitterApi {
  constructor(private request: AxiosInstance) {}

  async getTwitterVerifyCode(address: string) {
    const res = await this.request.post<IResponse<{ code: string; link: string }>>('/web/twitter/code', {
      user_id: address
    })
    return res.data
  }

  async getTwitterUserInfo(address: string) {
    const res = await this.request.post<IResponse<{ twitter_user_name: string | null }>>('/web/twitter/user', {
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
    }>('/web/twitter/verify', { user_id: address, link: twitterShareLink })
    return res.data
  }

  async unbindTwitter(address: string) {
    const res = await this.request.post('/web/twitter/unbind', { user_id: address })
    return res.data
  }
}

export default new twitterApi(request)
