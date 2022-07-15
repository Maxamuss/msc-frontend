import { useEffect, useState } from 'react';

import { ITable } from './types';
import { getSchemaData } from '../utils/api';
import { Link } from 'react-router-dom';
import { generateSchemaPath } from '../utils/routing';

function parseValue(value: any) {
    if (typeof value == "boolean") {
        if (value) return 'Yes'
        else return 'No'
    }
    return value ?? '-';
}

export default function Table(props: ITable) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [results, setResults] = useState([]);

    const actions = props.actions ?? [];

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
                                    <th
                                        key={idx}
                                        scope='col'
                                        className={(idx == 0 ? 'pl-6 pr-3' : 'px-3 ') + 'py-3.5 text-left text-sm font-semibold text-gray-900'}
                                    >
                                        {field.headerName}
                                    </th>
                                ))}
                                {actions.length > 0 &&
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {error
                                ? <tr><td colSpan={props.fields.length + 1} className='text-center py-3'>Error</td></tr>
                                : !isLoaded
                                    ? <tr><td colSpan={props.fields.length + 1} className='text-center py-3'>Loading</td></tr>
                                    : ((results ?? []).length === 0)
                                        ? <tr><td colSpan={props.fields.length + 1} className='text-center py-3'>No results to show</td></tr>
                                        : (results ?? []).map((result, rowIdx) => (
                                            <tr key={rowIdx}>
                                                {props.fields.map((field, colIdx) => (
                                                    <td
                                                        key={colIdx}
                                                        className={(colIdx == 0 ? 'pl-6 pr-3' : 'px-3 ') + 'whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'}
                                                    // className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'
                                                    >

                                                        {parseValue(result[field.fieldName])}
                                                    </td>
                                                ))}
                                                {actions.length > 0 &&
                                                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8 space-x-4'>
                                                        {actions.map((action, idx) => {
                                                            if (action.to) {
                                                                return (
                                                                    <Link
                                                                        key={idx}
                                                                        to={generateSchemaPath(action.to, result)}
                                                                        className='text-indigo-600 hover:text-indigo-900'
                                                                    >
                                                                        {action.icon && <action.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                                                                        {action.children}
                                                                    </Link>
                                                                );
                                                            } else {

                                                                return (
                                                                    <button
                                                                        key={action.type || 'button'}
                                                                        type={action.type || 'button'}
                                                                        onClick={() => action.onClick(result)}
                                                                        className='text-indigo-600 hover:text-indigo-900'
                                                                    >
                                                                        {action.icon && <action.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                                                                        {action.children}
                                                                    </button>
                                                                );
                                                            }
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
