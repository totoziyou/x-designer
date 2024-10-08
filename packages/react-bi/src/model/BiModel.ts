import {calculateUtils} from "react-grid-layout"
import {EventBus} from '@x-designer/utils'
import BiItemModel from "./BiItemModel";
import {BiTheme} from './defines';

type BiModelOptions = {
    theme?: string;
    themeConfig?: any;
    gridLayoutConfig?: any;
    items: any[];
    getDataSource: Function;
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

    themeName: string;
    themeConfig: any;
    gridLayoutConfig: any;
    getDataSource: Function;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    dragMode = '';
    dragSourceItem = null;
    dragOffsetPos = null;
    dragItem = null;
    draglayouts: Array<any>;

    items: Array<any>;
    itemsMap: any;

    constructor(options:BiModelOptions) {
        const {theme, themeConfig, gridLayoutConfig, getDataSource, items = []} = options;
        this._initEventBus();
        this.getDataSource = getDataSource;
        this._initTheme(theme, themeConfig);
        this._initGridLayoutConfig(gridLayoutConfig);
        this._initItems(items);
    }

    _initTheme(name, config) {
        if(name === 'custom') {
            this.themeName = 'custom';
            this.themeConfig = config;
        }
        else {
            this.themeName = name || 'light';
            this.themeConfig = JSON.parse(JSON.stringify(BiTheme[this.themeName] || BiTheme.default));
        }
    }

    _initGridLayoutConfig(config) {
        this.gridLayoutConfig = {
            ...DefaultGridLayoutConfig,
            ...config,
        }
    }

    _initItems(data) {
        this.itemsMap = {};
        this.items = data.map(item => {
            const itemModel = new BiItemModel(this, item, false);
            this.itemsMap[itemModel.id] = itemModel;
            return itemModel;
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
        return this.items.map(item => {
            return item.getLayout();
        });
    }

    get theme() {
        return this.themeConfig;
    }

    setGridLayoutConfig(config) {
        this.gridLayoutConfig = {
            ...this.gridLayoutConfig,
            ...config,
        }
        this.emit('gridLayoutConfigChanged', this.gridLayoutConfig)
    }

    setGridLayout(items) {
        if(this.dragMode) {
            this.draglayouts = items;
        }
        else {
            items.forEach(item => {
                this.itemsMap[item.i].setGridLayout(item);
            })
        }
    }

    setTheme(name, config?) {
        if(name === 'custom') {
            this.themeName = 'custom';
            this.themeConfig = config;
        }
        else {
            this.themeName = name;
            this.themeConfig = JSON.parse(JSON.stringify(BiTheme[this.themeName]));
        }
        this.emit('themeChange');
    }

    clearDrag() {
        this.dragMode = null;
        this.dragSourceItem = null;
        this.dragOffsetPos = null;
        this.dragItem = null;
        this.draglayouts = null;
    }

    dragNewStart(item, offsetPos) {
        this.dragMode = 'addNew';
        const {cols, rowHeight} = this.gridLayoutConfig;
        const {defaultWidth, defaultHeight, minWidth, minHeight, maxWidth, maxHeight} = item;
        const size = calculateUtils.calcWH(this.gridLayoutConfig, defaultWidth, defaultHeight, 0, 0);
        const itemClone = {
            ...item,
            ...size,
        }
        if(minWidth || minHeight) {
            const minSize = calculateUtils.calcWH(this.gridLayoutConfig, minWidth || cols, minHeight || rowHeight, 0, 0);
            if(minWidth) itemClone.minW = minSize.w;
            if(minHeight) itemClone.minH = minSize.h;
        }
        if(maxWidth || maxHeight) {
            const maxSize = calculateUtils.calcWH(this.gridLayoutConfig, maxWidth || cols, maxHeight || rowHeight, 0, 0);
            if(maxWidth) itemClone.maxW = maxSize.w;
            if(maxHeight) itemClone.maxH = maxSize.h;
        }
        this.addItem(itemClone, true);
        this.dragSourceItem = item;
        this.dragOffsetPos = offsetPos;
        this.emit('dragNewStart');
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
        this.draglayouts.forEach(item => {
            this.itemsMap[item.i].moveTo(item);
        });
        this.clearDrag();
        this.emit('dragEnd');
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
        this.emit('drop');
    }

    getItem(id) {
        return this.itemsMap[id];
    }

    addItem(item, isDummy=false) {
        const newItem = new BiItemModel(this, item, isDummy);
        this.dragItem = newItem;
        this.items.push(newItem);
        this.itemsMap[newItem.id] = newItem;
        this.emit('addItem');
    }

    moveItem(item, pos) {
        item.moveTo(pos);
        this.emit('itemsChanged', {type: 'move', data: [item]});
    }

    editItem(item) {
        this.emit('editItem', item);
    }

    copyItem(item) {

    }

    removeItem(itemId) {
        const idx = this.items.findIndex(item => item.id === itemId);
        if(idx > -1) {
            this.items.splice(idx, 1);
            delete this.itemsMap[itemId];
            this.emit('itemsChanged', {type: 'remove'});
        }
    }

    itemChanged(type, data) {
        this.emit('itemsChanged', {type, data});
    }

    transComponentPos() {

    }

    transToPos() {

    }

    transToGridPos() {

    }

    toJson() {
        const items = this.items.map(item => item.toJson());
        const data: any = {
            gridLayoutConfig: this.gridLayoutConfig,
            items,
            theme: this.themeName
        }
        if(this.themeName === 'custom') {
            data.themeConfig = this.themeConfig;
        }
        return data;
    }

}