import { useEffect, useState } from 'react';

import { ITable, IButton } from './types';
import { getSchemaData } from '../utils/api';
import { Link } from 'react-router-dom';
import { generateSchemaPath } from '../utils/routing';

export default function Table(props: ITable) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [results, setResults] = useState([]);

    const actions = props.actions ?? [];
    const tools = props.tools ?? [];

    useEffect(() => {
        getResults(700);
    }, [])

    const getResults = (wait: number) => {
        if (props.data) {
            setResults(props.data);
        } else {
            setIsLoaded(false);
            getSchemaData({
                path: props.path,
                setResults: setResults,
                setIsLoaded: setIsLoaded,
                setError: setError,
                wait: wait,
            });
        }
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
                                {[...actions, ...tools].length > 0 &&
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {error
                                ? <tr><td colSpan={props.fields.length}>Error</td></tr>
                                : !isLoaded
                                    ? <tr><td colSpan={props.fields.length}>Loading</td></tr>
                                    : results.map((result, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {props.fields.map((field, colIdx) => (
                                                <td key={colIdx} className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'>
                                                    {result[field.fieldName] ?? '-'}
                                                </td>
                                            ))}
                                            {[...actions, ...tools].length > 0 &&
                                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                                    {tools.map((action, idx) => {
                                                        const handleOnClick = () => { if (action.onClick) action.onClick() }

                                                        return (
                                                            <button
                                                                type='button'
                                                                onClick={handleOnClick}
                                                                className='text-indigo-600 hover:text-indigo-900'
                                                            >
                                                                {action.children}
                                                            </button>
                                                        )
                                                    })}
                                                    {actions.map((action, idx) => {
                                                        const to = generateSchemaPath(action.to, action.keys, result);

                                                        return (
                                                            <Link
                                                                key={idx}
                                                                to={to}
                                                                className='text-indigo-600 hover:text-indigo-900'
                                                            >
                                                                {action.text}
                                                            </Link>
                                                        );
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
