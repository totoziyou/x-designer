
import {EventBus} from '@x-designer/utils'
import {initDesignGraph, initViewGraph} from './graph'

export default class BusinessFlowModel {

    id: string;
    graph: any;

    eventBus: EventBus;
    on: Function;
    off:Function;
    emit: Function;

    historyState = {
        canUndo: false,
        canRedo: false
    };
    scale: Number = 100;

    constructor(options) {
        const {mode, data, id} = options;
        this.id = id;
        this._initEventBus();
        if(mode === 'view') {
            const graphContainerId = `container-${this.id}`;
            this.graph = initViewGraph(graphContainerId);
            this.graph.vandMode = 'view';
        }
        else {
            const graphDomID = `graph-${this.id}`;
            const stencilDomId = `stencil-${this.id}`;
            this.graph = initDesignGraph(graphDomID, stencilDomId);
            this.graph.vandMode = 'design';
        }
        if(data) {
            this.graph.fromJSON(data)
        }
        this._initListener();
    }

    _initEventBus() {
        this.eventBus = new EventBus();
        this.on = this.eventBus.on;
        this.off = this.eventBus.off;
        this.emit = this.eventBus.emit;
    }

    _initListener() {
        this.graph.on('node:added', this.onNodeAdded);
        this.graph.on('node:embedding', this.onNodeEmbedding);
        this.graph.on("history:change", this.onHistoryChange);
        this.graph.on("scale", this.onScale);
    }

    onNodeAdded = ({cell, index, node, options}) => {
        const props = node.getProp().props;
        if(props && props.type === 'containerNode' && options.stencil) {
            node.setProp({
                size: {
                    width: 250,
                    height: 300,
                }
            });
        }
    }

    onNodeEmbedding = ({cell, candidateParent}) => {
        if(candidateParent) {
            const cellIndex = cell.getProp('zIndex');
            const parentIndex = candidateParent.getProp('zIndex');
            if(cellIndex <= parentIndex) {
                cell.setProp({ zIndex: parentIndex + 1})
            }
        }
    }

    onHistoryChange = () => {
        this.historyState = {
            canUndo: this.graph.canUndo(),
            canRedo: this.graph.canRedo()
        }
        this.emit('history', this.historyState)
    }

    onScale = ({sx}) => {
        console.info('onScale', sx);
        this.scale = Math.round(sx * 100);
        this.emit('scale', this.scale)
    }

    /** API **/
    undo = () => {
        this.historyState.canUndo && this.graph.undo();
    }

    redo = () => {
        this.historyState.canRedo && this.graph.redo();
    }

    zoom = (offset) => {
        this.graph.zoom(offset);
    }

    zoomOriginal = () => {
        this.graph.zoomTo(1);
    }

    zoomTo = (val) => {
        this.graph.zoomTo(val);
    }

    zoomFit = () => {
        this.graph.zoomToFit({ padding: 20, maxScale: 10 });
    }

    setCenter = () => {
        this.graph.centerContent();
    }

    getItems = () => {
        return this.graph.toJSON();
    }

    getNodes = () => {
        return this.graph.getNodes();
    }

    getRootNodes = () => {
        return this.graph.getNodes().filter(node => !node.parent);
    }

    selectItem = (item) => {
        return this.graph.select(item);
    }
}