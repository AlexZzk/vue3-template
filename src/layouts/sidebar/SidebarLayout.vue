<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { appRoutes } from '@/config/routes'
import type { AppRoute } from '@/types/route'

const auth = useAuthStore()
const app = useAppStore()
const route = useRoute()
const router = useRouter()

const visibleRoutes = computed(() => {
  const filter = (routes: AppRoute[]): AppRoute[] =>
    routes
      .filter((item) => {
        if (item.meta.hidden) return false
        if (item.meta.permission && !auth.hasPermission(item.meta.permission)) return false
        return true
      })
      .map((item) => ({ ...item, children: item.children ? filter(item.children) : undefined }))
      .filter((item) => !item.children || item.children.length > 0 || item.component)

  return filter(appRoutes)
})

function iconComponent(name?: string) {
  return name ? (Icons as Record<string, unknown>)[name] : undefined
}

async function logout() {
  await ElMessageBox.confirm('确定退出当前账号吗？', '退出登录', {
    type: 'warning',
  })
  await auth.logout()
  await router.replace('/login')
}
</script>

<template>
  <div class="shell">
    <aside class="sidebar" :class="{ collapsed: app.sidebarCollapsed }">
      <div class="brand">
        <div class="brand-mark">V</div>
        <span v-if="!app.sidebarCollapsed">Vue Standard</span>
      </div>

      <nav class="menu">
        <template v-for="item in visibleRoutes" :key="item.name">
          <RouterLink
            v-if="!item.children"
            :to="item.path"
            class="menu-item"
            :class="{ active: route.path === item.path }"
          >
            <component :is="iconComponent(item.meta.icon)" v-if="item.meta.icon" class="menu-icon" />
            <span v-if="!app.sidebarCollapsed">{{ $t(item.meta.title) }}</span>
          </RouterLink>

          <div v-else class="menu-group">
            <div class="menu-group-title">
              <component :is="iconComponent(item.meta.icon)" v-if="item.meta.icon" class="menu-icon" />
              <span v-if="!app.sidebarCollapsed">{{ $t(item.meta.title) }}</span>
            </div>
            <RouterLink
              v-for="child in item.children"
              :key="child.name"
              :to="`${item.path}/${child.path}`.replace(/\/+/g, '/')"
              class="menu-item child"
              :class="{ active: route.path.endsWith(`/${child.path}`) }"
            >
              <component :is="iconComponent(child.meta.icon)" v-if="child.meta.icon" class="menu-icon" />
              <span v-if="!app.sidebarCollapsed">{{ $t(child.meta.title) }}</span>
            </RouterLink>
          </div>
        </template>
      </nav>

      <div class="sidebar-footer">
        <el-button text @click="app.toggleSidebar">
          {{ app.sidebarCollapsed ? '→' : '←' }}
        </el-button>
      </div>
    </aside>

    <main class="main">
      <header class="header">
        <div class="breadcrumb">{{ $t(String(route.meta.title || '')) }}</div>
        <div class="header-actions">
          <el-dropdown>
            <button class="user-button">
              <el-avatar :size="34">{{ auth.user?.displayName?.slice(0, 1) }}</el-avatar>
              <span>{{ auth.user?.displayName }}</span>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <section class="content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style scoped>
.shell {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  background: var(--app-bg-gradient, var(--app-bg));
}
.sidebar {
  /* 侧边栏固定宽度，作为 flex 项不参与拉伸；sticky 保证滚动时始终可见 */
  position: sticky;
  top: 16px;
  flex: 0 0 var(--app-sidebar-width);
  height: calc(100vh - 32px);
  /* 左右各留 16px，与内容区形成对称间距 */
  margin: 16px 16px 16px 16px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  background: var(--app-surface);
  backdrop-filter: var(--app-glass-filter, blur(var(--app-glass-blur)));
  box-shadow: var(--app-shadow-md);
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  transition: flex-basis 0.2s ease;
  z-index: 10;
  overflow: hidden;
}
.sidebar::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--app-glass-highlight, rgba(255,255,255,0.55)) 20%, var(--app-glass-highlight, rgba(255,255,255,0.55)) 80%, transparent);
  pointer-events: none;
}
.sidebar.collapsed { flex-basis: 78px; }
.brand {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  font-weight: 700;
}
.brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: white;
  background: var(--app-primary);
}
.menu {
  flex: 1;
  margin-top: 20px;
  /* 菜单过长时仅侧边栏内部纵向滚动，不撑破布局 */
  overflow-y: auto;
}
.menu-item,
.menu-group-title {
  min-height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  color: var(--app-text-secondary);
  margin: 3px 0;
}
.menu-item:hover,
.menu-item.active {
  color: var(--app-text);
  background: rgba(0, 122, 255, 0.09);
}
.menu-icon { width: 18px; }
.menu-group-title { font-size: 13px; font-weight: 600; }
.child { padding-left: 24px; }
.sidebar-footer { text-align: center; }
.main {
  /* 占满剩余宽度（100% - 侧边栏 - 间距），min-width:0 防止内容撑破容器 */
  flex: 1;
  min-width: 0;
  padding: 16px 16px 24px 0;
}
.header {
  height: var(--app-header-height);
  padding: 0 20px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
  background: var(--app-surface);
  backdrop-filter: var(--app-glass-filter, blur(var(--app-glass-blur)));
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.breadcrumb { font-weight: 600; }
.user-button {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.content { padding: 20px 0 0; }
</style>
