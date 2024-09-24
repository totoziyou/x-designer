import React from 'react'

export const PropsEditorWrap = (props) => {

    const {title, className, cellFull, children} = props;
    const warpClass = ['xdc-props-editor', className].join(' ');
    const cellClass = `editor-cell ${cellFull ? 'editor-cell-full' : ''}`

    return (
        <div className={warpClass}>
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className={cellClass}>
                    {children}
                </div>
            </div>
        </div>
    )


}