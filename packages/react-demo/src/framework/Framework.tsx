import React, {useState} from 'react';
import {Menu} from './Menu'
import {Page404} from './Page404'
import './Framework.less'

export const Framework = (props: any) => {

    const [viewName, setViewName] = useState(props.default || 'welcome');

    const ViewComp = props.views[viewName]?.view || Page404;

    const onMenuClick = (menuName) => {
        menuName && props.views[menuName] && setViewName(menuName);
    }

    return (
        <div className="x-framework">
            <header className="x-framework-header flexRowCenter">
                top-menu
                <Menu config={props.views} onClick={onMenuClick} />
            </header>
            <section className="x-framework-body">
                <ViewComp />
            </section>
        </div>
    )

}