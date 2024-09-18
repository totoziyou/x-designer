import React, {forwardRef, useState, useEffect} from 'react'
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
                {item.label}
            </div>
        )
    });

    return (
        <div className="xdbi-side-components">
            {widgets}
        </div>
    )

}