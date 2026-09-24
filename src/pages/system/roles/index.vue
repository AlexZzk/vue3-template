<template>
  <el-card shadow="never">
    <template #header>角色管理</template>
    <el-table :data="[
      { name: 'admin', description: '系统管理员', permissions: '全部权限' },
      { name: 'user', description: '普通用户', permissions: 'Dashboard、个人中心' },
    ]">
      <el-table-column prop="name" label="角色" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="permissions" label="权限" />
    </el-table>
  </el-card>
</template>
