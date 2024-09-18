
import Undefined from "./Undefined";
import Image from './Image';

export const BiWidgets: any = {};

export const RegisterWidgets = (widgetConfig) => {
    BiWidgets[widgetConfig.type] = widgetConfig;
}

export const getWidget = (type) => {
    return BiWidgets[type] || BiWidgets.default;
}

RegisterWidgets(Undefined);
RegisterWidgets(Image);