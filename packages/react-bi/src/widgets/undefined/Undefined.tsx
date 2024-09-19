import React from 'react'
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
    name: 'default',
    type: 'none',
    label: '未定义',
    defaultWidth: 200,
    defaultHeight: 300,
    component: Undefined,
}