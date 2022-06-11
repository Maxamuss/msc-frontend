import { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: '#555' };

const UnappliedChangesNode: FC<NodeProps> = ({ data, isConnectable }) => {
    return (
        <div className='p-4 border border-dashed'>
            <Handle type="target" position={Position.Bottom} style={targetHandleStyle} />
            <div>
                <strong>{data.unappliedChanges} Unapplied Changes</strong>
            </div>
        </div>
    );
};

export default memo(UnappliedChangesNode);