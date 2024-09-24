import React, {forwardRef, useState, useEffect} from 'react'
import { Select } from 'antd'
import { ReactSortable, GroupOptions } from "react-sortablejs";
import {SvgIcon, Modal} from '@x-designer/react-components'

export const ChartDataSource = (props) => {

    const {model} = props;
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [datasource, setDatasource] = useState(null);

    const onChange = (value, option) => {
        setDatasource(option);
        model.setData({
            ...model.data,
            datasource: {
                ...model.data.datasource,
                id: value,
            }
        });
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    useEffect(() => {
        const list = model.getDataSource();
        const {id} = model.data?.datasource || {};
        setList(list);
        if(id) {
            const datasource = list.find(item => item.id === id);
            if(datasource) setDatasource(datasource);
        }
    }, [])


    let dimensionList = null;
    let metricList = null;
    if(datasource) {
        const group:GroupOptions = {
            name: '',
            pull: 'clone',
            put: false
        }
        dimensionList = (
            <ReactSortable list={datasource.dimensions} setList={() => {}} sort={false} group={{...group, name: 'dimensions'}}>
                {
                    datasource.dimensions.map((d, idx) => {
                        return (<div key={idx} className="ds-field-item">{d.title}</div>)
                    })
                }
            </ReactSortable>
        );
        metricList = (
            <ReactSortable list={datasource.metrics} setList={() => {}} sort={false} group={{...group, name: 'metrics'}}>
                {
                    datasource.metrics.map((m, idx) => {
                        return (<div key={idx} className="ds-field-item">{m.title}</div>)
                    })
                }
            </ReactSortable>
        );
    }

    return (
        <div className="chartConfig-datasource">
            <div className="chartConfig-header">
                <div className="chartConfig-label">数据源设置</div>
            </div>
            <div className="chartConfig-body">
                <div className="ds-selector">
                    <Select
                        value={model.data?.datasource?.id}
                        allowClear
                        showSearch
                        fieldNames={{label: 'name', value: 'id'}}
                        placeholder="选择数据源"
                        optionFilterProp="name"
                        style={{ width: '100%' }}
                        onChange={onChange}
                        onSearch={onSearch}
                        options={list}
                    />
                </div>
                <div className="ds-fields">
                    <div className="ds-title">
                        <SvgIcon name="bi_ds_dimensions" size={16} />
                        维度
                    </div>
                    <div className="ds-field-list ds_dimensions">
                        {dimensionList}
                    </div>
                    <div className="ds-title">
                        <SvgIcon name="bi_ds_metrics" size={16} />
                        指标
                    </div>
                    <div className="ds-field-list ds_metrics">
                        {metricList}
                    </div>
                </div>

                {/*<div className="not-config-datasource" onClick={() => setOpen(true)}>*/}
                {/*    点击择数据源！*/}
                {/*</div>*/}

            </div>

            {/*<Modal*/}
            {/*    className="xdbi-designer-editorModal"*/}
            {/*    open={open}*/}
            {/*    title="选择数据源"*/}
            {/*    width={800}*/}
            {/*    footer={null}*/}
            {/*    onCancel={() => setOpen(false)}*/}
            {/*>*/}
            {/*    <div>选择数据源</div>*/}
            {/*</Modal>*/}
        </div>
    )
}