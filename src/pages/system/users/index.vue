<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="header">
        <span>用户管理</span>
        <el-button v-if="auth.hasPermission('system:user:create')" type="primary">新增用户</el-button>
      </div>
    </template>
    <el-table :data="[
      { id: 1, username: 'admin', name: '系统管理员', role: 'admin', status: '正常' },
      { id: 2, username: 'demo', name: '演示用户', role: 'user', status: '正常' },
    ]">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template #default>
          <el-button text type="primary" v-if="auth.hasPermission('system:user:update')">编辑</el-button>
          <el-button text type="danger" v-if="auth.hasPermission('system:user:delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>
