import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext, renderText } from '../core/Page';

import { populateTo } from '../utils/routing';
import { IButton } from './types';

export default function Button(props: IButton) {
    const pageContext = useContext(PageContext);

    if (props.to) {
        return (
            <Link
                to={populateTo(props.to, pageContext.model, pageContext.resource)}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {renderText(props.text, pageContext.resource, pageContext.model)}
            </Link>
        )
    } else {
        return (
            <button
                type={props.type || 'button'}
                onClick={() => { if (props.onClick) props.onClick() }}
                disabled={props.disabled ?? false}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {renderText(props.text, pageContext.resource, pageContext.model)}
            </button>
        )
    }
}