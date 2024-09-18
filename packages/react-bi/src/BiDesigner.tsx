import React, {forwardRef, useState, useEffect} from 'react'
import BiModel from './model/BiModel'
import {NavBar} from './components/NavBar'
import {SideBar} from './components/SideBar'
import {MainView} from './components/MainView'
import './assets/less/BiDesigner.less'

export const BiDesigner = () => {

    const [model, setModel] = useState(null);

    useEffect(() => {
        const config = {};
        const data = [
            // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
            // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            // { i: "c", x: 4, y: 0, w: 1, h: 2 }
        ];
        setModel(new BiModel(config, data));
    }, [])

    if(model) {
        return (
            <div className="xdbi-designer">
                <div className="xdbi-designer-header">
                    <NavBar />
                </div>
                <div className="xdbi-designer-body">
                    <SideBar model={model} />
                    <MainView model={model} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="xdbi-designer">
                正在初始化...
            </div>
        )
    }

}