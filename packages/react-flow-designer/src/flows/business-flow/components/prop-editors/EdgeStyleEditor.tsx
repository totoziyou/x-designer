import React, {useRef, useState, useEffect} from 'react'
import {PropsColor, PropsLineStyle, PropsSize} from '@x-designer/react-components'

export const EdgeStyleEditor = (props) => {

    const {edge} = props;
    const [attrs, setAttrs] = useState(edge.getAttrs());
    const lineStyle = attrs.line.strokeDasharray > 0 ? 'dashed' : 'solid';

    const onAttrsChange = (attrPath, value) => {
        edge.attr(attrPath, value);
    }

    const onBodyLineStyleChange = (value) => {
        edge.attr('line/strokeDasharray', value === 'solid' ? 0 : 5);
        setAttrs(edge.getAttrs());
    }

    useEffect(() => {
        edge.on("change:attrs", ({current}) => {
            setAttrs(edge.getAttrs());
        });
    }, [])

    return (
        <div className="props-group">
            <div className="props-group-header">节点样式</div>
            <div className="props-group-body">
                <PropsLineStyle title="线条样式" value={lineStyle} onChange={onBodyLineStyleChange} />
                <PropsSize title="线条粗细" value={attrs.line.strokeWidth} min={1} max={10} unit="px" onChange={val => onAttrsChange('line/strokeWidth', val)} />
                <PropsColor title="线条颜色" value={attrs.line.stroke} onChange={val => onAttrsChange('line/stroke', val)} />
            </div>
        </div>
    )

}