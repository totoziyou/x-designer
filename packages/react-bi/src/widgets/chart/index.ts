import Chart from './Chart'
import {ChartConfig} from './config/ChartConfig'
import './icons'

const icons = {
    chart: [
        "M896 480c-1.344 0-2.464 0.608-3.744 0.768-1.28-0.16-2.432-0.768-3.744-0.768H544V132c0-0.704-0.352-1.312-0.416-2.016 0.064-0.672 0.416-1.28 0.416-1.984a32 32 0 0 0-32-32C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416a32 32 0 0 0-32-32zM512 864C317.92 864 160 706.08 160 512 160 328.704 300.864 177.856 480 161.632V512a32 32 0 0 0 32 32h350.368C846.144 723.136 695.296 864 512 864zM625.664 178.72a355.36 355.36 0 0 1 216.832 211.84 32 32 0 1 0 60.064-22.048 414.24 414.24 0 0 0-256.224-250.336 31.968 31.968 0 1 0-20.672 60.544z"
    ],
    datesource: [
        "M958.368 226.72C951.168 117.024 757.984 32 512 32S72.8 117.024 65.632 226.72h-0.704v564.16C64.928 903.616 261.248 992 512 992c250.72 0 447.072-88.384 447.072-201.088V226.72h-0.704zM512 99.68c224.128 0 375.712 69.92 381.472 141.984C887.776 313.792 736.128 383.648 512 383.648c-224.16 0-375.712-69.856-381.472-141.92C136.224 169.6 287.84 99.712 512 99.712v-0.032z m0 824.544c-228.512 0-382.016-72.64-382.016-146.144V632.416C207.712 690.112 348 728 512 728s304.288-37.888 382.016-95.584V778.08c0 73.504-153.536 146.144-382.016 146.144z m382.016-420.896v10.752c0 73.536-153.568 146.144-382.016 146.144-228.512 0-382.016-72.576-382.016-146.08V355.84C207.744 413.472 348 451.424 512 451.424s304.288-37.888 382.016-95.584v147.488z m0 0"
    ],
    config: [
        "M928 800H508c-14.2-55.2-64.3-96-124-96-59.6 0-109.8 40.8-124 96H96c-17.7 0-32 14.3-32 32 0 17.7 14.3 32 32 32h164c14.2 55.2 64.3 96 124 96 59.6 0 109.8-40.8 124-96h420c17.7 0 32-14.3 32-32C960 814.3 945.7 800 928 800zM384 897c-35.9 0-65-29.1-65-65s29.1-65 65-65 65 29.1 65 65S419.9 897 384 897z",
        "M928 480H764c-14.2-55.2-64.3-96-124-96s-109.8 40.8-124 96H96c-17.7 0-32 14.3-32 32 0 17.7 14.3 32 32 32h420c14.2 55.2 64.3 96 124 96s109.8-40.8 124-96h164c17.7 0 32-14.3 32-32C960 494.3 945.7 480 928 480zM640 577c-35.9 0-65-29.1-65-65s29.1-65 65-65 65 29.1 65 65S675.9 577 640 577z",
        "M96 224h164c14.2 55.2 64.3 96 124 96 59.6 0 109.8-40.8 124-96h420c17.7 0 32-14.3 32-32 0-17.7-14.3-32-32-32H508c-14.2-55.2-64.3-96-124-96-59.6 0-109.8 40.8-124 96H96c-17.7 0-32 14.3-32 32C64 209.7 78.3 224 96 224zM384 127c35.9 0 65 29.1 65 65s-29.1 65-65 65-65-29.1-65-65S348.1 127 384 127z"
    ]
}

const widgetConfig = {
    name: 'chart',
    label: '图表',
    type: 'view',
    component: Chart,
    categoryPath: '',
    iconConfig: { paths: icons.chart},
    defaultWidth: 500,
    defaultHeight: 300,
    minWidth: 200,
    minHeight: 100,
    editComponent: ChartConfig,
    editConfig: {
        title: '图表设置',
        fullScreen: true,
        width: 800
    },
    themes: {},
    configOptions: {
        types: [
            {name: 'line', label: '折线图'}
        ]
    },
    data: {
        type: null,
        datasource: null,
    },
    // extMenus: [
    //     {
    //         name: 'datasource',
    //         label: '编辑数据源',
    //         iconConfig: { paths: icons.datesource},
    //         action: (model) => {
    //             model.emit('dataSourceModal', true)
    //         }
    //     },
    //     {
    //         name: 'config',
    //         label: '设置',
    //         iconName: 'bi_widget_config',
    //         action: (model) => {
    //             model.emit('configModal', true)
    //         }
    //     }
    // ],
    afterDrop: (model) => {
        model.edit();
        // model.emit('dataSourceModal', true)
    }
}

export default widgetConfig;