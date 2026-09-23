export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE || 'Vue3 Standard Template',
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  defaultTheme: 'apple-glass' as const,
  defaultLayout: 'sidebar' as const,
}
