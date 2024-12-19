/**
 * ContentType 枚举
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * Request枚举
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * 响应结果枚举
 */
export enum ResultEnum {
    // 响应成功
    SUCCESS = '00000',
    // 未授权前缀
    UNAUTHORIZED_PREFIX = 'A',
}

/**
 * Token key 枚举
 */
export enum TokenKeyEnum {
    TOKEN = 'Token'
}