import React from 'react'
import { InputNumber } from 'antd';

export const PropsSize = (props) => {

    const {title, value, min, max, unit, onChange} = props;

    return (
        <div className="xdc-props-editor xdc-size-props-editor">
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className="editor-cell">
                    <InputNumber
                        min={min}
                        max={max}
                        value={value}
                        addonAfter={unit}
                        style={{ width: 150 }}
                        onChange={(val) => onChange(val)}
                    />
                </div>
            </div>
        </div>
    )


}