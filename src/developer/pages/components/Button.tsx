interface IButton {
    text?: string;
    icon?: string;
    to?: string
}

export default function Button(props: IButton) {
    return (
        <div className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
            {/* {props.icon && <props.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />} */}
            {props.text}
        </div>
    );
}
