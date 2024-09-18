import {EventBus, uuid} from '@x-designer/utils'

export default class BiItemModel {

    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    isLocked: boolean;

    isDummy: boolean;
    sourceItem: any;

    constructor(sourceItem, isDummy = false) {
        const {type, x, y, w, h, defaultWidth, defaultHeight} = sourceItem;
        this.id = uuid();
        this.sourceItem = sourceItem;
        this.type = type;
        this.isLocked = false;
        this.isDummy = isDummy;
        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 1;
        this.height = h || 1;
    }

    getLayout() {
        const result: any = {
            i: this.id,
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height,
            isDummy: this.isDummy,
            static: this.isLocked,
        };
        if(this.minWidth) result.minW = this.minWidth;
        if(this.maxWidth) result.maxW = this.maxWidth;
        return result;
    }

    moveTo(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

}