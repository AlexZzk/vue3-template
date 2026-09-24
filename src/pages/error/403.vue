<template>
  <div class="error-page">
    <div class="code">403</div>
    <h1>没有访问权限</h1>
    <p>当前账号没有访问这个页面所需的权限。</p>
    <el-button type="primary" @click="$router.replace('/dashboard')">返回首页</el-button>
  </div>
</template>

<style scoped>
.error-page { min-height: 100vh; display: grid; place-content: center; text-align: center; }
.code { font-size: 96px; font-weight: 800; color: var(--app-primary); }
p { color: var(--app-text-secondary); }
</style>
