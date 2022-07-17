import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PageEditor from './components/PageEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSchemaData } from '../utils/api';

export default function PageDetail() {
    let { id } = useParams();

    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageLayout, setPageLayout] = useState([]);

    useEffect(() => {
        getSchemaData({
            path: `/page/${id}/`,
            setResults: setPageLayout,
            setIsLoaded: setIsLoaded,
            setError: setError,
        });
    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        // let pageLayoutWithIds: any = [];
        // console.log(pageLayout)

        // pageLayout.forEach((component) => {
        //     // if (!('id' in component)) {
        //     //     component['id'] = ''
        //     // }
        //     pageLayoutWithIds.push(component)
        // })

        return <PageEditor pageLayout={pageLayout} />
    }
}