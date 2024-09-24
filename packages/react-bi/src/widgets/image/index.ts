import {Image} from "./Image"
import {ImageConfig} from './ImageConfig'

const icons = {
    image: [
        "M928 896H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v116.864a32 32 0 1 1-64 0V192H128v640h768V468.544l-206.336 244.736a31.968 31.968 0 0 1-44.896 4l-196.064-162.752-194.656 180.224a31.936 31.936 0 1 1-43.456-46.944l215.232-199.296a32.032 32.032 0 0 1 42.176-1.152l193.216 160.384 242.336-287.456a32.128 32.128 0 0 1 35.424-9.44c12.608 4.608 21.024 16.64 21.024 30.08V864a32 32 0 0 1-32 32z",
        "M304 480C242.24 480 192 429.76 192 368S242.24 256 304 256 416 306.24 416 368 365.76 480 304 480z m0-160c-26.464 0-48 21.536-48 48S277.536 416 304 416s48-21.536 48-48-21.536-48-48-48z"
    ]
}

const widgetConfig = {
    name: 'image',
    type: 'component',
    label: '图片',
    iconConfig: { paths: icons.image},
    defaultWidth: 200,
    defaultHeight: 200,
    component: Image,
    editComponent: ImageConfig,
    editConfig: {
        title: '图片设置',
        width: 600
    },
    themes: {},
    data: {}
}

export default widgetConfig;