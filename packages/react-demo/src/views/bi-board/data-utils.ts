
import data1 from './board-data/data1'
import data2 from './board-data/data2'
import ds_chart from './datasource/data-chart'
import pieData from './data/pie'
import lineData from './data/line'
import barData from './data/bar'


export const dataList = [
    { id: 1, label: '测试数据1', data: data1 },
    { id: 2, label: '测试数据2', data: data2 }
];

export const dataSourceMap = {
    pie: pieData,
    line: lineData,
    bar: barData
}

export const dataMap = {
    pie: pieData,
    line: lineData,
    bar: barData
}

export const getDataSource = (widget, params) => {
    if(widget === 'chart') {
        return ds_chart
    }
}

export const getData = (widget, params) => {
    if(widget === 'chart') {
        const type = params.type;
        return dataMap[type]
    }
}