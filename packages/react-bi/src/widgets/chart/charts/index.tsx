import React from 'react';
import Bar from './Bar'
import Line from './Line'
import Pie from './Pie'

const BiCharts = {
    bar: Bar,
    line: Line,
    pie: Pie,
    undefined: () => {
        return (
            <div>未定义的图表</div>
        );
    }
}

export const getBiChart = (name) => {
    return BiCharts[name] || BiCharts.undefined
}

export default BiCharts;