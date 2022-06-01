import { Link } from 'react-router-dom';

import { IButton } from './types';

export default function Button(props: IButton) {

    const handleOnClick = () => {

    }

    if (props.to) {
        return (
            <Link
                to={props.to}
                key={props.text}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {props.text}
            </Link>
        );
    } else {
        return (
            <button
                key={props.text}
                type={props.type || 'button'}
                // onClick={props.onClick || handleOnClick}
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
                {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                {props.text}
            </button>
        );
    }
}