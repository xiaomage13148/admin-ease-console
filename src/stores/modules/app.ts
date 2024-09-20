import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {LanguageEnum} from '@/enums/LanguageEnum';

export const useAppStore = defineStore('app', () => {
    // 语言
    const language = useStorage('language', LanguageEnum.ZH_CN);

    // 对应的语言包

});