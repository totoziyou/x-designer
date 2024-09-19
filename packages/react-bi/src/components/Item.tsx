import React, {forwardRef, useState, useEffect} from 'react'
import {ItemMenu} from './ItemMenu'

export const Item = (props) => {

    const {data, model} = props;

    if(model) {
        const Widget = model.getWidget();
        return (
            <div key={data.i} className="xdbi-widget-wrapper">
                <Widget model={model} />
                <ItemMenu model={model} />
            </div>
        )
    }

    return null;

}