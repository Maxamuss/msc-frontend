import { useEffect, useState } from 'react';
import { generatePath } from 'react-router';

import { ITable } from './types';
import { getSchemaList } from '../utils/api';
import { Link } from 'react-router-dom';

export default function Table(props: ITable) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults(700);
    }, [])

    const getResults = (wait: number) => {
        getSchemaList({
            path: props.path,
            setResults: setResults,
            setIsLoaded: setIsLoaded,
            setError: setError,
            wait: wait,
        });
    }

    return (
        <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
                <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 border-b'>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                {props.fields.map((field, idx) => (
                                    <th key={idx} scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                        {field.headerName}
                                    </th>
                                ))}
                                {props.actions.length > 0 &&
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {error
                                ? <div>Error</div>
                                : !isLoaded
                                    ? <div>Loading</div>
                                    : results.map((result, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {props.fields.map((field, colIdx) => (
                                                <td key={colIdx} className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'>{result[field.fieldName]}</td>
                                            ))}
                                            {props.actions.length > 0 &&
                                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                                    {props.actions.map((action, idx) => {
                                                        let args = {};
                                                        action.keys.forEach((key) => {
                                                            args[key as keyof typeof args] = result[key];
                                                        })

                                                        return (
                                                            <Link
                                                                key={idx}
                                                                to={generatePath(action.to, args)}
                                                                className='text-indigo-600 hover:text-indigo-900'
                                                            >
                                                                {action.text}
                                                            </Link>);
                                                    })}
                                                </td>
                                            }
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
