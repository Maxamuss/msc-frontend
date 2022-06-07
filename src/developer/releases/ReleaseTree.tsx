import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge
} from 'react-flow-renderer';
import dagre from 'dagre';


import { getSchemaList } from '../utils/api';

interface IRelease {
    id: string;
    release_version: string;
    release_notes: string;
    released_at: string;
    current_release: boolean;
    parent: number | undefined;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;

const getElementsLayout = (nodes: Array<any>, edges: Array<any>, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
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
        getSchemaList({
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
                    position: { x: 0, y: 0 },
                    data: {
                        label: (
                            <>
                                {release.release_version}
                            </>
                        ),
                    },
                });
                if (release.parent) {
                    newEdges.push({
                        id: `${release.parent}-${release.id}`,
                        source: release.parent.toString(),
                        target: release.id.toString(),
                    });
                }
            });
            const { nodes: nodesLayout, edges: edgesLayout } = getElementsLayout(
                newNodes,
                newEdges,
                'BT'
            );

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
            <div style={{ height: "calc(100vh - 64px)", width: "(100vw - 335px)" }}>
                <ReactFlow
                    defaultNodes={nodes}
                    defaultEdges={edges}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </div>
        );
    }
}