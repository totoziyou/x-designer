import React from 'react'
import {SwitchButtons} from '../switch-buttons/SwitchButtons'
import {PropsEditorWrap} from './PropsEditorWrap'

export const PropsSwitch = (props) => {

    const {options, value, onChange, title} = props;

    return (
        <PropsEditorWrap className="xdc-switch-props-editor" title={title}>
            <SwitchButtons options={options} value={value} onChange={onChange}/>
        </PropsEditorWrap>
    )

}