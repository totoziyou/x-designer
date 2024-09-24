import React, {forwardRef, useState, useEffect} from 'react'
import {PropsText, PropsSwitch, PropsRectAlign, PropsColor} from '@x-designer/react-components'

const ImageCoverOptions = [
    { label: '完全充满', value: 'cover' },
    { label: '拉伸充满', value: '100% 100%' },
    { label: '自适应充满', value: 'contain' },
]

const ImageRepeatOptions = [
    { label: '不重复', value: 'no-repeat' },
    { label: '横向铺满', value: 'repeat-x' },
    { label: '纵向铺满', value: 'repeat-y' },
    { label: '铺满', value: 'repeat' }
]

export const ImageConfig = (props) => {

    const {model} = props;
    const [data, setData] = useState(model.data)

    const onChange = (key, val) => {
        model.setData({...data, [key]: val});
        setData(model.data);
    }

    return (
        <div className="xdbi-widget-image-config">
            <PropsText title="图片地址" placeholder="请输入图片地址" cellFull value={data.url} onChange={(val) => onChange('url', val)} />
            <PropsRectAlign title="图片位置" value={data.position} onChange={(val) => onChange('position', val)}/>
            <PropsSwitch title="重复显示" options={ImageRepeatOptions} value={data.repeat} onChange={(val) => onChange('repeat', val)} />
            <PropsSwitch title="充满方式" options={ImageCoverOptions} value={data.cover} onChange={(val) => onChange('cover', val)} />
            <PropsColor title="背景颜色" value={data.bgColor} onChange={(val) => onChange('bgColor', val)} />
        </div>
    )
}