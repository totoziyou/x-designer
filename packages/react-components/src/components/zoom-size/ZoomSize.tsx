import React from 'react'
import { Select } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons'
import {mergeClass} from '@x-designer/utils';
import './ZoomSize.less'

export const ZoomSize = (props) => {

    const {scale, offset = 20, onZoom} = props;

    //TODO: 临时
    const trans = (val) => {
        return (val/100).toFixed(2);
    }

    const onChange = (value) => {
        const val = parseInt(value);
        onZoom && onZoom(trans(val));
    }

    const onMinus = () => {
        const val = scale - offset;
        onZoom && onZoom(trans(val));
    }

    const onPlus = () => {
        const val = scale + offset;
        onZoom && onZoom(trans(val));
    }

    const options = [
        { value: 100, label: '100%' },
        { value: 150, label: '150%' },
        { value: 200, label: '200%' },
    ];

    const fdx = options.find(opt => opt.value === scale);
    if(!fdx) {
        options.unshift({ value: scale, label: scale + '%'});
    }

    return (
        <div className={mergeClass("xdc-zoomsize", props.className)}>
            <div className="xdc-zoomsize-btn" onClick={onMinus}>
                <MinusOutlined className="xdc-zoomsize-minus" />
            </div>
            <Select className="xdc-zoomsize-per" style={{width:88}} value={scale} onChange={onChange} options={options} />
            <div className="xdc-zoomsize-btn" onClick={onPlus}>
                <PlusOutlined className="xdc-zoomsize-plus" />
            </div>
        </div>
    )

}