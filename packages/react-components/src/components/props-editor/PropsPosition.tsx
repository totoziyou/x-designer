import React from 'react'
import { Input } from 'antd'

export const PropsPosition = (props) => {

    const {pos, size, onPosChange, onSizeChange} = props;

    const onPos = (p, evt) => {
        const val = parseInt(evt.currentTarget.value);
        const newPos = {
            ...pos,
            [p]: val,
        }
        onPosChange(newPos);
    }

    const onSize = (p, evt) => {
        const val = parseInt(evt.currentTarget.value);
        const newSize = {
            ...size,
            [p]: val,
        }
        onSizeChange(newSize);
    }

    return (
        <div className="xdc-props-editor xdc-position-props-editor">
            <div className="xdc-props-editor-row">
                <div className="editor-label">X</div>
                <div className="editor-cell">
                    <Input value={parseInt(pos.x)} onChange={(evt) => onPos('x', evt)} />
                </div>
                <div className="editor-label">Y</div>
                <div className="editor-cell">
                    <Input value={parseInt(pos.y)} onChange={(evt) => onPos('y', evt)}  />
                </div>
            </div>
            <div className="xdc-props-editor-row">
                <div className="editor-label">宽</div>
                <div className="editor-cell">
                    <Input value={size.width} onChange={(evt) => onSize('width', evt)} />
                </div>
                <div className="editor-label">高</div>
                <div className="editor-cell">
                    <Input value={size.height} onChange={(evt) => onSize('height', evt)} />
                </div>
            </div>
        </div>
    )


}