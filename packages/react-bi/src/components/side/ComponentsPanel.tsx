import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import {BiComponentItems} from '../../model/defines'

export const ComponentsPanel = (props) => {

    const {model, onHide, onClose} = props;

    const onDragStart = (item, evt) => {
        const offsetPos = {
            x: evt.offsetX,
            y: evt.offsetY,
        }
        model.dragNewStart(item, offsetPos);
        console.info('onDragStart', item, offsetPos);
    }

    const onDragEnd = (evt) => {
        console.info('onDragEnd--')
        model.dragEnd();
        onClose();
    }

    const widgets = BiComponentItems.map((item, idx) => {
        return (
            <div
                key={idx}
                className="components-item"
                draggable={true}
                onDragStart={(evt) => onDragStart(item, evt)}
                onDrag={onHide}
                onDragEnd={onDragEnd}
            >
                <SvgIcon name={item.icon} config={item.iconConfig} size={30} />
                <span>{item.label}</span>
            </div>
        )
    });

    return (
        <div className="xdbi-side-components">
            {widgets}
        </div>
    )

}