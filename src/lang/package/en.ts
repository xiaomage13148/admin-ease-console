const enLocale: LocaleMessages = {
    title: 'Admin-Ease',
    // 路由国际化
    route: {
        dashboard: 'Dashboard',
        document: 'Document',
    },
    // 登录页面国际化
    login: {
        username: 'Username',
        password: 'Password',
        login: 'Login',
        captchaCode: 'Verify Code',
        capsLock: 'Caps Lock is On',
        rememberMe: 'Remember Me',
        forgetPassword: 'Forget Password',
        message: {
            username: {
                required: 'Please enter Username',
            },
            password: {
                required: 'Please enter Password',
                min: 'The password can not be less than 6 digits',
            },
            captchaCode: {
                required: 'Please enter Verify Code',
            },
        },
        otherLoginMethods: 'Other login methods',
        validateError: 'Invalid input. Please double-check each field carefully.',
    },
    // 导航栏国际化
    navbar: {
        dashboard: 'Dashboard',
        logout: 'Logout',
        document: 'Document',
        gitee: 'Gitee',
        profile: 'User Profile',
    },
    sizeSelect: {
        tooltip: 'Layout Size',
        default: 'Default',
        large: 'Large',
        small: 'Small',
        message: {
            success: 'Switch Layout Size Successful!',
        },
    },
    langSelect: {
        message: {
            success: 'Switch Language Successful!',
        },
    },
    settings: {
        project: 'Project Settings',
        theme: 'Theme',
        interface: 'Interface',
        navigation: 'Navigation',
        themeColor: 'Theme Color',
        tagsView: 'Tags View',
        fixedHeader: 'Fixed Header',
        sidebarLogo: 'Sidebar Logo',
        watermark: 'Watermark',
    },
    api: {
        operationSuccess: 'Operation Success',
        operationFailed: 'Operation failed',
        errorTip: 'Error Tip',
        successTip: 'Success Tip',
        errorMessage: 'The operation failed, the system is abnormal!',
        timeoutMessage: 'Login timed out, please log in again!',
        apiTimeoutMessage: 'The interface request timed out, please refresh the page and try again!',
        apiRequestFailed: 'The interface request failed, please try again later!',
        networkException: 'network anomaly',
        networkExceptionMsg: 'Please check if your network connection is normal! The network is abnormal',
        errMsg401: 'The user does not have permission (token, user name, password error)!',
        errMsg403: 'The user is authorized, but access is forbidden!',
        errMsg404: 'Network request error, the resource was not found!',
        errMsg405: 'Network request error, request method not allowed!',
        errMsg408: 'Network request timed out!',
        errMsg500: 'Server error, please contact the administrator!',
        errMsg501: 'The network is not implemented!',
        errMsg502: 'Network Error!',
        errMsg503: 'The service is unavailable, the server is temporarily overloaded or maintained!',
        errMsg504: 'Network timeout!',
        errMsg505: 'The http version does not support the request!',
        defaultMessage: 'Placeholder text',
    },
};

export default enLocale;
