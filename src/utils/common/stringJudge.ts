type UnauthorizedRspType = `${'A'}${number}${number}${number}${number}`;

/**
 * 判断值是否是未授权的响应结果
 * @param value
 */
export const isUnauthorized = (value: string): value is UnauthorizedRspType => {
    const regex: RegExp = /^A\d{4}$/;
    return regex.test(value);
};