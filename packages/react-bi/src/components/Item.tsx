import React, {forwardRef, useState, useEffect} from 'react'
import {getWidget} from '../widgets'
import {ItemMenu} from './ItemMenu'

export const Item = (props) => {

    const {data, model} = props;

    const Widget = getWidget(model.type);

    return (
        <div key={data.i} className="xdbi-widget-wrapper">
            <Widget.component model={model} config={Widget} />
            <ItemMenu />
        </div>
    )

}