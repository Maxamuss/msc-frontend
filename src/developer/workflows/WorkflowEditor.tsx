import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSchemaData } from '../utils/api';
import ProcessFlow from './ProcessFlow';

export default function WorkflowEditor() {
    const location = useLocation();
    let { id } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [workflowData, setWorkflowData] = useState([]);

    useEffect(() => {
        if (location.pathname.startsWith('/workflow/edit/')) {
            getSchemaData({
                path: `/workflow/${id}`,
                setResults: setWorkflowData,
                setIsLoaded: setIsLoaded,
                setError: setError,
            });
        } else {
            setIsLoaded(true);
        }
    }, [])

    if (error) {
        return <div>Error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <div className="relative flex flex-col" style={{ height: 'calc(100vh - 63px)' }}>
                    {/* Left sidebar & main wrapper */}
                    <div className="flex-1 min-w-0 bg-white xl:flex">
                        <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200 bg-white">
                            <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                {/* Start left column area */}

                                {/* End left column area */}
                            </div>
                        </div>

                        <div className="bg-white lg:min-w-0 lg:flex-1">
                            <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                                <ProcessFlow />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}