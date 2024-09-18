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
    type: 'image',
    component: Image,
}