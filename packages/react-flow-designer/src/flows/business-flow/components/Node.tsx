import React, {useState, useEffect} from 'react'
import { Popover } from 'antd';
import {SvgIcon} from '@x-designer/react-components'
import {NodeMenu} from './nodes/NodeMenu'

const getLabel = (props, data) => {
    let str = data.label || props.label;
    if(str) str = str.replace(/\n/g, '<br>');
    return str
}

const getNodeStyle = (attrs) => {
    let style: any = {};
    if(attrs) {
        const {body} = attrs;
        let borderLine = 'solid';
        if(body.strokeDasharray && body.strokeDasharray > 0) {
            borderLine = 'dashed';
        }
        style = {
            background: body.fill,
            border: `${body.strokeWidth}px ${borderLine} ${body.stroke}`,
            borderRadius: `${body.radius || 0}px`
        }
        // if(this.isFuncNode && this.vandMode === 'view') {
        //     style.cursor = 'pointer';
        // }
    }
    return style;
}

const getHeaderStyle = (props, attrs) => {
    let style: any = {};
    if(attrs) {
        const {body, text, header} = attrs;
        const radius = (body.radius || 3) + 'px';
        style = {
            background: text.bg || 'none',
            height: '100%',
            borderRadius: radius,
        }
        if(props && props.embedding) {
            style.height = ((header && header.height) ? header.height : 30) + 'px';
            style.borderRadius = `${radius} ${radius} 0 0`;
        }
    }
    return style;
};

const AlignValues = {
    top: 'flex-start',
    left: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    right: 'flex-end'
}

const getTitleStyle = (attrs) => {
    let style = {};
    if(attrs) {
        const {text} = attrs;
        style = {
            fontSize: text.fontSize + 'px',
            fontWeight: text.fontWeight || 'normal',
            color: text.fill,
            alignItems: AlignValues[text.vAlign] || 'flex-start',
            justifyContent: AlignValues[text.hAlign] || 'flex-start'
        }
    }
    return style;
}


export const Node = (props) => {

    const {node, graph} = props;
    const [selected, setSelected] = useState(false);

    const onSelectionChange = ({ selected }) => {
        setSelected(selected.length === 1 && selected[0].id === node.id);
    }

    const onAttrsChange = () => {

    }

    const onDataChange = () => {

    }

    const onCopy = () => {
        graph.copy([node], {deep: true});
        const {height} = node.size();
        const nodes = graph.paste({offset: {dx: 0, dy: height + 10}});
        if(node.parent) {
            node.parent.addChild(nodes[0]);
        }
        graph.cleanSelection();
    }

    const onRemove = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        graph.removeNode(node);
        return false;
    }

    useEffect(() => {
        graph.on('selection:changed', onSelectionChange);
        node.on("change:attrs", onAttrsChange);
        node.on('change:data', onDataChange);
    }, []);

    const nodeProps = node.getProp().props;
    const nodeAttrs = node.getAttrs();
    const nodeData: any = node.getData() || {};
    const nodeClass = `xdb-flow-node ${selected ? 'xdb-flow-node-selected' : ''}`;
    
    const label = getLabel(nodeProps, nodeData);
    const nodeStyle = getNodeStyle(nodeAttrs);
    const headerStyle = getHeaderStyle(nodeProps, nodeAttrs);
    const titleStyle = getTitleStyle(nodeAttrs);

    const isContainer = nodeProps.embedding;
    const headerHeight = nodeAttrs?.header?.height || 30;
    const content = (<NodeMenu node={node} isContainer={isContainer} headerHeight={headerHeight} />)

    return (
        <div className={nodeClass} style={nodeStyle}>
            <div className="node-header" style={headerStyle}>
                <div className="node-title" style={titleStyle}>
                    <span>{label}</span>
                </div>
            </div>
            <div className="node-body">
                { nodeData.summary && <div className="node-summary">{nodeData.summary}</div> }
            </div>
            <div className="node-btns">
                <div className="node-btn" onClick={onCopy}>
                    <SvgIcon name="copy" />
                </div>
                <div className="node-btn" onClick={onRemove}>
                    <SvgIcon name="remove" />
                </div>
                <Popover content={content} placement="rightTop" trigger="click">
                    <div className="node-btn">
                        <SvgIcon name="menu" />
                    </div>
                </Popover>
            </div>
        </div>
    )
}