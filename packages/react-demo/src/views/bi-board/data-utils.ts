
import data1 from './data/data1'
import data2 from './data/data2'
import pieData from './data/datasource-pie'
import lineData from './data/datasource-line'

export const dataList = [
    { id: 1, label: '测试数据1', data: data1 },
    { id: 2, label: '测试数据2', data: data2 }
];

export const dataSourceMap = {
    pie: pieData,
    line: lineData,
}

export const getDataSource = (widget, params) => {
    if(widget === 'chart') {
        const type = params.type;
        return dataSourceMap[type]
    }
}