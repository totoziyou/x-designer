import React from 'react';

type MenuProps = {
    config: any;
    onClick: Function;
}

export const Menu = (props: MenuProps) => {

    const menuItems = []

    for(let menuName in props.config) {
        const item = props.config[menuName];
        menuItems.push(
            <div
                key={menuName}
                className="x-framework-menu-item"
                onClick={() => props.onClick(menuName)}
            >
                {item.menuLabel}
            </div>
        )
    }

    return (
        <div className="x-framework-menu flexRowCenter">{menuItems}</div>
    )
}