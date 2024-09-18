import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import {ThemePanel} from './side/ThemePanel'
import {LayoutPanel} from './side/LayoutPanel'
import {ViewsPanel} from './side/ViewsPanel'
import {ComponentsPanel} from './side/ComponentsPanel'

const Bi_SideMenus = [
    {name: 'theme', label: '主题', icon: 'bi_theme', panelTitle: '主题设置'},
    {name: 'layout', label: '布局', icon: 'bi_layout', panelTitle: '布局设置'},
    {name: 'views', label: '视图', icon: 'bi_views', panelTitle: '视图组件'},
    {name: 'components', label: '组件', icon: 'bi_components', panelTitle: '小组件'}
]

export const SideBar = (props) => {

    const {model} = props;
    const [panel, setPanel] = useState(null);
    const [isHide, setIsHide] = useState(false);

    const panelName = panel && panel.name
    const panelStyle: any = panel ? {display:'block'} : {}

    const onExtOpen = (menu) => {
        setPanel(menu);
        setIsHide(false);
    }

    const onExtClose = () => {
        setPanel(null);
    }

    const onExtHide = (val) => {
        setIsHide(val);
    }

    useEffect(() => {
        
    }, [])

    const menus = Bi_SideMenus.map(menu => {
        const {name,label,icon} = menu;
        const menuClass = `side-block ${name === panelName ? 'side-block-selected' : ''}`;
        return (
            <div key={name} className={menuClass} onClick={() => onExtOpen(menu)}>
                <SvgIcon name={icon} size={24} />
                <span>{label}</span>
            </div>
        )
    });

    return (
        <div className="xdbi-designer-side">
            <div className="xdbi-designer-side-list">
                {menus}
            </div>
            <div className="xdbi-designer-side-ext" style={panelStyle}>
                {
                    panel && (
                        <div className="xdbi-designer-side-panel" style={{width: 200}}>
                            <div className="panel-header">
                                <span>{panel.panelTitle}</span>
                                <div className="panel-close-btn" onClick={onExtClose}>
                                    <SvgIcon name="close" size={14} />
                                </div>
                            </div>
                            <div className="panel-body">
                                { panelName === 'theme' && <ThemePanel model={model}/> }
                                { panelName === 'layout' && <LayoutPanel model={model}/> }
                                { panelName === 'views' && <ViewsPanel model={model}/> }
                                { panelName === 'components' && <ComponentsPanel model={model} onHide={onExtHide} onClose={onExtClose}/> }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

}