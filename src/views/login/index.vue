<template>
    <div class="login-container">
        <div class="flex-x-between absolute-lt w-full p-2">
            <div class="flex-center">
                <el-image :src="logo" style="width: 30px; height: 30px"/>
                <span
                    class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1"
                >
                    {{ $t('title') }}
        </span>
            </div>
            <div class="flex-center">
                <el-switch
                    v-model="isDark"
                    inline-prompt
                    active-icon="Moon"
                    inactive-icon="Sunny"
                    @change="toggleTheme"
                />
                <lang-select class="ml-2 cursor-pointer"/>
            </div>
        </div>

        <!-- 登录表单 -->
        <div class="login-content">
            <div class="login-image">
                <el-image :src="loginImage" style="width: 210px; height: 210px"/>
            </div>
            <div class="login-box">
                <el-form
                    ref="loginFormRef"
                    :model="loginData"
                    class="login-form"
                    :rules="loginRules"
                >
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
                        :visible="isCapslock"
                        :content="$t('login.capsLock')"
                        placement="right"
                    >
                        <el-form-item prop="password">
                            <div class="input-wrapper">
                                <i-ep-lock class="mx-2"/>
                                <el-input
                                    v-model="loginData.password"
                                    :placeholder="$t('login.password')"
                                    @keyup="checkCapslock"
                                    type="password"
                                    name="password"
                                    size="large"
                                    class="h-[48px] pr-2"
                                    show-password
                                />
                            </div>
                        </el-form-item>
                    </el-tooltip>

                    <!-- 登录按钮 -->
                    <el-button
                        type="primary"
                        size="large"
                        class="w-full"
                        @click.prevent="login"
                    >
                        {{ $t('login.login') }}
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入 login.scss 文件
import '@/styles/login.scss';
import {useSettingsStore} from '@/stores';
import {ThemeEnum} from '@/enums/ThemeEnum';
import {ElMessage, FormInstance} from 'element-plus';
import {LoginData} from '@/types/auth';
import {loginApi} from '@/api/auth';

const settingsStore = useSettingsStore();
const {t} = useI18n();

const logo = ref(new URL(`../../assets/logo.png`, import.meta.url).href);
const loginImage = ref(new URL(`../../assets/images/login-image.svg`, import.meta.url).href);
// 是否大写锁定
const isCapslock = ref(false);
// 登录数据结构
const loginData = ref<LoginData>({
    username: 'admin',
    password: '123456',
});
// 深色模式
const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
// 登录表单Ref
const loginFormRef = useTemplateRef<FormInstance>('loginFormRef');

// 校验规则
const loginRules = computed(() => {
    return {
        username: [
            {
                required: true,
                trigger: 'blur',
                message: t('login.message.username.required'),
            },
        ],
        password: [
            {
                required: true,
                trigger: 'blur',
                message: t('login.message.password.required'),
            },
            {
                min: 6,
                message: t('login.message.password.min'),
                trigger: 'blur',
            },
        ],
    };
});

/**
 * 检查输入大小写
 * @param event
 */
const checkCapslock = (event: KeyboardEvent) => {
    // 防止浏览器密码自动填充时报错
    if (event instanceof KeyboardEvent) {
        isCapslock.value = event.getModifierState('CapsLock');
    }
};

/**
 * 切换主题
 */
const toggleTheme = () => {
    const newTheme = settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    settingsStore.changeTheme(newTheme);
};

/**
 * 登录
 */
const login = () => {
    loginFormRef?.value?.validate((valid, fields) => {
        if (valid) {
            loginApi({...loginData.value}).then(res => {
                // TODO ---->打印res , 日期: 2024/12/16
                console.log(`---->print [res] , current date: [${new Date().toString()}]`, res);
            }).catch(err => {
                // TODO ---->打印err , 日期: 2024/12/16
                console.log(`---->print [err] , current date: [${new Date().toString()}]`, err);
            });
        } else {
            ElMessage.error({message: t('login.validateError')});
        }
    });
};

</script>

<style lang="scss" scoped>

</style>