<template>
  <div class="navbar-container">
    <!-- 导航栏面包屑 -->
    <div class="flex">
<!--      <hamburger-->
<!--        :is-active="appStore.sidebar.opened"-->
<!--        @toggle-click="toggleSideBar"-->
<!--      />-->
<!--      <breadcrumb />-->
        导航栏面包屑
    </div>
    <!-- 导航栏右侧 -->
    <NavbarAction />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.navbar-container {
  @apply flex-x-between;

  height: $navbar-height;
  background: var(--el-bg-color);
}
</style>
