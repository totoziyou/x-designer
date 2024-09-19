import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'

export const ItemMenu = (props) => {

    const {model} = props;

    const onMouseDown = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    }

    const onAction = (menu, evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        if(menu.action) {
            menu.action(model);
        }
        return false;
    }

    const onCopy = (evt) => {
        model.copy();
    }

    const onRemove = (evt) => {
        model.remove();
    }

    const extMenus = model.getExtMenus().map(menu => {
        return (
            <div key={menu.name} className="menu-item" onClick={(evt) => onAction(menu, evt)} onMouseDown={onMouseDown}>
                <SvgIcon name={menu.iconName} config={menu.iconConfig} />
            </div>
        )
    });

    return (
        <div className="xdbi-widget-menu">
            <div className="menu-item" onClick={onCopy} onMouseDown={onMouseDown}>
                <SvgIcon name="copy" />
            </div>
            <div className="menu-item" onClick={onRemove} onMouseDown={onMouseDown}>
                <SvgIcon name="remove" />
            </div>
            <div className="menu-item" onClick={()=>model.locked()} onMouseDown={onMouseDown}>
                <SvgIcon name={model.isLocked ? 'unlock' : 'lock'} />
            </div>
            {extMenus}
        </div>
    )

}