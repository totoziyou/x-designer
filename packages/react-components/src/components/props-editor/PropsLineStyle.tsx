import React from 'react'
import {SwitchButtons} from '../switch-buttons/SwitchButtons'

const options = [
    {
        label: '实线',
        value: 'solid',
    },
    {
        label: '虚线',
        value: 'dashed'
    }
]

export const PropsLineStyle = (props) => {

    const {title, value, onChange} = props;

    return (
        <div className="xdc-props-editor xdc-lineStyle-props-editor">
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className="editor-cell">
                    <SwitchButtons options={options} value={value} onChange={onChange}/>
                </div>
            </div>
        </div>
    )


}