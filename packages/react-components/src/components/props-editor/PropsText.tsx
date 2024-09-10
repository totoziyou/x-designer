import React from 'react'
import { Input } from 'antd';
import {PropsEditorWrap} from './PropsEditorWrap'

export const PropsText = (props) => {

    const {value, ...otherProps} = props;

    console.info('vvv', value);

    return (
        <PropsEditorWrap className="xdc-text-props-editor" {...otherProps}>
            <Input placeholder="Basic usage" value={value} />
        </PropsEditorWrap>
    )


}