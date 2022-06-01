import { IFormField } from '../../types';

export default function BaseLabel(props: IFormField) {
    return (
        <label htmlFor={props.id} className="block text-sm font-medium text-blue-gray-900 capitalize">
            {props.label}
        </label>
    );
}