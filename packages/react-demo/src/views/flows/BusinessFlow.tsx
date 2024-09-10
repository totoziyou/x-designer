import React, {useRef, useState} from 'react'
import Flows from '@x-designer/react-flow-designer'
import {listData} from './data/list-data'
import './BusinessFlow.less'

export const BusinessFlow = () => {

    const flowRef = useRef(null);
    const [index, setIndex] = useState(0);

    const onLogData = () => {
        console.info(flowRef.current.getData());
    }

    const listItems = listData.map((data: any, idx) => {
        return (
            <div key={idx} className="xb-flow-list-item" onClick={() => setIndex(idx)}>
                {data.label}
            </div>
        )
    });

    return (
        <div className="x-framework-page xb-flow">
            <div className="xb-flow-header">
                流程图设计
            </div>
            <div className="xb-flow-body">
                <div className="xb-flow-list">
                    <div className="xb-flow-list-header">数据列表</div>
                    {listItems}
                </div>
                <div className="xb-flow-designer">
                    <Flows.BusinessFlow ref={flowRef} key={index} data={listData[index].data} />
                </div>
            </div>
        </div>
    )

}