import React from 'react'

export const PropsEditorWrap = (props) => {

    const {title, className, children} = props;
    const warpClass = ['xdc-props-editor', className].join(' ');

    return (
        <div className={warpClass}>
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className="editor-cell">
                    {children}
                </div>
            </div>
        </div>
    )


}