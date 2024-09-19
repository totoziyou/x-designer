import React, {forwardRef, useState, useEffect, useRef} from 'react'
import BiModel from './model/BiModel'
import {NavBar} from './components/NavBar'
import {SideBar} from './components/SideBar'
import {MainView} from './components/MainView'
import './assets/less/BiDesigner.less'

export const BiDesigner = (props) => {

    const [model, setModel] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const {data, getDataSource} = props;
        const dom = containerRef.current;
        const gridLayoutConfig = {
            ...data.gridLayoutConfig,
            containerWidth: dom.clientWidth - 50
        };
        const options = {
            theme: data.theme,
            gridLayoutConfig,
            getDataSource,
            items: data.items,
        }
        setModel(new BiModel(options));
    }, [])

    const content = model ? (
        <>
            <div className="xdbi-designer-header">
                <NavBar model={model} />
            </div>
            <div className="xdbi-designer-body">
                <SideBar model={model} />
                <MainView model={model} />
            </div>
        </>
    ) : '正在初始化...';

    return (
        <div ref={containerRef} className="xdbi-designer">
            {content}
        </div>
    )

}