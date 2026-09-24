import axios from 'axios'
import { appConfig } from '@/config/app'

/**
 * 下载产物服务（服务 B，log-storage）客户端
 * 独立于主 API 服务，baseURL 通过 VITE_ARTIFACT_API_BASE_URL 配置
 */
export const artifactClient = axios.create({
  baseURL: appConfig.artifactApiBaseURL,
  timeout: 60000,
})
