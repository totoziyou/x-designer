import React, {forwardRef, useState, useEffect} from 'react'
// import { Input, Button, Modal } from 'antd';
import {Modal} from '@x-designer/react-components'

export const EditorModal = (props) => {

    const {model} = props;
    const [isOpen, setOpen] = useState(false);
    const [itemModel, setItemModel] = useState(null);

    useEffect(() => {
        model.on('editItem', (itemModel) => {
            setOpen(true);
            setItemModel(itemModel);
        })
    }, [])

    const cancelModal = () => {
        setOpen(false);
        setItemModel(null);
    }

    const WidgetEditor = itemModel ? itemModel.getEditor() : null;
    const editConfig = itemModel ? itemModel.getEditConfig() : {width: 800};

    return (
        <Modal
            className="xdbi-designer-editorModal"
            open={isOpen}
            title={editConfig.title || '设置'}
            width={editConfig.width}
            fullScreen={editConfig.fullScreen}
            footer={null}
            onCancel={cancelModal}
        >
            { itemModel && <WidgetEditor model={itemModel} /> }
        </Modal>
    )

}