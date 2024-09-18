import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'

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

    const items = [
        {type:'image', label:'图片', defaultWidth: 200, defaultHeight: 200},
        {type:'video', label:'视频', defaultWidth: 400, defaultHeight: 200},
        {type:'stream', label:'流媒体', defaultWidth: 400, defaultHeight: 200}
    ];

    const widgets = items.map((item, idx) => {
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