import React from 'react'
import './Rankings.less'

const Rankings = (props) => {

    return (
        <div className="xdbi-widget xdbi-widget-rankings">
            排行榜
        </div>
    )

}

export default {
    name: 'rankings',
    type: 'view',
    label: '排行榜',
    defaultWidth: 300,
    defaultHeight: 400,
    component: Rankings,
}