import { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, BackgroundVariant } from 'react-flow-renderer';
import dagre from 'dagre';

import ReleaseNode from './ReleaseNode';
import { getSchemaData } from '../utils/api';
import { IRelease } from './api';
import ReleaseTopMenu from './ReleaseTopMenu';
import { ROUTES } from '../utils/routing';
import Header from '../components/Header';

const nodeTypes = {
    release: ReleaseNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 300;
const nodeHeight = 75;

const getElementsLayout = (nodes: Array<any>, edges: Array<any>, direction = 'BT') => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = 'bottom';
        node.sourcePosition = 'top';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};

const headerConfig = {
    title: 'Release Overview',
    tools: [
        {
            children: 'Apply Changes',
            // icon: PlusCircleIcon,
            to: ROUTES.release.changes,
        }
    ]
}

export default function ReleaseTree() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [releases, setReleases]: [Array<IRelease>, Function] = useState([]);
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    useEffect(() => {
        getReleases();
    }, [])

    const getReleases = () => {
        getSchemaData({
            path: '/releases/',
            setResults: setReleases,
            setIsLoaded: () => { },
            setError: setError,
        });
    }

    useEffect(() => {
        if (releases.length > 0) {
            let newNodes: Array<any> = [];
            let newEdges: Array<any> = [];

            releases.reverse().forEach((release: IRelease) => {
                newNodes.push({
                    id: release.id.toString(),
                    type: 'release',
                    position: { x: 0, y: 0 },
                    data: {
                        release: release
                    },
                    draggable: false,
                });
                if (release.parent) {
                    newEdges.push({
                        id: `${release.parent}-${release.id}`,
                        source: release.parent.toString(),
                        target: release.id.toString(),
                    });
                }
            });
            const { nodes: nodesLayout, edges: edgesLayout } = getElementsLayout(newNodes, newEdges);

            setNodes([...nodesLayout]);
            setEdges([...edgesLayout]);

            setIsLoaded(true);
        }
    }, [releases])


    if (error) {
        return <div>Error:</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header {...headerConfig} />
                <div style={{ height: "calc(100vh - 64px)", width: "(100vw - 335px)" }}>
                    <ReactFlow
                        defaultNodes={nodes}
                        defaultEdges={edges}
                        nodeTypes={nodeTypes}
                        defaultZoom={2}
                        minZoom={1}
                        maxZoom={3}
                        fitView
                    >
                        <Background variant={BackgroundVariant.Dots} gap={16} size={0.5} />
                    </ReactFlow>
                </div>
            </>
        );
    }
}