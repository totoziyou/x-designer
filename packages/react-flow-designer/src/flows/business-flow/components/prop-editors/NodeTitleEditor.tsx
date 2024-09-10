import React, {useRef, useState, useEffect} from 'react'
import {PropsColor, PropsAlign, PropsSize} from '@x-designer/react-components'

export const NodeTitleEditor = (props) => {

    const {node} = props;
    const [attrs, setAttrs] = useState(node.getAttrs());

    const isContainer = node.getProp().props.type === 'containerNode';
    
    const onAttrsChange = (attrPath, value) => {
        node.attr(attrPath, value);
    }

    useEffect(() => {
        node.on("change:attrs", ({current}) => {
            setAttrs(node.getAttrs());
        });
    }, [])

    return (
        <div className="props-group">
            <div className="props-group-header">标题样式</div>
            <div className="props-group-body">
                { isContainer && <PropsSize title="标题高度" value={attrs.header.height} min={20} unit="px" onChange={val => onAttrsChange('header/height', val)} /> }
                <PropsSize title="字体大小" value={attrs.text.fontSize} min={12} max={100} unit="px" onChange={val => onAttrsChange('text/fontSize', val)} />
                <PropsAlign title="水平对齐" type="horizontal" value={attrs.text.hAlign} onChange={val => onAttrsChange('text/hAlign', val)} />
                <PropsAlign title="垂直对齐" type="vertical" value={attrs.text.vAlign} onChange={val => onAttrsChange('text/vAlign', val)} />
                <PropsColor title="字体颜色" value={attrs.text.fill} onChange={val => onAttrsChange('text/fill', val)} />
                { isContainer && <PropsColor title="背景颜色" value={attrs.text.bg} onChange={val => onAttrsChange('text/bg', val)} /> }
            </div>
        </div>
    )

}