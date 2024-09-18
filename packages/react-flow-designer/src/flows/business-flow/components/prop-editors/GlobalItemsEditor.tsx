import React, {useRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'

export const GlobalItemsEditor = (props) => {

    const {model} = props;

    const getItems = (nodes) => {
        return nodes.map((node, idx) => {
            const {label, type} = node.getProp().props;
            const isContainer = type === 'containerNode';
            const isFunc = type === 'functionNode'
            const children = node.children && getItems(node.children)
            const iconName = isContainer ? 'containerNode' : (isFunc ? 'funcNode' : 'tagNode')

            return (
                <div key={idx} className="props-els">
                    <div className="props-els-label" onClick={() => model.selectItem(node)}>
                        <SvgIcon name={iconName} size={16} />
                        <span>{label}</span>
                    </div>
                    { isContainer && <div className="props-els-list">{children}</div> }
                </div>
            )
        });
    }

    const els = getItems(model.getRootNodes())

    return (
        <div className="props-group">
            <div className="props-group-header">节点元素</div>
            <div className="props-group-body">
                {els}
            </div>
        </div>
    )

}