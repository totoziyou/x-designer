
export type BiWidget = {
    name: string;
    type: string;
    categoryPath?: string;
    label: string;
    defaultWidth: number;
    defaultHeight: number;
    component: any;
    [key: string]: any;
}


export const BiWidgets: { [key:string]: BiWidget } = {};
export const BiViewsItems: Array<BiWidget> = []
export const BiComponentItems: Array<BiWidget> = []

export const registerWidgets = (widgetConfig: BiWidget): void => {
    const {name, type} = widgetConfig;
    console.info('注册widget:', name, type, widgetConfig);
    BiWidgets[name] = widgetConfig;
    if(type === 'view') {
        BiViewsItems.push(widgetConfig);
    }
    else if(type === 'component') {
        BiComponentItems.push(widgetConfig);
    }
}

export const getWidget = (name: string) => {
    return BiWidgets[name] || BiWidgets.default;
}