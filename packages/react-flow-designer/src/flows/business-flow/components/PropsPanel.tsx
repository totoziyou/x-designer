import React, {useRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import {GlobalItemsEditor} from './prop-editors/GlobalItemsEditor'
import {NodeBaseEditor} from './prop-editors/NodeBaseEditor'
import {NodePositionEditor} from './prop-editors/NodePositionEditor'
import {NodeStyleEditor} from './prop-editors/NodeStyleEditor'
import {NodeTitleEditor} from './prop-editors/NodeTitleEditor'
import {EdgeStyleEditor} from './prop-editors/EdgeStyleEditor'

export const PropsPanel = (props) => {

    const {model} = props;
    const [type, setType] = useState('global');
    const [curItem, setCurItem] = useState(null);

    const onSelectionChange = ({selected}) => {
        const cell = selected[0];
        if(!cell) {
            setType('global');
            setCurItem(null);
        }
        else if(cell.isNode()) {
            setType('node');
            setCurItem(cell);
        }
        else if(cell.isEdge()) {
            setType('edge');
            setCurItem(cell);
        }
        else {
            setType('global');
            setCurItem(null);
        }
    }

    useEffect(() => {
        model.graph.on('selection:changed', onSelectionChange);
    }, [])

    console.info('--', curItem);

    let title;
    let Props;
    if(curItem) {
        if(type === 'node') {
            title = '节点属性';
            Props = (
                <>
                    <NodeBaseEditor node={curItem} />
                    <NodePositionEditor node={curItem} />
                    <NodeStyleEditor node={curItem} />
                    <NodeTitleEditor node={curItem} />
                </>
            )
        }
        else if(type === 'edge'){
            title = '线条属性';
            Props = (
                <>
                    <EdgeStyleEditor edge={curItem} />
                </>
            )
        }
    }
    else {
        title = '全局属性'
        Props = (
            <>
                <GlobalItemsEditor model={model} />
            </>
        )
    }

    return (
        <div className="xdb-flow-panel">
            <div className="panel-title">
                <SvgIcon name="props" size={24} />
                <span>{title}</span>
            </div>
            {Props}
        </div>
    )

}