import React from 'react'
import { Modal as AntdModal } from 'antd'
import './Modal.less'

export const Modal = (props) => {

    const {centered, maskClosable, ...otherProps} = props;

    return (
        <AntdModal
            className="xdc-modal"
            okText="确定"
            cancelText="取消"
            centered
            maskClosable={false}
            {...otherProps}
        />
    )

}