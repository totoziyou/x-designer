import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import {BiViewsItems} from '../../model/defines'

export const ViewsPanel = (props) => {

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

    const widgets = BiViewsItems.map((item, idx) => {
        return (
            <div
                key={idx}
                className="views-item"
                draggable={true}
                onDragStart={(evt) => onDragStart(item, evt)}
                onDrag={onHide}
                onDragEnd={onDragEnd}
            >
                {item.label}
            </div>
        )
    });

    return (
        <div className="xdbi-side-views">
            {widgets}
        </div>
    )

}