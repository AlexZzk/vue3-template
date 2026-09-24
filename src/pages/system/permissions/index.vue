<template>
  <el-card shadow="never">
    <template #header>权限树</template>
    <el-tree
      :data="[
        { label: 'Dashboard', children: [{ label: 'dashboard:view' }] },
        { label: '个人中心', children: [{ label: 'profile:view' }] },
        {
          label: '系统管理',
          children: [
            {
              label: '用户管理',
              children: [
                { label: 'system:user:view' },
                { label: 'system:user:create' },
                { label: 'system:user:update' },
                { label: 'system:user:delete' },
              ],
            },
            { label: '角色管理', children: [{ label: 'system:role:view' }] },
            { label: '权限管理', children: [{ label: 'system:permission:view' }] },
          ],
        },
      ]"
      default-expand-all
    />
  </el-card>
</template>
