import { useParams } from 'react-router-dom';
import WorkflowEditor from './components/WorkflowEditor';

export default function WorkflowCreate() {
    let { id } = useParams();

    return <WorkflowEditor modelId={id} />
}