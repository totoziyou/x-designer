import React, {useState, useEffect} from 'react'
import { Button, Modal } from 'antd';
import {SvgIcon, ZoomSize} from '@x-designer/react-components'

export const Guide = (props) => {

    const {model} = props;
    const [scale, setScale] = useState(100);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        model.on('history', ({canUndo, canRedo}) => {
            setCanUndo(canUndo);
            setCanRedo(canRedo);
        });
        model.on('scale', (scale) => {
            setScale(scale);
        });
    }, []);

    const undoClass = `guide-item ${canUndo ? '' : 'guide-item-disable'}`;
    const redoClass = `guide-item ${canRedo ? '' : 'guide-item-disable'}`;

    return (
        <div className="xdb-flow-guide">
            <div className={undoClass} onClick={model.undo}>
                <SvgIcon name="undo" />
            </div>
            <div className={redoClass} onClick={model.redo}>
                <SvgIcon name="redo" />
            </div>
            <div className="guide-item" onClick={model.setCenter}>
                <SvgIcon name="centerView" />
                <span>居中</span>
            </div>
            <div className="guide-item" onClick={model.zoomFit}>
                <SvgIcon name="fitView" />
                <span>适合屏幕</span>
            </div>
            <ZoomSize scale={scale} onZoom={model.zoomTo} />
            <div className="guide-item" onClick={() => setOpen(true)}>
                <SvgIcon name="jsonObject" />
                <span>查看数据</span>
            </div>
            <Modal
                open={open}
                title="Title"
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {}}>
                        Submit
                    </Button>
                ]}
            >
                内容
            </Modal>
        </div>
    )

}