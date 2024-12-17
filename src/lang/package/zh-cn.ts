const zhCnLocale: LocaleMessages = {
    title: '简易管理',
    // 路由国际化
    route: {
        dashboard: '首页',
        document: '项目文档',
    },
    // 登录页面国际化
    login: {
        username: '用户名',
        password: '密码',
        login: '登 录',
        captchaCode: '验证码',
        capsLock: '大写锁定已打开',
        rememberMe: '记住我',
        forgetPassword: '忘记密码',
        message: {
            username: {
                required: '请输入用户名',
            },
            password: {
                required: '请输入密码',
                min: '密码不能少于6位',
            },
            captchaCode: {
                required: '请输入验证码',
            },
        },
        otherLoginMethods: '其他登录方式',
        validateError: '输入有误，请仔细检查每个字段。',
    },
    // 导航栏国际化
    navbar: {
        dashboard: '首页',
        logout: '注销登出',
        document: '项目文档',
        gitee: '项目地址',
        profile: '个人中心',
    },
    sizeSelect: {
        tooltip: '布局大小',
        default: '默认',
        large: '大型',
        small: '小型',
        message: {
            success: '切换布局大小成功！',
        },
    },
    langSelect: {
        message: {
            success: '切换语言成功！',
        },
    },
    settings: {
        project: '项目配置',
        theme: '主题设置',
        interface: '界面设置',
        navigation: '导航设置',
        themeColor: '主题颜色',
        tagsView: '开启 Tags-View',
        fixedHeader: '固定 Header',
        sidebarLogo: '侧边栏 Logo',
        watermark: '开启水印',
    },
    api: {
        operationSuccess: '操作成功',
        operationFailed: '操作失败',
        errorTip: '错误提示',
        successTip: '成功提示',
        errorMessage: '操作失败,系统异常!',
        timeoutMessage: '登录超时,请重新登录!',
        apiTimeoutMessage: '接口请求超时,请刷新页面重试!',
        apiRequestFailed: '请求出错，请稍候重试',
        networkException: '网络异常',
        networkExceptionMsg: '网络异常，请检查您的网络连接是否正常!',
        errMsg401: '用户没有权限（令牌、用户名、密码错误）!',
        errMsg403: '用户得到授权，但是访问是被禁止的。!',
        errMsg404: '网络请求错误,未找到该资源!',
        errMsg405: '网络请求错误,请求方法未允许!',
        errMsg408: '网络请求超时!',
        errMsg500: '服务器错误,请联系管理员!',
        errMsg501: '网络未实现!',
        errMsg502: '网络错误!',
        errMsg503: '服务不可用，服务器暂时过载或维护!',
        errMsg504: '网络超时!',
        errMsg505: 'http版本不支持该请求!',
        defaultMessage: '默认提示',
    },
    // 对话框
    dialog: {
        defaultTitle: '标题',
        defaultContent: '默认内容',
    },
    cancel: '取消',
    confirm: '确定',
};

export default zhCnLocale;
