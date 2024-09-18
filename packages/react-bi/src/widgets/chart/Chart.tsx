import React, {forwardRef, useState, useEffect} from 'react'
import BiCharts from './charts'
import './Chart.less'

const Chart = (props) => {

    const {model} = props;

    const chartType = model.data.type;
    const ChartComp = BiCharts[chartType];

    return (
        <div className="xdbi-widget xdbi-widget-chart">
            <ChartComp />
        </div>
    )

}

const ChartDataSource = (props) => {
    return (
        <div>数据源设置</div>
    )
}

export default {
    name: 'chart',
    type: 'view',
    categoryPath: '',
    label: '图表',
    defaultWidth: 500,
    defaultHeight: 300,
    component: Chart,
    configOptions: {
        types: [
            {name: 'line', label: '折线图'}
        ]
    },
    data: {
        type: 'line',
        datasource: null,
    },
    afterAddDrop: () => {

    }
}