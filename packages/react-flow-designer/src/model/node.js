import {register} from '@antv/x6-react-shape'
import {Node} from "../components/Node";
import {ports} from "./define";

export function getNodes(graph) {

    register({
        shape: 'custom-node',
        width: 150,
        height: 26,
        attrs: {
            body: {
                fill: '#FFFFFF',
                stroke: '#999999',
                strokeWidth: 1,
            },
            text: {
                fontSize: 14,
                fill: '#262626',
                bg: '',
                vAlign: 'center',
                hAlign: 'center',
            },
            prefix: {
                bg: '#a7d7f4',
            }
        },
        data: {
            idx: '',
            icon: '',
            label: '',
            summary: '',
        },
        component: Node,
        ports: {...ports},
    })

    const baseNodes = [
        graph.createNode({
            shape: 'custom-node',
            width: 150,
            height: 28,
            props: {
                label: '标签节点',
                type: 'orderNode',
                embedAble: true,
            },
            attrs: {
                body: {
                    radius: 8,
                    fill: '#0dbafb',
                    stroke: '#0a8dbe'
                },
                text: {
                    fill: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                },
                prefix: {
                    bg: '#fec27a',
                }
            },
        }),
        graph.createNode({
            shape: 'custom-node',
            props: {
                label: '功能节点',
                type: 'functionNode',
                canFuncBind: true,
                embedAble: true,
            },
            attrs: {
                body: {
                    radius: 8,
                    fill: '#dcf0fc',
                    stroke: '#7AC2EE',
                    strokeDasharray: 5,
                },
                prefix: {
                    bg: '#a7d7f4',
                }
            },
            data: {
                bindRoute: null,
                bindStatus: false,
                withParams: false,
                extParams: '',
            }
        })
    ]

    const containerNodes = [
        graph.createNode({
            shape: 'custom-node',
            props: {
                label: '容器',
                type: 'containerNode',
                embedding: true,
            },
            attrs: {
                body: {
                    radius: 5,
                    fill: "#f9fdff",
                    stroke: '#7AC2EE',
                    strokeDasharray: 5,
                },
                header: {
                    height: 30,
                },
                prefix: {
                    bg: '#dbebf5',
                }
            },
        })
    ]

    return {
        baseNodes,
        containerNodes
    };

}