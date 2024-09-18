import React, {useRef} from 'react'
import BI from '@x-designer/react-bi'
import './BiBoard.less'

export const BiBoard = () => {

    return (
        <div className="x-framework-page xbi-board">
            <div className="xb-flow-header">
                BI数据可视化
            </div>
            <div className="xb-flow-body">
                <div className="xb-flow-list">
                    <div className="xb-flow-list-header">Board列表</div>
                </div>
                <div className="xb-flow-designer">
                    <BI.BiDesigner />
                </div>
            </div>
        </div>
    )

}