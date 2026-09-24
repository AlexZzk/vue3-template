<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <el-card shadow="never">
    <template #header>个人中心</template>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="用户 ID">{{ auth.user?.id }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ auth.user?.username }}</el-descriptions-item>
      <el-descriptions-item label="显示名称">{{ auth.user?.displayName }}</el-descriptions-item>
      <el-descriptions-item label="角色">{{ auth.roles.join(', ') }}</el-descriptions-item>
      <el-descriptions-item label="权限">{{ auth.permissions.join(', ') }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
