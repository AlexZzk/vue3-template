import { createI18n } from 'vue-i18n'

const messages = {
  'zh-CN': {
    common: {
      confirm: '确认',
      cancel: '取消',
      logout: '退出登录',
      language: '语言',
      theme: '主题',
      layout: '布局',
    },
    menu: {
      dashboard: '仪表盘',
      profile: '个人中心',
      system: {
        title: '系统管理',
        users: '用户管理',
        roles: '角色管理',
        permissions: '权限管理',
      },
    },
  },
  'en-US': {
    common: {},
    menu: {},
  },
}

export default createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
})
