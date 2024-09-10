import React, {useRef, useState, useEffect} from 'react'
import {PropsColor, PropsLineStyle, PropsSize} from '@x-designer/react-components'

export const NodeStyleEditor = (props) => {

    const {node} = props;
    const [attrs, setAttrs] = useState(node.getAttrs());
    const bodyLineStyle = attrs.body.strokeDasharray > 0 ? 'dashed' : 'solid';

    const onAttrsChange = (attrPath, value) => {
        console.info('--', attrPath, value);
        node.attr(attrPath, value);
    }

    const onBodyLineStyleChange = (value) => {
        node.attr('body/strokeDasharray', value === 'solid' ? 0 : 5);
        setAttrs(node.getAttrs());
    }

    useEffect(() => {
        node.on("change:attrs", ({current}) => {
            setAttrs(node.getAttrs());
        });
    }, [])

    return (
        <div className="props-group">
            <div className="props-group-header">节点样式</div>
            <div className="props-group-body">
                <PropsColor title="背景颜色" value={attrs.body.fill} onChange={val => onAttrsChange('body/fill', val)} />
                <PropsLineStyle title="边框样式" value={bodyLineStyle} onChange={onBodyLineStyleChange} />
                <PropsSize title="边框粗细" value={attrs.body.strokeWidth} min={0} max={50} unit="px" onChange={val => onAttrsChange('body/strokeWidth', val)} />
                <PropsColor title="边框颜色" value={attrs.body.stroke} onChange={val => onAttrsChange('body/stroke', val)} />
                <PropsSize title="圆角" value={attrs.body.radius} min={0} unit="px" onChange={val => onAttrsChange('body/radius', val)} />
            </div>
        </div>
    )

}