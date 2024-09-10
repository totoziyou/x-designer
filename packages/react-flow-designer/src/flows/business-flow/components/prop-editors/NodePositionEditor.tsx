import React, {useRef, useState, useEffect} from 'react'
import {PropsPosition} from '@x-designer/react-components'

export const NodePositionEditor = (props) => {

    const {node} = props;

    const [pos, setPos] = useState(node.position());
    const [size, setSize] = useState(node.size());

    useEffect(() => {
        node.on("change:position", ({current}) => {
            setPos(current)
        });
        node.on("change:size", ({current}) => {
            setSize(current)
        });
    }, [])

    const onPosChange = ({x, y}) => {
        const pos = node.position();
        const offsetX = x - pos.x;
        const offsetY = y - pos.y;
        node.position(x, y);
        if(node.children && node.children.length > 0) {
            const subNodes = node.children.filter(child => child.isNode());
            subNodes.forEach(subNode => {
                const subPos = subNode.position();
                subNode.position(subPos.x + offsetX, subPos.y + offsetY);
            });
        }
    }

    const onSizeChange = (value) => {
        node.size(value);
    }

    return (
        <div className="props-group">
            <div className="props-group-header">位置信息</div>
            <div className="props-group-body">
                <PropsPosition pos={pos} size={size} onPosChange={onPosChange} onSizeChange={onSizeChange} />
            </div>
        </div>
    )

}