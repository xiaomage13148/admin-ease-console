<template>
    <div :class="{ 'has-logo': sidebarLogo }">
        <!-- TODO layout mix -->
        <div class="flex w-full" v-if="layout === LayoutEnum.MIX">
            <SidebarLogo v-if="sidebarLogo" :collapse="isCollapse"/>
            <SidebarMixTopMenu class="flex-1"/>
            <NavbarAction/>
        </div>
        <!-- layout left || layout top -->
        <template v-else>
            <SidebarLogo v-if="sidebarLogo" :collapse="isCollapse"/>
            <el-scrollbar>
                <SidebarMenu :menu-list="menuList" base-path=""/>
            </el-scrollbar>
            <NavbarAction v-if="layout === LayoutEnum.TOP"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import {useSettingsStore, usePermissionStore} from '@/stores';
import {LayoutEnum} from '@/enums/LayoutEnum';

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const sidebarLogo = computed(() => settingsStore.sidebarLogo);
const layout = computed(() => settingsStore.layout);
const menuList = computed(() => permissionStore.routes);
const isCollapse = computed(() => !settingsStore.sidebar.opened);
</script>

<style lang="scss" scoped>
.has-logo {
    .el-scrollbar {
        height: calc(100vh - $navbar-height);
    }
}
</style>
