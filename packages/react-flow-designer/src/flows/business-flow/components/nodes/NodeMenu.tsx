import React, {useRef, useState, useEffect} from 'react'

export const NodeMenu = (props) => {

    const {node, isContainer, headerHeight} = props;

    const getSubNodes = () => {
        if(node.children && node.children.length > 0) {
            return node.children.filter(child => child.isNode());
        }
        return [];
    }
    
    const onSetIndex = (type) => {
        if(type === 'up') {
            node.setProp({ zIndex: node.zIndex + 1 })
        }
        else if(type === 'down') {
            node.setProp({ zIndex: node.zIndex - 1})
        }
        else if(type === 'top') {
            node.toFront();
        }
        else if(type === 'bottom') {
            node.toBack();
        }
    }
    
    const onSetAlign = (type) => {
        const children = getSubNodes();
        if(children && children.length > 0) {
            let lx, rx, ty, by;
            children.forEach(child => {
                const pos = child.position();
                const size = child.size();
                if(!lx) lx = pos.x;
                if(!rx) rx = pos.x + size.width;
                if(!ty) ty = pos.y;
                if(!by) by = pos.y + size.height;
                lx = Math.min(pos.x, lx);
                rx = Math.max(pos.x + size.width, rx);
                ty = Math.min(pos.y, ty);
                by = Math.max(pos.y + size.height, ty);
            });
            const {x, y} = node.position();
            const {width, height} = node.size();
            children.forEach(child => {
                const pos = child.position();
                const size = child.size();
                if(type === 'left') {
                    child.position(lx, pos.y);
                }
                else if(type === 'center') {
                    child.position(x + width/2 - size.width/2, pos.y);
                }
                else if(type === 'right') {
                    child.position(rx - size.width, pos.y);
                }
                else if(type === 'top') {
                    child.position(pos.x, ty);
                }
                else if(type === 'middle') {
                    child.position(pos.x, y + height/2 + headerHeight/2 - size.height/2);
                }
                else if(type === 'bottom') {
                    child.position(pos.x, by - size.height);
                }
            });
        }
    }
    
    const onArrange = (type) => {
        const children = getSubNodes();
        if(children && children.length > 0) {
            const {x, y} = node.position();
            const {width, height} = node.size();
            if(type === 'row') {
                children.sort((a, b) => a.position().x - b.position().x);
                let childrenWidth = 0;
                children.forEach(child => {
                    childrenWidth = childrenWidth + child.size().width;
                });
                const emptyWidth = width - 20 - childrenWidth;
                const gap = emptyWidth > 0 ? Math.floor(emptyWidth / (children.length - 1)) : 0;
                let offsetX = x + 10;
                let offsetY = y + headerHeight + 10;
                children.forEach(child => {
                    child.position(offsetX, offsetY);
                    offsetX = offsetX + child.size().width + gap;
                });
            }
            else {
                children.sort((a, b) => a.position().y - b.position().y);
                let childrenHeight = 0;
                children.forEach(child => {
                    childrenHeight = childrenHeight + child.size().height;
                });
                const emptyHeight = height - headerHeight - childrenHeight;
                const gap = emptyHeight > 0 ? Math.floor(emptyHeight / (children.length + 1)) : 0;
                let offsetY = y + headerHeight + gap;
                children.forEach(child => {
                    const nx = x + width/2 - child.size().width/2;
                    child.position(nx, offsetY);
                    offsetY = offsetY + child.size().height + gap;
                });
            }
        }
    }

    return (
        <div className="xdb-flow-node-menu">
            <div className="node-menu">
                <div onClick={() => onSetIndex('up')}>上移</div>
                <div onClick={() => onSetIndex('down')}>下移</div>
                <div onClick={() => onSetIndex('top')}>移到顶层</div>
                <div onClick={() => onSetIndex('bottom')}>移到底层</div>
            </div>
            {
                isContainer && (
                    <>
                        <div className="node-menu-split"></div>
                        <div className="node-menu">
                            <div onClick={() => onSetAlign('left')}>左对齐</div>
                            <div onClick={() => onSetAlign('center')}>水平居中</div>
                            <div onClick={() => onSetAlign('right')}>右对齐</div>
                            <div onClick={() => onSetAlign('top')}>顶端对齐</div>
                            <div onClick={() => onSetAlign('middle')}>垂直居中</div>
                            <div onClick={() => onSetAlign('bottom')}>底端对齐</div>
                        </div>
                        <div className="node-menu-split"></div>
                        <div className="node-menu">
                            <div onClick={() => onArrange('row')}>横向分布</div>
                            <div onClick={() => onArrange('column')}>纵向分布</div>
                        </div>
                    </>
                )
            }
        </div>
    )

}