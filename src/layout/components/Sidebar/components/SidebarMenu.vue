<!-- 左侧边菜单：包括左侧布局(left)、顶部布局(all)、混合布局(left) -->
<template>
    <el-menu
        ref="menuRef"
        :default-active="currentRoute.path"
        :collapse="!settingsStore.sidebar.opened"
        :background-color="variables['menu-background']"
        :text-color="variables['menu-text']"
        :active-text-color="variables['menu-active-text']"
        :unique-opened="false"
        :collapse-transition="true"
        :mode="mode"
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
import {MenuInstance} from 'element-plus';
import {useSettingsStore} from '@/stores';
import variables from '@/styles/variables.module.scss';
import {LayoutEnum} from '@/enums/LayoutEnum';

const settingsStore = useSettingsStore();
const currentRoute = useRoute();
const menuRef = useTemplateRef<MenuInstance>('menuRef');
const horizontal: ElMenuMode = 'horizontal';
const vertical: ElMenuMode = 'vertical';
// 菜单展示模式
const mode = computed(() => settingsStore.layout === LayoutEnum.TOP ? horizontal : vertical);
</script>
