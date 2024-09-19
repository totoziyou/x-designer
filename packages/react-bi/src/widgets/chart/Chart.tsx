import React, {forwardRef, useState, useEffect} from 'react'
import {Modal} from '@x-designer/react-components'
import BiCharts from './charts'
import {ChartDataSource} from './ChartDataSource'
import {ChartConfig} from './ChartConfig'
import './Chart.less'

const Chart = (props) => {

    const {model} = props;

    const [dataSourceModal, setDataSourceModal] = useState(false);
    const [config, setConfig] = useState(false);

    const chartType = model.data.type;
    const ChartComp = chartType ? BiCharts[chartType] : () => (<div className="no-config-chart">请选择数据源和图表类型</div>);


    useEffect(() => {
        model.on('dataSourceModal', (val) => {
            setDataSourceModal(val)
        });
        model.on('config', (val) => {
            setConfig(val)
        })
    }, [])

    return (
        <div className="xdbi-widget xdbi-widget-chart">
            <ChartComp />
            {
                dataSourceModal && (
                    <Modal
                        open
                        title="选择数据源"
                        onCancel={() => setDataSourceModal(false)}
                        onSubmit={() => setDataSourceModal(false)}
                    >
                        <ChartDataSource />
                    </Modal>
                )
            }
            {
                config && (
                    <Modal
                        open
                        title="设置"
                        onCancel={() => setConfig(false)}
                        onSubmit={() => setConfig(false)}
                    >
                        <ChartConfig />
                    </Modal>
                )
            }
        </div>
    )

}

export default Chart;