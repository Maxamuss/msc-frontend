import { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { IRelease } from './api';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyle: CSSProperties = { background: '#555' };

const ReleaseNode: FC<NodeProps> = ({ data, isConnectable }) => {
    const release: IRelease = data.release;

    return (
        <div className='border border-gray-200 rounded-lg bg-white' style={{ width: '300px', height: '75px' }}>
            <Handle type="target" position={Position.Bottom} style={sourceHandleStyle} />
            <Handle type="source" position={Position.Top} style={targetHandleStyle} />
            <div className='w-full bg-gray-50 border-b px-2 py-1 text-lg flex justify-between' style={{ height: '30px' }}>
                {release.release_version}
                {release.current_release &&
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 z-1">
                        Current
                    </div>
                }
            </div>
            <div className='px-2 py-1 text-xs'>
                <p className='text-ellipsis'>{release.release_notes}</p>
                <p>{release.released_at}</p>
            </div>
            <div>

            </div>
        </div>
    );
};

export default memo(ReleaseNode);