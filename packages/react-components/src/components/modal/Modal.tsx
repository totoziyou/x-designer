import React from 'react'
import { Modal as AntdModal } from 'antd'
import './Modal.less'

export const Modal = (props) => {

    const {className = '', centered, maskClosable, fullScreen, ...otherProps} = props;
    const mClass = `xdc-modal ${fullScreen ? 'xdc-modal-fullScreen' : ''} ${className}`

    return (
        <AntdModal
            className={mClass}
            okText="确定"
            cancelText="取消"
            centered={centered || true}
            maskClosable={maskClosable || false}
            {...otherProps}
        />
    )

}