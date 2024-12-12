/**
 * 登录请求参数
 */
export interface LoginData {
    // 用户名
    username: string,
    // 密码
    password: string
}

export interface LoginParams extends LoginData {

}