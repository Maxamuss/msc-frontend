import { useParams } from 'react-router-dom';
import PageEditor from './components/PageEditor';

export default function PageCreate() {
    let { id } = useParams();

    return <PageEditor modelId={id} />
}