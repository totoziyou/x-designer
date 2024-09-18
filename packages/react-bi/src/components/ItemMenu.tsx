import React, {forwardRef, useState, useEffect} from 'react'
import {getWidget} from '../widgets'

export const ItemMenu = (props) => {

    return (
        <div className="xdbi-widget-menu">
            <div className="menu-item">复制</div>
            <div className="menu-item">删除</div>
            <div className="menu-item">编辑</div>
        </div>
    )

}