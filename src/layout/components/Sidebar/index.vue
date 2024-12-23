<template>
    <div :class="{ 'has-logo': true }">
        <!-- layout mix-->
        <!--    <div class="flex w-full" v-if="layout == LayoutEnum.MIX">
              <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
              <SidebarMixTopMenu class="flex-1" />
              <NavbarAction />
            </div>-->
        <!-- layout left || layout top -->
        <template>
            <SidebarLogo/>
            <el-scrollbar>
                <SidebarMenu :menu-list="[]" base-path=""/>
            </el-scrollbar>
            <!--      <NavbarAction v-if="layout === LayoutEnum.TOP" />-->
        </template>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.has-logo {
    .el-scrollbar {
        height: calc(100vh - $navbar-height);
    }
}
</style>
