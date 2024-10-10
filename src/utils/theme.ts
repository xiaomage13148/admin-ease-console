/**
 * 切换主题模式
 * @param isDark
 */
export function toggleDarkMode(isDark: boolean) {
    // TODO ---->打印isDark , 日期: 2024/10/10
    console.log(`---->打印isDark , 当前时间是: ${new Date().toString()}` , isDark);
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}