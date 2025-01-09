import { AxiosInstance } from 'axios'
import request, { IResponse } from './request'

class twitterApi {
  constructor(private request: AxiosInstance) {}

  async getSignMessage(address: string) {
    const res = await this.request.post<IResponse<{ message: string }>>('/web/account/code', { user_id: address })
    return res.data
  }

  async login(props: { address: string; signature: string; message: string }) {
    const res = await this.request.post<IResponse<{ token: string }>>('/web/account/login', props)
    return res.data
  }
}

export default new twitterApi(request)
