import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSchemaData } from '../utils/api';

import WorkflowEditor from './components/WorkflowEditor';

export default function WorkflowDetail() {
    let { id } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [workflowData, setWorkflowData] = useState([]);

    useEffect(() => {
        getSchemaData({
            path: `/workflow/${id}/`,
            setResults: setWorkflowData,
            setIsLoaded: setIsLoaded,
            setError: setError,
        });
    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        return <WorkflowEditor workflowData={workflowData} />
    }
}