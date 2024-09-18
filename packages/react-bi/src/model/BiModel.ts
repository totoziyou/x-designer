import {calculateUtils} from "react-grid-layout"
import {EventBus} from '@x-designer/utils'
import BiItemModel from "./BiItemModel";

type BiModelOptions = {
    gridLayoutConfig?: any
}

const DefaultGridLayoutConfig = {
    cols: 24,
    rowHeight: 30,
    margin: [4, 4],
    maxRows: 'Infinity',
    containerPadding: [4, 4],
    containerWidth: 1280
}

export default class BiModel {

    gridLayoutConfig: any;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    dragMode = '';
    dragSourceItem = null;
    dragOffsetPos = null;
    dragItem = null;

    items: Array<any>;
    layoutItems: Array<any>;
    itemsMap: any;

    constructor(options:BiModelOptions = {}, data = []) {
        const {gridLayoutConfig} = options;
        this._initGridLayoutConfig(gridLayoutConfig);
        this._initData(data);
        this._initEventBus();
    }

    _initGridLayoutConfig(config) {
        this.gridLayoutConfig = {
            ...DefaultGridLayoutConfig,
            ...config,
        }
    }

    _initData(data) {
        this.itemsMap = {};
        this.items = data.map(item => {
            const itemModel = new BiItemModel(item, false);
            this.itemsMap[itemModel.id] = itemModel;
            return itemModel;
        });
        this.layoutItems = this.items.map(item => {
            return item.getLayout();
        });
    }

    _initEventBus() {
        this.eventBus = new EventBus();
        this.on = this.eventBus.on;
        this.off = this.eventBus.off;
        this.emit = this.eventBus.emit;
    }

    get config() {
        return this.gridLayoutConfig;
    }

    get layout() {
        return [...this.layoutItems];
    }

    clearDrag() {
        this.dragMode = null;
        this.dragSourceItem = null;
        this.dragOffsetPos = null;
        this.dragItem = null;
    }

    dragNewStart(item, offsetPos) {
        this.dragMode = 'addNew';
        const {defaultWidth, defaultHeight} = item;
        const {w, h} = calculateUtils.calcWH(this.gridLayoutConfig, defaultWidth, defaultHeight, 0, 0);
        console.info('addSize', w, h);
        this.addItem({...item, w, h}, true);
        this.dragSourceItem = item;
        this.dragOffsetPos = offsetPos;
    }

    dragEnd() {
        let needRefresh = false;
        this.items = this.items.filter((item, idx) => {
            if(item.isDummy) {
                needRefresh = true;
                return false;
            }
            return true;
        });
        this.layoutItems = this.items.map(item => {
            return item.getLayout();
        });
        this.clearDrag();
        if(needRefresh) {
            this.emit('itemsChanged');
        }
    }

    dragOver(evt) {
        if(!this.dragMode) return;

        const {x, y} = calculateUtils.calcXY(this.gridLayoutConfig, evt.y, evt.x, 2, 4);
        // console.info('calc', x, y);
        if(this.dragMode === 'addNew') {
            if(this.dragItem) {
                if(this.dragItem.x !== x || this.dragItem.y !== y) {
                    this.moveItem(this.dragItem, {x, y});
                }
            }
            else {
                this.addItem({x, y, w: 2, h: 4 });
            }
        }
    }

    drop() {
        this.dragItem.drop();
    }

    getItem(id) {
        return this.itemsMap[id];
    }

    addItem(pos, isDummy=false) {
        const newItem = new BiItemModel(pos, isDummy);
        this.dragItem = newItem;
        this.items.push(newItem);
        this.layoutItems.push(newItem.getLayout());
        this.itemsMap[newItem.id] = newItem;
        this.emit('addItem');
    }

    moveItem(item, pos) {
        item.moveTo(pos);
        this.layoutItems = this.items.map(item => {
            return item.getLayout();
        });
        this.emit('moveItem', item);
    }

    transComponentPos() {

    }

    transToPos() {

    }

    transToGridPos() {

    }

}