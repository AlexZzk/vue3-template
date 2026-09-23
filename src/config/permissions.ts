export const permissions = {
  dashboardView: 'dashboard:view',
  profileView: 'profile:view',

  systemView: 'system:view',
  userView: 'system:user:view',
  userCreate: 'system:user:create',
  userUpdate: 'system:user:update',
  userDelete: 'system:user:delete',

  roleView: 'system:role:view',
  permissionView: 'system:permission:view',
} as const
