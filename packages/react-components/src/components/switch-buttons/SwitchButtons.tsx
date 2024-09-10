import React from 'react'
import './SwitchButtons.less'

export const SwitchButtons = (props) => {

    const {options, value, onChange} = props;

    const items = options.map((opt, idx) => {
        const className = `xdc-switch-button ${opt.value === value ? 'xdc-switch-button-selected' : ''}`
        return (
            <div key={idx} className={className} onClick={() => onChange(opt.value)}>
                {opt.label || opt.component}
            </div>
        )
    });

    return (
        <div className="xdc-switch-buttons">
            {items}
        </div>
    )

}