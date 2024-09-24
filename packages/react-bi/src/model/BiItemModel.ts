import {EventBus, uuid} from '@x-designer/utils'
import {BiWidgets} from './defines'

export default class BiItemModel {

    designer;
    sourceItem: any;
    data: any;

    themeName: string;
    themeConfig: any;

    id: string;
    gridLayout: any;
    isLocked: boolean;
    isDummy: boolean;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    constructor(designer, itemData, isDummy = false) {
        this._initEventBus();
        this.designer = designer;
        this.isDummy = isDummy;
        if(isDummy) {
            this._initDummy(itemData);
            this._initTheme();
        }
        else {
            this._initData(itemData);
            this._initTheme(itemData.theme, itemData.themeConfig);
        }
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

    _initTheme(name?, config?) {
        const themes = this.sourceItem.themes || {};
        if(name) {
            this.themeName = name;
            this.themeConfig = config || themes[this.themeName] || themes.default || {};
        }
        else {
            this.themeName = this.designer.themeName;
            this.themeConfig = themes[this.themeName] || themes.default || {};
        }
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

    getEditor() {
        return this.sourceItem.editComponent;
    }

    getEditConfig() {
        return this.sourceItem.editConfig || {width: 800};
    }

    getGridPos() {
        const {cols} = this.designer.gridLayoutConfig;
        const {x, w} = this.gridLayout;
        if(x === 0) {
            return (w === cols) ? 'full' : 'left';
        }
        else {
            return (x + w === cols) ? 'right' : 'free'
        }
    }

    getTheme() {
        
    }

    setTheme(name, config) {
        
    }

    setData(newData) {
        this.data = newData;
        this.emit('dataChange', this.data);
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

    edit() {
        this.designer.editItem(this);
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
        const data: any = {
            id: this.id,
            widget: this.sourceItem.name,
            gridLayout: this.gridLayout,
            isLocked: this.isLocked,
            data: this.data,
            theme: this.themeName,
        }
        if(this.themeName === 'custom') {
            data.themeConfig = this.themeConfig;
        }
        return data;
    }

}