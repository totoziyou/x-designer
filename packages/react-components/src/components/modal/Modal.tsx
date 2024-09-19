import React from 'react'
import { Button, Modal as AntdModal } from 'antd';

export const Modal = (props) => {

    const {open, onCancel, onSubmit, children, title} = props;

    return (
        <AntdModal
            open={open}
            title={title}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>
                    确定
                </Button>
            ]}
        >
            {children}
        </AntdModal>
    )

}