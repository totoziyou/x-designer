import React, {forwardRef, useState, useEffect} from 'react'
import GridLayout from "react-grid-layout"
import {Item} from './Item'
import '../../node_modules/react-grid-layout/css/styles.css'
// import '../../node_modules/react-resizable/css/styles.css'

export const MainView = (props) => {

    const {model} = props;

    const [layout, setLayout] = useState(model.layout);
    
    useEffect(() => {
        // model.on('addItem', () => {
        //     console.info('addItem', model.layout);
        //     setLayout(model.layout);
        // })
        model.on('itemsChanged', (item) => {
            console.info('itemsChanged', item);
            setLayout(model.layout);
        })
        model.on('moveItem', (item) => {
            // console.info('moveItem', item);
            setLayout(model.layout);
        })
    }, []);

    const onLayoutChange = (layout) => {
        // console.info('---onLayoutChange', layout);
    }
    
    const onDropDragOver = (evt) => {
        console.info('--eee', evt);
    }

    const onDragOver = (evt) => {
        evt.preventDefault();
        const {clientX, clientY, currentTarget} = evt;
        const {x, y, width} = currentTarget.getBoundingClientRect();
        model.dragOver({
            x: clientX - x,
            y: clientY - y,
            max: width,
        });
        // model.dragOver(evt);
    }

    const onDrop = (evt) => {
        console.info('onDrop ---------');
        model.drop();
    }

    const items = layout.map(item => {
        const itemModel = model.getItem(item.i);
        return (
            <div key={item.i} style={{background: "#ffffff"}}>
                <Item data={item} model={itemModel} />
            </div>
        )
    });

    // console.info('render', layout);

    const {cols, rowHeight, margin, containerWidth} = model.config;

    return (
        <div className="xdbi-designer-main" onDragOver={onDragOver} onDrop={onDrop}>
            <div className="xdbi-designer-absLayout">
                {/*<div className="absLayout-item" style={{left:300, top:300}}></div>*/}
            </div>
            <GridLayout
                layout={layout}
                cols={cols}
                rowHeight={rowHeight}
                width={containerWidth}
                margin={margin}
                compactType='vertical'
                useCSSTransforms
                isDraggable
                isResizable
                onLayoutChange={onLayoutChange}
                onDropDragOver={onDropDragOver}
            >
                {items}
            </GridLayout>
        </div>
    )

}