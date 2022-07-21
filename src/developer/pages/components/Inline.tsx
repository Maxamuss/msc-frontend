import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getSchemaData } from '../../utils/api';

interface IInline {
    model: any;
    modelschema_id?: string;
}

export default function Inline(props: IInline) {
    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [relatedModel, setRelatedModel] = useState<any>();

    useEffect(() => {
        if (!props.modelschema_id) {
            setIsLoaded(true);
        } else {
            getSchemaData({
                path: `/modelschema/${props.modelschema_id}/`,
                setResults: setRelatedModel,
                setIsLoaded: setIsLoaded,
                setError: setError,
            });
        }

    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        if (!props.modelschema_id) {
            return (
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900">Inline</h3>
                    <div>Click to setup</div>
                </div>
            )
        }
        console.log(relatedModel)
        return (
            <div className='overflow-x-auto'>
                <div className='inline-block min-w-full align-middle'>
                    <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 border-b'>
                        <table className='min-w-full divide-y divide-gray-300'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    {relatedModel?.fields?.map((field: any, idx: number) => (
                                        <th
                                            key={idx}
                                            scope='col'
                                            className={(idx === 0 ? 'pl-6 pr-3' : 'px-3 ') + 'py-3.5 text-left text-sm font-semibold text-gray-900'}
                                        >
                                            {field.field_name}
                                        </th>
                                    ))}
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200 bg-white'>
                                {[...Array(3)].map((e, i) => (
                                    <tr key={i} className='animate-pulse'>
                                        {[...Array(relatedModel?.fields?.length)].map((e, i) => (
                                            <td key={i} className='whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 lg:pl-8 text-center'><div className="h-3 bg-slate-300 rounded"></div></td>
                                        ))}
                                        <td className='whitespace-nowrap py-4 pl-3 pr-4 sm:pl-6 lg:pl-8 text-center'><div className="h-3 bg-slate-300 rounded"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
