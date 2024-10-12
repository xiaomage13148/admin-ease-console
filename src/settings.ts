import {LanguageEnum} from '@/enums/LanguageEnum';
import {ThemeEnum} from '@/enums/ThemeEnum';

const {pkg} = __APP_INFO__;

const defaultSettings: AppSettings = {
    title: pkg.name,
    version: pkg.version,
    language: LanguageEnum.ZH_CN,
    theme: ThemeEnum.LIGHT,
    themeColor: '#4080FF',
};

export default defaultSettings;