import React, {forwardRef, useState, useEffect} from 'react'
import {SvgIcon} from '@x-designer/react-components'

const ChartTypeDefs = [
    {name:'pie', label: '饼图'},
    {name:'line', label: '折线图'},
    {name:'bar', label: '柱状图'}
]

export const ChartTypes = (props) => {

    const {type, onChange} = props;
    console.info('tttt', type);

    const typeItems = ChartTypeDefs.map(def => {
        const iClass = `chartConfig-type-item ${def.name === type ? 'chartConfig-type-selected' : ''}`
        return (
            <div key={def.name} className={iClass} onClick={() => onChange(def.name)}>
                <SvgIcon name={'bi_chart_' + def.name} size={24} />
                <span>{def.label}</span>
            </div>
        )
    });

    return (
        <div className="chartConfig-types">
            <div className="chartConfig-header">
                <div className="chartConfig-label">图表类型</div>
            </div>
            <div className="chartConfig-types-body">
                {typeItems}
            </div>
        </div>
    )
}