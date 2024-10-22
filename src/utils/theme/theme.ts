/**
 * 切换主题模式
 * @param isDark
 */
export function toggleDarkMode(isDark: boolean) {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}