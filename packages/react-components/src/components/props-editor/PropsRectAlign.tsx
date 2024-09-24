import React from 'react'
import {PropsEditorWrap} from './PropsEditorWrap'

const RectAlignBlocks = [
    {id: 1, value: 'left top'},
    {id: 2, value: 'center top'},
    {id: 3, value: 'right top'},
    {id: 4, value: 'left center'},
    {id: 5, value: 'center center'},
    {id: 6, value: 'right center'},
    {id: 7, value: 'left bottom'},
    {id: 8, value: 'center bottom'},
    {id: 9, value: 'right bottom'},
];

export const PropsRectAlign = (props) => {

    const {value, onChange, title} = props;

    const blocks = RectAlignBlocks.map(item => {
        const iClass = `rectAlgin-block ${value === item.value ? 'rectAlgin-block-selected' : ''}`
        return (
            <div key={item.id} className={iClass} onClick={() => onChange(item.value)}></div>
        )
    });

    return (
        <PropsEditorWrap className="xdc-rectAlign-props-editor" title={title}>
            <div className="rectAlign-container">
                <div className="rectAlign-x-labels">
                    <div>左</div>
                    <div>中</div>
                    <div>右</div>
                </div>
                <div className="rectAlign-blocks">
                    {blocks}
                </div>
                <div className="rectAlign-y-labels">
                    <div>上</div>
                    <div>中</div>
                    <div>下</div>
                </div>
            </div>
        </PropsEditorWrap>
    )

}