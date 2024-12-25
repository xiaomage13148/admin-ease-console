<!-- 左侧边菜单：包括左侧布局(left)、顶部布局(all)、混合布局(left) -->
<template>
    <el-menu
        ref="menuRef"
        :default-active="currentRoute.path"
        :collapse="isCollapse"
        :background-color="variables['menu-background']"
        :text-color="variables['menu-text']"
        :active-text-color="variables['menu-active-text']"
        :unique-opened="false"
        :collapse-transition="true"
        :mode="mode"
        @open="onMenuOpen"
        @close="onMenuClose"
    >
        <!-- 菜单项 -->
        <SidebarMenuItem
            v-for="route in menuList"
            :key="route.path"
            :item="route"
            :base-path="resolveFullPath(route.path)"
        />
    </el-menu>
</template>

<script lang="ts" setup>
import {MenuInstance} from 'element-plus';
import {useSettingsStore} from '@/stores';
import variables from '@/styles/variables.module.scss';
import {LayoutEnum} from '@/enums/LayoutEnum';
import {isExternal} from '@/utils/common';
import path from 'path-browserify';

const props = defineProps({
    menuList: {
        type: Array<any>,
        required: true,
        default: () => [],
    },
    basePath: {
        type: String,
        required: true,
        example: '/system',
    },
});

const settingsStore = useSettingsStore();
const currentRoute = useRoute();
const menuRef = useTemplateRef<MenuInstance>('menuRef');
// 已展开的菜单项索引
const expandedMenuIndexes = ref<string[]>([]);
const horizontal: ElMenuMode = 'horizontal';
const vertical: ElMenuMode = 'vertical';
// 菜单展示模式
const mode = computed(() => settingsStore.layout === LayoutEnum.TOP ? horizontal : vertical);
const isCollapse = computed(() => !settingsStore.sidebar.opened);
// 菜单展开的回调
const onMenuOpen = (index: string) => {
    expandedMenuIndexes.value.push(index);
};
// 菜单关闭的回调
const onMenuClose = (index: string) => {
    expandedMenuIndexes.value = expandedMenuIndexes.value.filter(item => item !== index);
};

/**
 * 获取完整路径
 *
 * @param routePath 当前路由的相对路径  /user
 * @returns 完整的绝对路径 D://vue3-element-admin/system/user
 */
function resolveFullPath(routePath: string) {
    if (isExternal(routePath)) {
        return routePath;
    }
    if (isExternal(props.basePath)) {
        return props.basePath;
    }

    // 解析路径，生成完整的绝对路径
    return path.resolve(props.basePath, routePath);
}

/**
 * 监听菜单模式变化：当菜单模式切换为水平模式时，关闭所有展开的菜单项，
 * 避免在水平模式下菜单项显示错位。
 *
 * @see https://gitee.com/youlaiorg/vue3-element-admin/issues/IAJ1DR
 */
watch(
    () => mode.value,
    () => {
        if (mode.value === horizontal) {
            expandedMenuIndexes.value.forEach((item) => menuRef.value!.close(item));
        }
    },
);
</script>
