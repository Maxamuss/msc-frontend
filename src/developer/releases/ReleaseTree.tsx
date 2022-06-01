import { useEffect, useState } from 'react';
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



export default function ReleaseTree() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [releases, setReleases]: [Array<IRelease>, Function] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

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

            releases.forEach((release: IRelease) => {
                newNodes.push({
                    id: release.id,
                    data: {
                        label: (
                            <>
                                {release.release_version}
                            </>
                        ),
                    },
                    position: { x: 100, y: 100 },
                });
                if (release.parent) {
                    newEdges.push({
                        id: `${release.parent}-${release.id}`,
                        source: release.parent,
                        target: release.id,
                    });
                }
            });
            console.log(newNodes)
            console.log(newEdges)

            setEdges(newEdges);
            setNodes(newNodes);
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
                    onConnect={onConnect}
                    onEdgeUpdate={onEdgeUpdate}
                >
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </div>
        );
    }
}