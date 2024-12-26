<template>
    <div class="wh-full">
        <!-- 遮罩层 -->
        <div
            v-if="isMobile && isOpenSidebar"
            class="wh-full fixed-lt z-999 bg-black bg-opacity-30"
            @click="handleOutsideClick"
        ></div>

        <!-- 公用侧边栏 -->
        <Sidebar class="sidebar-container"/>

        <!-- layout mix -->
        <!--        <div v-if="layout === LayoutEnum.MIX" class="mix-container">
                    <div class="mix-container__left">
                        <SidebarMenu :menu-list="mixLeftMenus" :base-path="activeTopMenuPath"/>
                        <div class="sidebar-toggle">
                            <hamburger
                                :is-active="appStore.sidebar.opened"
                                @toggle-click="toggleSidebar"
                            />
                        </div>
                    </div>

                    <div :class="{ hasTagsView: showTagsView }" class="main-container">
                        <div :class="{ 'fixed-header': fixedHeader }">
                            <TagsView v-if="showTagsView"/>
                        </div>
                        <AppMain/>
                        <Settings v-if="defaultSettings.showSettings"/>
                        &lt;!&ndash; 返回顶部 &ndash;&gt;
                        <el-backtop target=".main-container">
                            <svg-icon icon-class="backtop" size="24px"/>
                        </el-backtop>
                    </div>
                </div>-->

        <!-- layout left or top -->
        <div class="main-container">
            <!--            <div>-->
            <!--                <NavBar/>-->
            <!--            </div>-->
            <AppMain/>
            <!-- 返回顶部 -->
            <el-backtop target=".main-container">
                <svg-icon icon-class="backtop" size="24px"/>
            </el-backtop>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useSettingsStore} from '@/stores';
import {DeviceEnum} from '@/enums/DeviceEnum';

const settingsStore = useSettingsStore();
const isMobile = computed(() => settingsStore.device === DeviceEnum.MOBILE);
const isOpenSidebar = computed(() => settingsStore.sidebar.opened);

/**
 * 遮罩层点击
 */
const handleOutsideClick = (): void => {
    settingsStore.closeSidebar();
};
</script>

<style lang="scss" scoped>
.sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: $sidebar-width;
    background-color: $menu-background;
    transition: width 0.28s;

    :deep(.el-menu) {
        border: none;
    }
}

.main-container {
    position: relative;
    height: 100%;
    margin-left: $sidebar-width;
    overflow-y: auto;
    transition: margin-left 0.28s;

    .fixed-header {
        position: sticky;
        top: 0;
        z-index: 9;
        transition: width 0.28s;
    }
}

.layout-top {
    .sidebar-container {
        position: sticky;
        z-index: 999;
        display: flex;
        width: 100% !important;
        height: $navbar-height;

        :deep(.el-scrollbar) {
            flex: 1;
            height: $navbar-height;
        }

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title),
        :deep(.el-menu--horizontal) {
            height: $navbar-height;
            line-height: $navbar-height;
        }

        :deep(.el-menu--collapse) {
            width: 100%;
        }
    }

    .main-container {
        height: calc(100vh - $navbar-height);
        margin-left: 0;
    }
}

.layout-mix {
    .sidebar-container {
        width: 100% !important;
        height: $navbar-height;

        :deep(.el-scrollbar) {
            flex: 1;
            height: $navbar-height;
        }

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title),
        :deep(.el-menu--horizontal) {
            height: $navbar-height;
            line-height: $navbar-height;
        }

        :deep(.el-menu--horizontal.el-menu) {
            border: none;
        }
    }

    .mix-container {
        display: flex;
        height: 100%;
        padding-top: $navbar-height;

        .mix-container__left {
            position: relative;
            width: $sidebar-width;
            height: 100%;

            :deep(.el-menu) {
                height: 100%;
                border: none;
            }

            .sidebar-toggle {
                position: absolute;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 50px;
                line-height: 50px;
                box-shadow: 0 0 6px -2px var(--el-color-primary);

                div:hover {
                    background-color: var(--menu-background);
                }

                :deep(svg) {
                    color: var(--el-color-primary) !important;
                }
            }
        }

        .main-container {
            flex: 1;
            min-width: 0;
            margin-left: 0;
        }
    }
}

.hideSidebar {
    .main-container {
        margin-left: $sidebar-width-collapsed;
    }

    &.layout-top {
        .main-container {
            margin-left: 0;
        }
    }

    &.layout-mix {
        .sidebar-container {
            width: 100% !important;
        }

        .mix-container {
            .mix-container__left {
                width: $sidebar-width-collapsed;
            }
        }
    }
}

.layout-left.hideSidebar {
    .sidebar-container {
        width: $sidebar-width-collapsed !important;
    }

    .main-container {
        margin-left: $sidebar-width-collapsed;
    }

    &.mobile {
        .sidebar-container {
            pointer-events: none;
            transition-duration: 0.3s;
            transform: translate3d(-210px, 0, 0);
        }

        .main-container {
            margin-left: 0;
        }
    }
}

.mobile {
    .main-container {
        margin-left: 0;
    }

    &.layout-top {
        // 顶部模式全局变量修改
        --el-menu-item-height: $navbar-height;
    }
}
</style>