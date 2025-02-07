import axios, { AxiosInstance } from 'axios'
import request, { IResponse } from './request'

export interface OAuthClientInfo {
  client_id: string
  avatar_url: string
  name: string
}

class OAuthApi {
  constructor(private request: AxiosInstance) {}

  async getClientInfo(appId: string) {
    const res = await this.request.get<IResponse<OAuthClientInfo>>('/consumer/info', { params: { client_id: appId } })
    return res.data
  }

  async userAuthorize(params: { response_type: 'code'; client_id: string; redirect_uri: string; scope: string }) {
    const res = await this.request.get<IResponse<{ authorization_code: string }>>('/oauth/authorize', { params })
    return res.data
  }

  async getAccessToken(params: {
    client_secret: string
    client_id: string
    redirect_uri: string
    grant_type: 'authorization_code'
    code: string
  }) {
    const res = await this.request.post<IResponse<{ access_token: string }>>('/oauth/token', params)
    return res.data
  }

  async getUserInfo(params: { token: string }) {
    const res = await axios.get<{ data: { account_id: string } }>('/api/oauth/user', {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
    return res.data
  }
}

export default new OAuthApi(request)
