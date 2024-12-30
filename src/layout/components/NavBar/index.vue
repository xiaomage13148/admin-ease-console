<template>
    <div class="navbar">
        <div class="navbar__left">
            <!-- 展开/收缩菜单  -->
            <Hamburger :is-active="isSidebarOpened" @toggle-click="toggleSideBar"/>
            <!-- 面包屑 -->
            <Breadcrumb/>
        </div>
        <!-- 导航栏右侧 -->
        <NavbarRight/>
    </div>
</template>

<script setup lang="ts">
import {useAppStore, useSettingsStore} from '@/stores';

const appStore = useAppStore();
const settingsStore = useSettingsStore();

// 侧边栏是否打开
const isSidebarOpened = computed(() => settingsStore.sidebar.opened);

// 展开/收缩菜单
function toggleSideBar() {
    settingsStore.toggleSidebar();
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    height: $navbar-height;
    background: var(--el-bg-color);

    &__left {
        display: flex;
        align-items: center;
    }
}
</style>
