import type {AppSettings} from '@/api/app';
import {LanguageEnum} from '@/enums/LanguageEnum';
import {ThemeEnum} from '@/enums/ThemeEnum';

const defaultSettings: AppSettings = {
    title: 'adminEaseConsole',
    version: '1.0.0',
    language: LanguageEnum.ZH_CN,
    theme: ThemeEnum.LIGHT,
    themeColor: '#4080FF',
};

export default defaultSettings;