import { AxiosInstance } from 'axios'
import request, { IResponse } from './request'

export interface IUploadFileResponse {
  filename: string
  url: string
}

class CommonApi {
  constructor(private request: AxiosInstance) {}

  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await this.request.post<IResponse<IUploadFileResponse>>('/web/file/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return res.data
  }
}

export default new CommonApi(request)
