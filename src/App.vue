<template>
    <el-config-provider :locale="locale">
        <RouterView/>
    </el-config-provider>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
import {useAppStore} from '@/stores';
import {computed} from 'vue';

const appStore = useAppStore();
const locale = computed(() => appStore.locale);
</script>

<style scoped>
</style>
