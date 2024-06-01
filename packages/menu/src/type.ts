export interface MenuItem {
    name: string,
    index: string,
    icon: string,
    // jsx所需要用到处理后的icon,
    i: string,
    children: MenuItem[]
}