<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: 'admin123',
})

async function submit() {
  loading.value = true
  try {
    await auth.login(form)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    await router.replace(redirect)
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <el-card class="login-card" shadow="never">
      <div class="logo">V</div>
      <h1>欢迎回来</h1>
      <p class="subtitle">Vue 3 Standard Template</p>

      <el-form @submit.prevent="submit">
        <el-form-item>
          <el-input v-model="form.username" size="large" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            size="large"
            type="password"
            show-password
            placeholder="密码"
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-button
          type="primary"
          size="large"
          :loading="loading"
          style="width: 100%"
          @click="submit"
        >
          登录
        </el-button>
      </el-form>

      <div class="hint">
        <div>管理员：admin / admin123</div>
        <div>普通用户：demo / demo123</div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.18), transparent 35%),
    radial-gradient(circle at 80% 80%, rgba(175, 82, 222, 0.16), transparent 35%),
    var(--app-bg);
}
.glow {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.45;
}
.glow-a { background: #64b5ff; top: -120px; left: -80px; }
.glow-b { background: #d18cff; bottom: -140px; right: -80px; }
.login-card {
  width: min(420px, calc(100vw - 32px));
  padding: 24px;
  border: 1px solid var(--app-border);
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(30px);
  border-radius: 30px;
  position: relative;
}
.logo {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--app-primary);
  color: white;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
h1 { margin: 0 0 6px; font-size: 30px; }
.subtitle { color: var(--app-text-secondary); margin: 0 0 28px; }
.hint {
  margin-top: 20px;
  color: var(--app-text-tertiary);
  font-size: 12px;
  line-height: 1.8;
  text-align: center;
}
</style>
