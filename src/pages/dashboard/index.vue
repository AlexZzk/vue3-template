<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const stats = computed(() => [
  { label: '用户数量', value: '1,286', change: '+12.6%' },
  { label: '今日访问', value: '8,421', change: '+8.4%' },
  { label: '运行服务', value: '18', change: '100%' },
  { label: '系统状态', value: '正常', change: '稳定' },
])
</script>

<template>
  <div class="page">
    <div class="hero">
      <div>
        <div class="eyebrow">DASHBOARD</div>
        <h1>下午好，{{ auth.user?.displayName }}</h1>
        <p>这里是标准模板的预制 Dashboard，可以直接替换为你的业务内容。</p>
      </div>
      <el-tag round effect="light">Apple Glass Theme</el-tag>
    </div>

    <div class="stats">
      <el-card v-for="item in stats" :key="item.label" shadow="never">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="change">{{ item.change }}</div>
      </el-card>
    </div>

    <div class="grid">
      <el-card shadow="never" class="large">
        <template #header><span>项目活动</span></template>
        <div class="activity">
          <div v-for="n in 5" :key="n" class="activity-item">
            <span class="dot" />
            <div>
              <strong>系统事件 {{ n }}</strong>
              <div class="muted">标准模板示例数据</div>
            </div>
            <time>刚刚</time>
          </div>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header><span>架构特性</span></template>
        <ul class="features">
          <li>Vue 3 + TypeScript</li>
          <li>RBAC 权限体系</li>
          <li>可插拔主题</li>
          <li>可切换布局</li>
          <li>标准 Session</li>
          <li>第三方登录预留</li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.hero {
  padding: 8px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.eyebrow { color: var(--app-primary); font-size: 12px; font-weight: 700; letter-spacing: .12em; }
h1 { margin: 6px 0; font-size: 30px; }
p, .muted { color: var(--app-text-secondary); }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.label { color: var(--app-text-secondary); font-size: 13px; }
.value { font-size: 30px; font-weight: 700; margin: 10px 0 4px; }
.change { color: var(--app-primary); font-size: 12px; }
.grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
.activity-item { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--app-border); }
.activity-item:last-child { border-bottom: 0; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--app-primary); }
.activity-item time { margin-left: auto; color: var(--app-text-tertiary); font-size: 12px; }
.features { margin: 0; padding-left: 20px; line-height: 2.2; color: var(--app-text-secondary); }
@media (max-width: 900px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .grid { grid-template-columns: 1fr; }
}
</style>
