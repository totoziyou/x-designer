import React, {forwardRef, useState, useEffect} from 'react'
import { ReactSortable, GroupOptions } from "react-sortablejs";
import {SvgIcon, Modal} from '@x-designer/react-components'

const Keys = {
    x: {name: 'xField', label: 'x轴', put: ['dimensions'], isMulti: false},
    y: {name: 'yField', label: 'y轴', put: ['metrics'], isMulti: false},
}

const ParamDefs = {
    line: [Keys.x, Keys.y]
}

const ChartParamsRow = (props) => {

    const {values, name, label, put, isMulti, onChange} = props;
    const [list, setList] = useState(values);

    const onSort = (evt) => {
        const values = list.map(item => { return {name: item.name, title: item.title}});
        if(isMulti) {
            onChange(values);
        }
        else {
            onChange(values[0]);
        }
    }

    const onRemove = (idx, item) => {
        list.splice(idx, 1);
        setList([...list]);
    }

    return (
        <div className="params-row">
            <div className="params-label">{label}</div>
            <ReactSortable className="params-container" list={list} setList={setList} group={{name, pull: false, put: put}} onSort={onSort} >
                {
                    list.map((d, idx) => {
                        return (
                            <div key={idx} className="params-item">
                                <span>{d.title}</span>
                                <SvgIcon name="remove" size={16} onClick={() => onRemove(idx, d)} />
                            </div>
                        )
                    })
                }
            </ReactSortable>
        </div>
    )

}

export const ChartParams = (props) => {

    const {params, onChange} = props;

    const onRowChange = (paramDef, val) => {
        onChange({
            ...params,
            [paramDef.name]: val,
        });
    }

    const paramRows = ParamDefs.line.map(def => {
        const values = def.isMulti ? params[def.name] : [params[def.name]];
        return (<ChartParamsRow key={def.name} {...def} values={values} onChange={val => onRowChange(def, val)} />)
    });

    return (
        <div className="chartConfig-params">
            <div className="chartConfig-header">
                <div className="chartConfig-label">关键参数</div>
            </div>
            <div className="chartConfig-body">
                {paramRows}
            </div>
        </div>
    )

}