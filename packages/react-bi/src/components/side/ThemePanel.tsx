import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import {BiTheme, BiThemeList} from '../../model/defines'

export const ThemePanel = (props) => {

    const {model} = props;
    const [theme, setTheme] = useState(model.theme);

    useEffect(() => {
        model.on('themeChange', () => {
            setTheme(model.theme);
        })
    }, [])

    const themeItems = BiThemeList.map((item, idx) => {
        const themeConfig = BiTheme[item.name];
        return (
            <div key={idx} className="theme-preset-item" onClick={() => model.setTheme(item.name)}>
                <div className="preset-show" style={{background: themeConfig.bg}}></div>
                <div className="preset-label">{item.label}</div>
            </div>
        )
    });

    return (
        <div className="xdbi-side-theme">
            <div className="theme-group-header">
                固定主题
            </div>
            <div className="theme-group-body theme-preset">
                {themeItems}
            </div>
            <div className="theme-group-header">
                自定义主题
            </div>
            <div className="theme-group-body">

            </div>
        </div>
    )

}