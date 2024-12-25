<template>
    <div :class="{ 'has-logo': sidebarLogo }">
        <!-- layout mix-->
        <div class="flex w-full" v-if="layout === LayoutEnum.MIX">
            <SidebarLogo v-if="sidebarLogo" :collapse="!settingsStore.sidebar.opened"/>
            <!--    TODO 侧边菜单栏 mix 模式完善 2024/12/24        -->

            <!--            <SidebarMixTopMenu class="flex-1"/>-->
            <NavbarAction/>
        </div>
        <!-- layout left || layout top -->
        <template v-else>
            <SidebarLogo v-if="sidebarLogo" :collapse="!settingsStore.sidebar.opened"/>
            <el-scrollbar>
                <SidebarMenu :menu-list="menuList" base-path=""/>
            </el-scrollbar>
            <NavbarAction v-if="layout === LayoutEnum.TOP"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import {useSettingsStore} from '@/stores';
import {LayoutEnum} from '@/enums/LayoutEnum';
import {usePermissionStore} from '@/stores/modules/permission';

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const sidebarLogo = computed(() => settingsStore.sidebarLogo);
const layout = computed(() => settingsStore.layout);
const menuList = computed(() => permissionStore.routes);
</script>

<style lang="scss" scoped>
.has-logo {
    .el-scrollbar {
        height: calc(100vh - $navbar-height);
    }
}
</style>
