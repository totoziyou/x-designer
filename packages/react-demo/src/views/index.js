
import {Welcome} from './welcome/Welcome'
import {MetaModel} from './meta-model/MetaModel'
import {BusinessFlow} from './flows/BusinessFlow'
import {BiBoard} from './bi-board/BiBoard'
import {XComponents} from './x-components/XComponents'

export default {
    Welcome: {
        menuLabel: '主页',
        view: Welcome,
    },
    MetaModel: {
        menuLabel: '元数据建模',
        view: MetaModel,
    },
    BusinessFlow: {
        menuLabel: '流程图',
        view: BusinessFlow,
    },
    BiBoard: {
        menuLabel: '数据大屏',
        view: BiBoard,
    },
    XComponents: {
        menuLabel: '组件',
        view: XComponents,
    }
}