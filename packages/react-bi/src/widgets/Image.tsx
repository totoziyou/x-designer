import React, {forwardRef, useState, useEffect} from 'react'
import './Image.less'

const Image = (props) => {

    return (
        <div className="xdbi-widget xdbi-widget-image">
            <img src="http://img.netbian.com/file/2024/0618/small234207dJDho1718725327.jpg" />
        </div>
    )

}

export default {
    name: 'image',
    type: 'component',
    categoryPath: '',
    label: '图片',
    defaultWidth: 200,
    defaultHeight: 200,
    component: Image,
}