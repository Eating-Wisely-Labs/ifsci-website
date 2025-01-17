import { AxiosInstance } from 'axios'
import request, { IPaginationParams, IResponse } from './request'

export interface FileItem {
  name: string
  url: string
  preview?: string
}

export interface IFoodItem {
  name: string
  unit: string
  value: string
}

export interface IPostRecord {
  comment_uid: string
  uid: string
  create_time: number
  text: string
  image: string
  food_items: readonly IFoodItem[]
  annotation_data: IAnnotationData | null
  food_post_score: number
  checkin: {
    checkin_time: string
    status: number
  }
}

export interface IPostListResponse {
  count: number
  page_no: number
  page_size: number
  list: IPostRecord[]
}

export interface ISubmitAnnotationParams {
  user_id: string
  comment_uid: string
  content: string
  images: readonly FileItem[]
}

export interface IAnnotationResult {
  reason: string
  score: number
  level: 1 | 2 | 3 | 4
}

export interface IAnnotationData {
  content: string
  images: readonly FileItem[]
  category: string
  brand: string
  region: string
  create_time?: number
  id?: number
}

export interface IAnnotationRecord {
  comment_uid: string
  image: string
  text: string
  food_items: readonly IFoodItem[]
  create_time: number
  annotation_data: IAnnotationData & IAnnotationResult
}

export interface IAnnotationListResponse {
  count: number
  page_no: number
  page_size: number
  list: IAnnotationRecord[]
}

class PostApi {
  constructor(private request: AxiosInstance) {}

  async getPostList(params: IPaginationParams & { user_id: string; annotation_user_id?: string }) {
    const res = await this.request.post<IResponse<IPostListResponse>>('/web/post/page', params)
    return res.data
  }

  async submitAnnotation(params: ISubmitAnnotationParams) {
    const res = await this.request.post<IResponse<IAnnotationResult>>('/web/annotation/submit', params)
    return res.data
  }

  async getPostDetail(id: string) {
    const res = await this.request.post<IResponse<IPostRecord>>('/web/post/get', { code: id })
    return res.data
  }

  async getAnnotationResult(params: { user_id: string; code: string }) {
    const res = await this.request.post<IResponse<IAnnotationResult>>('/web/annotation/result', params)
    return res.data
  }

  async getAnnotationList(params: IPaginationParams & { user_id: string }) {
    const res = await this.request.post<IResponse<IAnnotationListResponse>>('/web/annotation/page', params)
    return res.data
  }

  async checkAnnotation(params: { user_id: string; code: string }) {
    const res = await this.request.post<IResponse<{ can_annotation: 1 | 0 }>>('/web/annotation/check', params)
    return res.data
  }
}

export default new PostApi(request)
