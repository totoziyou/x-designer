import React, {forwardRef, useState, useEffect} from 'react'
import GridLayout from "react-grid-layout"
import {DragMask} from './DragMask'
import {Item} from './Item'
import '../../node_modules/react-grid-layout/css/styles.css'
// import '../../node_modules/react-resizable/css/styles.css'

export const MainView = (props) => {

    const {model} = props;

    const [layout, setLayout] = useState(model.layout);
    const [config, setConfig] = useState(model.config);
    const [theme, setTheme] = useState(model.theme);
    
    useEffect(() => {
        model.on('itemsChanged', (item) => {
            // console.info('itemsChanged', item);
            setLayout(model.layout);
        })
        model.on('gridLayoutConfigChanged', newConfig => {
            setConfig(newConfig)
        })
        model.on('themeChange', () => {
            setTheme(model.theme);
        })
    }, []);

    const onLayoutChange = (layout) => {
        console.info('---onLayoutChange', layout);
        model.setGridLayout(layout);
    }
    
    const onDropDragOver = (evt) => {
        console.info('--eee', evt);
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

    const gridLayoutStyle = {
        width: config.containerWidth,
        background: theme.bg,
    }

    return (
        <div className="xdbi-designer-main">
            <div className="xdbi-designer-absLayout">
                {/*<div className="absLayout-item" style={{left:300, top:300}}></div>*/}
            </div>
            <GridLayout
                className="xdbi-designer-gridLayout"
                style={gridLayoutStyle}
                layout={layout}
                cols={config.cols}
                rowHeight={config.rowHeight}
                width={config.containerWidth}
                margin={config.margin}
                compactType='vertical'
                useCSSTransforms
                isDraggable
                isResizable
                onLayoutChange={onLayoutChange}
                onDropDragOver={onDropDragOver}
            >
                {items}
            </GridLayout>
            <DragMask model={model} />
        </div>
    )

}