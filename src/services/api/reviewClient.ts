import axios from 'axios'
import { appConfig } from '@/config/app'

/**
 * 深度检视任务列表服务（服务 A）客户端
 * 接口契约后续确认，baseURL 通过 VITE_REVIEW_API_BASE_URL 配置
 */
export const reviewClient = axios.create({
  baseURL: appConfig.reviewApiBaseURL,
  timeout: 15000,
})
