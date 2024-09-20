<script setup lang="ts">
import {RouterView} from 'vue-router';

</script>

<template>
    <!--  :locale="locale" :size="size"  -->
    <el-config-provider>
        <RouterView/>
    </el-config-provider>
</template>

<style scoped>
</style>
