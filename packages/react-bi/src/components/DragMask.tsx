import React, {forwardRef, useState, useEffect} from 'react'

export const DragMask = (props) => {

    const {model} = props;
    const [open, setOpen] = useState(false);

    const style = open ? {right: 0, bottom: 0} : {width: 0, height: 0}

    const onDragOver = (evt) => {
        evt.preventDefault();
        const {clientX, clientY, currentTarget} = evt;
        const {x, y, width} = currentTarget.getBoundingClientRect();
        model.dragOver({
            x: clientX - x,
            y: clientY - y,
            max: width,
        });
    }

    const onDrop = (evt) => {
        model.drop();
    }

    useEffect(() => {
        model.on('dragNewStart', () => {
            setOpen(true);
        })
        model.on('dragEnd', () => {
            setOpen(false);
        })
    }, [])

    return (
        <div className="xdbi-designer-dragMask" style={style} onDragOver={onDragOver} onDrop={onDrop} />
    )
}