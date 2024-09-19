import {EventBus, uuid} from '@x-designer/utils'

export default class BiItemModel {

    designer;
    sourceItem: any;
    data: any;

    id: string;
    name: string;
    gridLayout: any;
    isLocked: boolean;
    isDummy: boolean;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    constructor(designer, sourceItem, isDummy = false) {
        const {name, x=0, y=0, w, h, minW, minH, maxW, maxH, data} = sourceItem;
        this.designer = designer;
        this.id = uuid();
        this.sourceItem = sourceItem;
        this.name = name;
        this.isLocked = false;
        this.isDummy = isDummy;
        this.gridLayout = {
            i: this.id,
            x, y, w, h, minW, minH, maxW, maxH
        };
        this.data = data || {};
        this._initEventBus();
    }

    _initEventBus() {
        this.eventBus = new EventBus();
        this.on = this.eventBus.on;
        this.off = this.eventBus.off;
        this.emit = this.eventBus.emit;
    }

    getWidget() {
        return this.sourceItem.component;
    }

    getLayout() {
        return {
            ...this.gridLayout,
            isDummy: this.isDummy,
            static: this.isLocked,
        }
    }

    getExtMenus() {
        return this.sourceItem.extMenus || [];
    }

    moveTo(pos) {
        this.gridLayout.x = pos.x;
        this.gridLayout.y = pos.y;
    }

    drop() {
        this.isDummy = false;
        if(this.sourceItem.afterDrop) {
            this.sourceItem.afterDrop(this);
        }
    }

    copy() {

    }

    remove() {
        this.designer.removeItem(this.id);
    }

    locked() {
        if(this.isLocked) {
            this.isLocked = false;
            this.emit('unlocked');
        }
        else {
            this.isLocked = true;
            this.emit('locked');
        }
        this.designer.itemChanged('lock', [this]);
    }

    toJson() {
        return {
            id: this.id,
            gridLayout: this.gridLayout,
            isLocked: this.isLocked,
            data: this.data,
        }
    }

}