<template>
  <div class="top-layout">
    <header class="top-header">Vue Standard</header>
    <main><RouterView /></main>
  </div>
</template>

<style scoped>
.top-layout { min-height: 100vh; background: var(--app-bg); }
.top-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  font-weight: 700;
  background: var(--app-surface);
  backdrop-filter: var(--app-glass-filter, blur(var(--app-glass-blur)));
  border-bottom: 1px solid var(--app-border);
}
main { padding: 24px; }
</style>
