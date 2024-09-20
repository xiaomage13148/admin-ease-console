<script setup lang="ts">
import {ref} from 'vue';
import type {LoginData} from '@/api/auth';

// 导入 login.scss 文件
import '@/styles/login.scss';

const logo = ref(new URL(`../../assets/logo.png`, import.meta.url).href);
const loginImage = ref(new URL(`../../assets/images/login-image.svg`, import.meta.url).href);

const loginData = ref<LoginData>({
    username: 'admin',
    password: '123456',
});
</script>

<template>
    <div class="login-container">
        <div class="flex-x-between absolute-lt w-full p-2">
            <div class="flex-center">
                <el-image :src="logo" style="width: 30px; height: 30px"/>
                <span
                    class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1"
                >
          测试标题
        </span>
                <el-tag size="small" type="success">
                    测试版本
                </el-tag>
            </div>

            <!--            <div class="flex-center">-->
            <!--                <el-switch-->
            <!--                    v-model="isDark"-->
            <!--                    inline-prompt-->
            <!--                    active-icon="Moon"-->
            <!--                    inactive-icon="Sunny"-->
            <!--                    @change="toggleTheme"-->
            <!--                />-->
            <!--                <lang-select class="ml-2 cursor-pointer"/>-->
            <!--            </div>-->
        </div>

        <!-- 登录表单 -->
        <div class="login-content">
            <div class="login-image">
                <el-image :src="loginImage" style="width: 210px; height: 210px"/>
            </div>
            <div class="login-box">
                <!--     :rules="loginRules"           -->
                <el-form
                    ref="loginFormRef"
                    :model="loginData"
                    class="login-form"
                >
                    <!--                    <h2 class="text-xl font-medium text-center flex-center relative">
                                            {{ $t('login.login') }}
                                            <el-dropdown style="position: absolute; right: 0">
                                                <div class="cursor-pointer">
                                                    <el-icon>
                                                        <arrow-down/>
                                                    </el-icon>
                                                </div>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item
                                                            @click="setLoginCredentials('root', '123456')"
                                                        >
                                                            超级管理员：root/123456
                                                        </el-dropdown-item>
                                                        <el-dropdown-item
                                                            @click="setLoginCredentials('admin', '123456')"
                                                        >
                                                            系统管理员：admin/123456
                                                        </el-dropdown-item>
                                                        <el-dropdown-item
                                                            @click="setLoginCredentials('test', '123456')"
                                                        >
                                                            测试小游客：test/123456
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </h2>-->

                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <div class="input-wrapper">
                            <i-ep-user class="mx-2"/>
                            <el-input
                                ref="username"
                                v-model="loginData.username"
                                :placeholder="$t('login.username')"
                                name="username"
                                size="large"
                                class="h-[48px]"
                            />
                        </div>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-tooltip
                        :visible="true"
                        :content="$t('login.capsLock')"
                        placement="right"
                    >
                        <el-form-item prop="password">
                            <div class="input-wrapper">
                                <i-ep-lock class="mx-2"/>
                                <!--                                @keyup="checkCapslock"
                                                                @keyup.enter="handleLoginSubmit"-->
                                <el-input
                                    v-model="loginData.password"
                                    :placeholder="$t('login.password')"
                                    type="password"
                                    name="password"
                                    size="large"
                                    class="h-[48px] pr-2"
                                    show-password
                                />
                            </div>
                        </el-form-item>
                    </el-tooltip>

                    <!--                    &lt;!&ndash; 验证码 &ndash;&gt;
                                        <el-form-item prop="captchaCode">
                                            <div class="input-wrapper">
                                                <svg-icon icon-class="captcha" class="mx-2"/>
                                                <el-input
                                                    v-model="loginData.captchaCode"
                                                    auto-complete="off"
                                                    size="large"
                                                    class="flex-1"
                                                    :placeholder="$t('login.captchaCode')"
                                                    @keyup.enter="handleLoginSubmit"
                                                />

                                                <el-image
                                                    @click="getCaptcha"
                                                    :src="captchaBase64"
                                                    class="captcha-image"
                                                />
                                            </div>
                                        </el-form-item>-->

                    <!--                    <div class="flex-x-between w-full py-1">
                                            <el-checkbox>
                                                {{ $t('login.rememberMe') }}
                                            </el-checkbox>

                                            <el-link type="primary" href="/forget-password">
                                                {{ $t('login.forgetPassword') }}
                                            </el-link>
                                        </div>-->

                    <!-- 登录按钮 -->
                    <el-button
                        type="primary"
                        size="large"
                        class="w-full"
                    >
                        {{ $t('login.login') }}
                    </el-button>

                    <el-divider>
                        <span class="text-12px">{{ $t('login.otherLoginMethods') }}</span>
                    </el-divider>

                    <!--                    &lt;!&ndash; 第三方登录 &ndash;&gt;
                                        <div class="flex-x-center text-lg color-gray-5">
                                            <svg-icon icon-class="wechat" class="cursor-pointer"/>
                                            <svg-icon icon-class="qq" class="cursor-pointer ml-5"/>
                                            <svg-icon icon-class="github" class="cursor-pointer ml-5"/>
                                            <svg-icon icon-class="gitee" class="cursor-pointer ml-5"/>
                                        </div>-->
                </el-form>
            </div>
        </div>

        <!-- ICP备案 -->
        <div class="absolute bottom-0 w-full text-center text-12px">
            <p>
                Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
                <a
                    href="http://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                >
                    皖ICP备20006496号-2
                </a>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>