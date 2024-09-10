import React, {forwardRef, useState, useEffect, useImperativeHandle} from 'react'
import {uuid} from '@x-designer/utils'
import {initDesignGraph, initViewGraph} from './model/graph'
import BusinessFlowModel from './model/model'
import {PropsPanel} from './components/PropsPanel'
import {Guide} from './components/Guide'
import './less/BusinessFlow.less'

const BusinessFlow = forwardRef((props: any, ref) => {

    const {data} = props;
    const [mode, setMode] = useState('edit');
    const [id, setId] = useState(uuid());
    const [graph, setGraph] = useState(null);
    const [model, setModel] = useState(null);

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
        console.info('inited', mode, id);

        const model = new BusinessFlowModel({ id, mode, data });
        setModel(model);

        // let graph: any;
        // if(mode === 'view') {
        //     const graphContainerId = `container-${id}`;
        //     graph = initViewGraph(graphContainerId);
        //     graph.vandMode = 'view';
        // }
        // else {
        //     const graphDomID = `graph-${id}`;
        //     const stencilDomId = `stencil-${id}`;
        //     graph = initDesignGraph(graphDomID, stencilDomId);
        //     graph.vandMode = 'design';
        // }
        // if(data) {
        //     graph.fromJSON(data)
        // }
        // graph.on('node:added', onNodeAdded);
        // graph.on('node:embedding', onNodeEmbedding);
        // setGraph(graph);
    }, [])

    return (
        <div id={`container-${id}`} className="xdb-flow">
            <div className="xdb-flow-header">
                { model && <Guide model={model} /> }
            </div>
            <div className="xdb-flow-main">
                <div id={`stencil-${id}`} className="xdb-flow-stencil"></div>
                <div className="xdb-flow-graph">
                    <div id={`graph-${id}`}></div>
                </div>
                <div className="xdb-flow-side">
                    { model && <PropsPanel model={model} /> }
                </div>
            </div>
        </div>
    )

})

export default BusinessFlow