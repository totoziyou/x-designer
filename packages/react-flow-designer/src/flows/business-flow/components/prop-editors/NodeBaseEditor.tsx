import React, {useRef, useState, useEffect} from 'react'
import {PropsText} from '@x-designer/react-components'

export const NodeBaseEditor = (props) => {

    const {node} = props;
    const [data, setData] = useState(node.getData() || {});

    console.info('ssss', data);

    useEffect(() => {
        node.on("change:data", ({current}) => {
            setData(node.getData());
        });
    }, [])

    return (
        <div className="props-group">
            <div className="props-group-header">基本信息</div>
            <div className="props-group-body">
                <PropsText title="标题文字" value={data.label} />
                <PropsText title="前缀序号" value={data.idx} />
            </div>
        </div>
    )

}