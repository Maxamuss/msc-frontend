import { IBaseLabel } from '../types';

export default function BaseLabel(props: IBaseLabel) {
    return (
        <>
            {props.label &&
                <label htmlFor={props.id} className="block text-sm font-medium text-blue-gray-900 capitalize">
                    {props.label}
                </label>
            }
        </>
    );
}