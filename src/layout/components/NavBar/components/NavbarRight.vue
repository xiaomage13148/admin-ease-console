<template>
    <div class="navbar__right">
        <!-- 非手机设备（窄屏）才显示 -->
        <template v-if="!isMobile">
            <!-- 搜索 -->
            <MenuSearch/>

            <!-- 全屏 -->
            <Fullscreen/>

            <!-- 布局大小 -->
            <SizeSelect/>

            <!-- 语言选择 -->
            <LangSelect/>

            <!-- 消息通知 -->
            <Notification/>
        </template>

        <!-- 用户头像（个人中心、注销登录等） -->
        <UserProfile/>

        <!-- 设置面板 -->
        <div v-if="showSettings" @click="settingsStore.settingsVisible = true">
            <SvgIcon icon-class="setting"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {DeviceEnum} from '@/enums/DeviceEnum';
import {useSettingsStore} from '@/stores';

const settingsStore = useSettingsStore();

const showSettings = computed(() => settingsStore.showSettings);
const isMobile = computed(() => settingsStore.device === DeviceEnum.MOBILE);
</script>

<style lang="scss" scoped>
.navbar__right {
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
        display: inline-block;
        min-width: 40px;
        height: $navbar-height;
        line-height: $navbar-height;
        color: var(--el-text-color);
        text-align: center;
        cursor: pointer;

        &:hover {
            background: rgb(0 0 0 / 10%);
        }
    }
}

:deep(.el-divider--horizontal) {
    margin: 10px 0;
}

.dark .navbar__right > *:hover {
    background: rgb(255 255 255 / 20%);
}

.layout-top .navbar__right > *,
.layout-mix .navbar__right > * {
    color: #fff;
}
</style>
