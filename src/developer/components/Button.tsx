import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { generateSchemaPath } from '../utils/routing';
import { SchemaContext } from './SchemaObjectWrapper';

import { IButton, ISchemaContext } from './types';

export default function Button(props: IButton) {
    const schemaContext: ISchemaContext = useContext(SchemaContext);

    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    if (props.to) {
        const to = generateSchemaPath(props.to, schemaContext.schema)
        return (
            <Link
                to={to}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {props.children}
            </Link>
        );
    } else {
        return (
            <button
                type={props.type || 'button'}
                onClick={handleOnClick}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {props.children}
            </button>
        );
    }
}