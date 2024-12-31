import {LanguageEnum} from '@/enums/LanguageEnum';
import {ThemeEnum} from '@/enums/ThemeEnum';
import {LayoutEnum} from '@/enums/LayoutEnum';
import {DeviceEnum} from '@/enums/DeviceEnum';

export const useGlobSetting = (): Readonly<AppSettings> => {
    const {pkg} = __APP_INFO__;
    const env = import.meta.env;
    const {
        VITE_APP_PORT,
        VITE_APP_BASE_API,
        VITE_APP_API_URL,
        VITE_APP_WS_ENDPOINT,
        VITE_MOCK_DEV_SERVER,
        VITE_GLOB_API_URL_PREFIX,
    } = env;
    const glob: Readonly<AppSettings> = {
        title: pkg.name,
        version: pkg.version,
        port: VITE_APP_PORT,
        baseApi: VITE_APP_BASE_API,
        apiUrl: VITE_APP_API_URL,
        wsEndpoint: VITE_APP_WS_ENDPOINT,
        mockDevServer: VITE_MOCK_DEV_SERVER,
        urlPrefix: VITE_GLOB_API_URL_PREFIX,
        language: LanguageEnum.ZH_CN,
        theme: ThemeEnum.LIGHT,
        themeColor: '#4080FF',
        layout: LayoutEnum.LEFT,
        sidebarLogo: true,
        device: DeviceEnum.DESKTOP,
        tagsView: true,
        fixedHeader: true,
        showSettings: true,
    };

    return glob as Readonly<AppSettings>;
};