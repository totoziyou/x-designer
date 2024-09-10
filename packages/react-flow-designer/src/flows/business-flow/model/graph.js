import {Graph, Shape} from '@antv/x6'
import {Stencil} from '@antv/x6-plugin-stencil'
import {Transform} from '@antv/x6-plugin-transform'
import {Selection} from '@antv/x6-plugin-selection'
import {Snapline} from '@antv/x6-plugin-snapline'
import {Keyboard} from '@antv/x6-plugin-keyboard'
import {Clipboard} from '@antv/x6-plugin-clipboard'
import {History} from '@antv/x6-plugin-history'
import {Scroller} from '@antv/x6-plugin-scroller'

import {bindEvents} from './events';
import {getNodes} from './node';

export function initDesignGraph(graphDomID, stencilDomId) {

    // 初始化画布
    const graph = new Graph({
        container: document.getElementById(graphDomID),
        // grid: true,
        autoResize: true,
        // panning: true,
        mousewheel: {
            enabled: true,
            zoomAtMousePosition: true,
            modifiers: 'ctrl',
            minScale: 0.5,
            maxScale: 3,
        },
        embedding: {
            enabled: true,
            validate: ({child, parent}) => {
                const parentProps = parent.getProp().props;
                const childProps = child.getProp().props;
                return parentProps && parentProps.embedding && childProps && childProps.embedAble;
            }
        },
        connecting: {
            router: 'manhattan',
            connector: {
                name: 'rounded',
                args: {
                    radius: 8,
                },
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowBlank: false,
            allowLoop: false,
            snap: {
                radius: 20,
            },
            createEdge() {
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#A2B1C3',
                            strokeWidth: 2,
                            targetMarker: {
                                name: 'block',
                                width: 12,
                                height: 8,
                            },
                        },
                    },
                    zIndex: 0,
                })
            },
            validateConnection({targetMagnet}) {
                return !!targetMagnet
            },
        },
        highlighting: {
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#5F95FF',
                        stroke: '#5F95FF',
                    },
                },
            },
        },
    })

    graph.domID = graphDomID;
    graph.vandMode = 'design';

    // 使用插件
    graph
        .use(
            new Transform({
                resizing: true,
                // rotating: true,
            }),
        )
        .use(
            new Selection({
                rubberband: true,
                showNodeSelectionBox: true,
                showEdgeSelectionBox: true,
            }),
        )
        .use(new Snapline({
            tolerance: 2,
            sharp: true,
            resizing: true,
        }))
        .use(new Keyboard())
        .use(new Clipboard())
        .use(new History())
        // .use(new Scroller())

    // 初始化 stencil
    const stencil = new Stencil({
        title: '',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        collapsable: true,
        groups: [
            {
                title: '基础节点',
                name: 'baseNode',
                graphHeight: 110,
                layoutOptions: {
                    columns: 1,
                    columnWidth: 180,
                    rowHeight: 44,
                    dx: 0,
                    dy: 0,
                    marginX: 0,
                    marginY: 10
                },
            },
            {
                title: '容器',
                name: 'container',
                layoutOptions: {
                    columns: 1,
                    columnWidth: 180,
                    rowHeight: 40,
                    dx: 0,
                    dy: 0,
                    marginX: 0,
                    marginY: 10
                },
            },
        ],
    })
    document.getElementById(stencilDomId).appendChild(stencil.container);

    bindEvents(graph);
    const {baseNodes, containerNodes} = getNodes(graph);
    stencil.load(baseNodes, 'baseNode');
    stencil.load(containerNodes, 'container');

    return graph;

}

export function initViewGraph(graphDomID) {

    // 初始化画布
    const graph = new Graph({
        container: document.getElementById(graphDomID),
        grid: false,
        autoResize: true,
        interacting: false,
        panning: true,
        // panning: false, // 禁止平移
        // mousewheel: false, // 禁止缩放
        // selecting: {
        //     enabled: false,
        //     multiple: false,
        //     showNodeSelectionBox: false,
        //     showEdgeSelectionBox: false,
        // },
        connecting: {
            router: 'manhattan',
            connector: {
                name: 'rounded',
                args: {
                    radius: 8,
                },
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowBlank: false,
            snap: {
                radius: 20,
            },
        },
        // resizing: false,
        // rotating: false,
        // highlighting: {
        //     enabled: false,
        // }
    });

    graph.domID = graphDomID;
    graph.vandMode = 'view';

    getNodes(graph);

    return graph;
}