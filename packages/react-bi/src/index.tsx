import {SvgIconRegister} from '@x-designer/react-components'
import BiColorIcons from './assets/svg/color-icons'
import BiMonoIcons from './assets/svg/mono-icons'
import {BiDesigner} from './BiDesigner'
import {BiViewer} from './BiViewer'

SvgIconRegister(BiColorIcons);
SvgIconRegister(BiMonoIcons);

export default {
    BiDesigner,
    BiViewer
}