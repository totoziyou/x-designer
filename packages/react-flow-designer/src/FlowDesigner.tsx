import React, {forwardRef, useState, useEffect, useImperativeHandle} from 'react'
import {uuid} from '@x-designer/utils'
import {initDesignGraph, initViewGraph} from './model/graph'

const FlowDesigner = forwardRef((props: any, ref) => {

    const [mode, setMode] = useState('edit');
    const [id, setId] = useState(uuid());
    const [graph, setGraph] = useState(null);

    useImperativeHandle(ref, () => {
        return {
            getData: () => {
                return graph && graph.toJSON()
            }
        }
    });

    const onNodeAdded = ({cell, index, node, options}) => {
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

    const onNodeEmbedding = ({cell, candidateParent}) => {
        if(candidateParent) {
            const cellIndex = cell.getProp('zIndex');
            const parentIndex = candidateParent.getProp('zIndex');
            if(cellIndex <= parentIndex) {
                cell.setProp({ zIndex: parentIndex + 1})
            }
        }
    }

    useEffect(() => {
        console.info('inited', id);
        let graph: any;
        if(mode === 'view') {
            const graphContainerId = `container-${id}`;
            graph = initViewGraph(graphContainerId);
            graph.vandMode = 'view';
        }
        else {
            const graphDomID = `graph-${id}`;
            const stencilDomId = `stencil-${id}`;
            graph = initDesignGraph(graphDomID, stencilDomId);
            graph.vandMode = 'design';
        }
        graph.on('node:added', onNodeAdded);
        graph.on('node:embedding', onNodeEmbedding);
        setGraph(graph);
    }, [])

    return (
        <div id={`container-${id}`} className="xdr-flow">
            <div id={`stencil-${id}`} className="xdr-flow-stencil"></div>
            <div className="xdr-flow-graph">
                <div id={`graph-${id}`}></div>
            </div>
            <div className="xdr-flow-side"></div>
        </div>
    )

})

export default FlowDesigner