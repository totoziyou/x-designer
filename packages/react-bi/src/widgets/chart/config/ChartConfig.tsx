import React, {forwardRef, useState, useEffect} from 'react'
import {ChartDataSource} from './ChartDataSource'
import {ChartParams} from './ChartParams'
import {ChartTypes} from './ChartTypes'
import {ChartProps} from './ChartProps'
import {getBiChart} from "../charts";

export const ChartConfig = (props) => {

    const {model} = props;
    const [data, setData] = useState(model.data);

    useEffect(() => {
        model.on('dataChange', (data) => {
            setData(data);
        })
    }, [])

    const onChange = (key, val) => {
        model.setData({...data, [key]: val});
        setData(model.data);
    }

    const ChartComp = (data.type) ? getBiChart(data.type) : () => (<div className="no-config-chart">请选择数据源和图表类型</div>);

    return (
        <div className="xdbi-widget-chartConfig">
            <ChartDataSource model={model} />
            <div className="chartConfig-main">
                <ChartParams type={data.type} params={data.params} onChange={(val) => onChange('params', val)}/>
                <div className="chartConfig-show">
                    <div className="chartConfig-header">
                        <div className="chartConfig-label">图表展示</div>
                    </div>
                    <div className="chartConfig-body">
                        <ChartComp />
                    </div>
                </div>
            </div>
            <div className="chartConfig-side">
                <ChartTypes type={data.type} onChange={(val) => onChange('type', val)} />
                <ChartProps type={data.type} />
            </div>
        </div>
    )
}