import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageEditor from './components/PageEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSchemaData } from '../utils/api';

export default function PageCreate() {
    let { id } = useParams();

    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [model, setModel] = useState([]);

    useEffect(() => {
        getSchemaData({
            path: `/modelschema/${id}/`,
            setResults: setModel,
            setIsLoaded: setIsLoaded,
            setError: setError,
        });
    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        return <PageEditor model={model} />
    }
}