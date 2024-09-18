import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'
import './Undefined.less'

const Undefined = (props) => {

    return (
        <div className="xdbi-widget xdbi-widget-undefined">
            <SvgIcon name="bi_widget_undefined" />
            未定义的Widget
        </div>
    )

}

export default {
    type: 'default',
    component: Undefined,
}