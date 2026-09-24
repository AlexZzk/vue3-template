import axios from 'axios'
import { appConfig } from '@/config/app'

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseURL,
  timeout: 15000,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 真实项目可在这里通知 auth store/session manager
    }
    return Promise.reject(error)
  },
)
