import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon, PropsSize} from '@x-designer/react-components'

export const LayoutPanel = (props) => {

    const {model} = props;
    const [config, setConfig] = useState(model.gridLayoutConfig);
    const {cols, rowHeight, margin, containerPadding, containerWidth} = config;

    const onSet = (params) => {
        model.setGridLayoutConfig(params);
    }

    const onSetContainerPadding = (idx, val) => {
        const array = [...containerPadding];
        array[idx] = val;
        model.setGridLayoutConfig({containerPadding: array});
    }

    const onSetMargin = (idx, val) => {
        const array = [...margin];
        array[idx] = val;
        model.setGridLayoutConfig({margin: array});
    }

    useEffect(() => {
        model.on('gridLayoutConfigChanged', newConfig => setConfig(newConfig))
    }, [])

    return (
        <div className="xdbi-side-layout">
            <div className="layout-group">
                <div className="layout-group-header">
                    <SvgIcon name="copy" size={16} />
                    <span>栅格布局</span>
                </div>
                <div className="layout-group-body">
                    <div>启用:</div>
                    <PropsSize title="面板宽度" value={containerWidth} min={200} onChange={(val) => onSet({containerWidth: val})} />
                    <PropsSize title="左右边距" value={containerPadding[0]} min={0} onChange={(val) => onSetContainerPadding(0, val)} />
                    <PropsSize title="上下边距" value={containerPadding[1]} min={0} onChange={(val) => onSetContainerPadding(1, val)} />
                    <PropsSize title="栅格数" value={cols} min={24} onChange={(val) => onSet({cols: val})} />
                    <PropsSize title="行高" value={rowHeight} min={30} onChange={(val) => onSet({rowHeight: val})} />
                    <PropsSize title="列间距" value={margin[0]} min={0} onChange={(val) => onSetMargin(0, val)} />
                    <PropsSize title="行间距" value={margin[1]} min={0} onChange={(val) => onSetMargin(1, val)} />
                </div>
            </div>
            <div className="layout-group">
                <div className="layout-group-header">
                    <SvgIcon name="copy" size={16} />
                    <span>自由布局</span>
                </div>
                <div className="layout-group-body">
                    <div>启用:</div>
                </div>
            </div>
        </div>
    )

}