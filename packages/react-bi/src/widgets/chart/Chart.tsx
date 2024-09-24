import React, {forwardRef, useState, useEffect} from 'react'
import {getBiChart} from './charts'
import './Chart.less'

const Chart = (props) => {

    const {model} = props;
    const [data, setData] = useState(model.data);

    const {type, datasource} = model.data;
    const ChartComp = (type) ? getBiChart(type) : () => (<div className="no-config-chart" onClick={() => model.edit()}>请选择数据源和图表类型</div>);


    useEffect(() => {
        model.on('dataChange', (val) => {
            setData(val);
        })
        setTimeout(() => {
            model.edit();
        }, 1000)
    }, [])

    return (
        <div className="xdbi-widget xdbi-widget-chart">
            <ChartComp />
        </div>
    )

}

export default Chart;