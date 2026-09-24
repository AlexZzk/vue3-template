<template>
  <div class="error-page">
    <div class="code">404</div>
    <h1>页面不存在</h1>
    <p>你访问的页面可能已经移动或删除。</p>
    <el-button type="primary" @click="$router.replace('/dashboard')">返回首页</el-button>
  </div>
</template>

<style scoped>
.error-page { min-height: 100vh; display: grid; place-content: center; text-align: center; }
.code { font-size: 96px; font-weight: 800; color: var(--app-primary); }
p { color: var(--app-text-secondary); }
</style>
