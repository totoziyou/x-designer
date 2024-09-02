import React, {useRef} from 'react'
import ReactFlowDesigner from '@x-designer/react-flow-designer'
import './FlowDesigner.less'

export const FlowDesigner = () => {

    const flowRef = useRef(null);

    const onLogData = () => {
        console.info(flowRef.current.getData());
    }

    return (
        <div className="x-framework-page x-flow-designer">
            <div className="x-flow-designer-header">
                流程图设计
                <span onClick={onLogData}>查看数据</span>
            </div>
            <div className="x-flow-designer-body">
                <ReactFlowDesigner ref={flowRef} />
            </div>
        </div>
    )

}