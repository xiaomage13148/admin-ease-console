<!-- 左侧边菜单：包括左侧布局(left)、顶部布局(all)、混合布局(left) -->
<template>
  <el-menu
    ref="menuRef"
    :unique-opened="true"
    :collapse-transition="true"
  >
<!--    <SidebarMenuItem-->
<!--      v-for="route in []"-->
<!--      :key="route.path"-->
<!--      :item="route"-->
<!--      :base-path="resolvePath(route.path)"-->
<!--    />-->
  </el-menu>
</template>

<script lang="ts" setup>
</script>
