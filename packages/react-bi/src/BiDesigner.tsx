import React, {forwardRef, useState, useEffect, useRef} from 'react'
import BiModel from './model/BiModel'
import {NavBar} from './components/NavBar'
import {SideBar} from './components/SideBar'
import {MainView} from './components/MainView'
import './assets/less/BiDesigner.less'

export const BiDesigner = (props) => {

    const {data} = props;
    const [model, setModel] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const dom = containerRef.current;
        const config = {
            gridLayoutConfig: {
                containerWidth: dom.clientWidth - 50
            }
        };
        const data = [
            // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
            // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            // { i: "c", x: 4, y: 0, w: 1, h: 2 }
        ];
        setModel(new BiModel(config, data));
    }, [])

    const content = model ? (
        <>
            <div className="xdbi-designer-header">
                <NavBar />
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