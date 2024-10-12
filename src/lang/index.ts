import enLocale from './package/en';
import zhCnLocale from '@/lang/package/zh-cn';
import {createI18n} from 'vue-i18n';
import type {App} from 'vue';

const locale: string = 'zh-cn';

const messages: { [key: string]: LocaleMessages } = {
    'zh-cn': {
        ...zhCnLocale,
    },
    en: {
        ...enLocale,
    },
};

const i18n = createI18n({
    legacy: false,
    locale: locale,
    messages: messages,
    globalInjection: true,
});

export function setupI18n(app: App<Element>) {
    app.use(i18n);
}

export default i18n;