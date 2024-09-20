
import {Rankings} from './Rankings'
import themeConfig from './theme'

const icons = {
    widget: [
        "M341.333333 170.666667h568.888889v113.777777H341.333333zM113.777778 170.666667h113.777778v113.777777H113.777778zM113.777778 455.111111h113.777778v113.777778H113.777778zM113.777778 739.555556h113.777778v113.777777H113.777778zM341.333333 739.555556h568.888889v113.777777H341.333333zM341.333333 455.111111h568.888889v113.777778H341.333333z"
    ]
}

const widgetConfig = {
    name: 'rankings',
    type: 'view',
    label: '排行榜',
    iconConfig: { paths: icons.widget},
    defaultWidth: 300,
    defaultHeight: 400,
    component: Rankings,
    themes: themeConfig,
}

export default widgetConfig;