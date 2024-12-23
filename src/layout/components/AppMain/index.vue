<template>
    <!--  <section class="app-main">-->
    <!--    <router-view>-->
    <!--      <template #default="{ Component, route }">-->
    <!--        <transition-->
    <!--          enter-active-class="animate__animated animate__fadeIn"-->
    <!--          mode="out-in"-->
    <!--        >-->
    <!--          <keep-alive :include="cachedViews">-->
    <!--            <component :is="Component" :key="route.path" />-->
    <!--          </keep-alive>-->
    <!--        </transition>-->
    <!--      </template>-->
    <!--    </router-view>-->
    <!--  </section>-->
    <div>
        <h1>APP主页</h1>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-main {
    position: relative;
    background-color: var(--el-bg-color-page);
}
</style>
