import React, {useRef, useState} from 'react'
import BI from '@x-designer/react-bi'
import {dataList, getDataSource, getData} from "./data-utils";
import './BiBoard.less'

export const BiBoard = () => {

    const [data, setData] = useState(dataList[0]);
    
    const listItems = dataList.map(item => {
        return (
            <div key={item.id} className='xbi-board-list-item' onClick={() => setData(JSON.parse(JSON.stringify(item)))}>
                {item.label}
            </div>
        )
    });

    return (
        <div className="x-framework-page xbi-board">
            <div className="xbi-board-header">
                BI数据可视化
            </div>
            <div className="xbi-board-body">
                <div className="xbi-board-list">
                    <div className="xbi-board-list-header">Board列表</div>
                    <div>
                        {listItems}
                    </div>
                </div>
                <div className="xbi-board-designer">
                    <BI.BiDesigner
                        key={'xbi-' + data.id}
                        data={data.data}
                        getDataSource={getDataSource}
                        getData={getData}
                    />
                </div>
            </div>
        </div>
    )

}