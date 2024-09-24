import React, {forwardRef, useState, useEffect} from 'react'
import './Image.less'

export const Image = (props) => {

    const {model} = props;
    const [data, setData] = useState(model.data);

    useEffect(() => {
        model.on('dataChange', (val) => {
            setData(val);
        })
    }, [])

    let showImage;
    if(data.url) {
        const style: any = {
            width: '100%',
            height: '100%',
            backgroundImage: `url(${data.url})`,
            backgroundRepeat: data.repeat || 'no-repeat',
            backgroundPosition: data.position || 'left top',
            backgroundSize: data.cover || '',
            backgroundColor: data.bgColor || 'transparent',
        }
        showImage = (<div style={style}></div>)
    }
    else {
        showImage = '请设置图片地址'
    }

    return (
        <div className="xdbi-widget xdbi-widget-image">
            { showImage }
        </div>
    )

}