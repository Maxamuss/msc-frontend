import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PageEditor from './components/PageEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSchemaData } from '../utils/api';

export default function PageDetail() {
    let { id } = useParams();

    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [model, setModel] = useState([]);
    const [pageLayout, setPageLayout] = useState([]);

    useEffect(() => {
        getSchemaData({
            path: `/page/${id}/`,
            setResults: (layout: any) => {
                setPageLayout(layout);
                getSchemaData({
                    path: `/modelschema/${layout.modelschema_id}/`,
                    setResults: setModel,
                    setIsLoaded: setIsLoaded,
                    setError: setError,
                });
            },
            setIsLoaded: () => { },
            setError: setError,
        });
    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        return <PageEditor model={model} pageLayout={pageLayout} pageId={id} />
    }
}