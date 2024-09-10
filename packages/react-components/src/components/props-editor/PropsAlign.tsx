import React from 'react'
import {SvgIcon} from "../svg-icon";

const AlignTypes = {
    horizontal: [
        {icon: 'alignLeft', value: 'left'},
        {icon: 'alignCenter', value: 'center'},
        {icon: 'alignRight', value: 'right'},
    ],
    vertical: [
        {icon: 'alignTop', value: 'top'},
        {icon: 'alignMiddle', value: 'center'},
        {icon: 'alignBottom', value: 'bottom'},
    ],
}

export const PropsAlign = (props) => {

    const {title, type, value, onChange} = props;

    console.info('render', value);

    const items = AlignTypes[type].map((item, idx) => {
        const className = `align-item ${item.value === value ? 'align-item-selected' : ''}`
        return (
            <div key={idx} className={className} onClick={() => onChange(item.value)}>
                <SvgIcon name={item.icon} />
            </div>
        )
    });

    return (
        <div className="xdc-props-editor xdc-align-props-editor">
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className="editor-cell">
                    <div className="align-container">
                        {items}
                    </div>
                </div>
            </div>
        </div>
    )


}