import {EventBus, uuid} from '@x-designer/utils'
import {BiWidgets} from './defines'

export default class BiItemModel {

    designer;
    sourceItem: any;
    data: any;

    id: string;
    gridLayout: any;
    isLocked: boolean;
    isDummy: boolean;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    constructor(designer, itemData, isDummy = false) {
        this.designer = designer;
        this.isDummy = isDummy;
        if(isDummy) {
            this._initDummy(itemData);
        }
        else {
            this._initData(itemData);
        }
        this._initEventBus();
    }

    _initData(itemData) {
        const {id, widget, gridLayout, isLocked, data} = itemData;
        this.id = id;
        this.sourceItem = BiWidgets[widget];
        this.isLocked = isLocked;
        this.gridLayout = gridLayout;
        this.data = data || {};
    }

    _initDummy(sourceItem) {
        const {x=0, y=0, w, h, minW, minH, maxW, maxH, data} = sourceItem;
        this.id = uuid();
        this.sourceItem = sourceItem;
        this.isLocked = false;
        this.gridLayout = {
            i: this.id,
            x, y, w, h, minW, minH, maxW, maxH
        };
        this.data = data || {};
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

    setGridLayout(data) {
        const {x, y, w, h} = data;
        this.gridLayout.x = x;
        this.gridLayout.y = y;
        this.gridLayout.w = w;
        this.gridLayout.h = h;
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
            widget: this.sourceItem.name,
            gridLayout: this.gridLayout,
            isLocked: this.isLocked,
            data: this.data,
        }
    }

}