import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';
import { ISelectField } from './types';


export default function SelectField(props: ISelectField) {
    let value = props.value;
    // Convert bool to string.
    if (typeof props.value === 'boolean') {
        if (props.value) {
            value = 'yes'
        } else {
            value = 'fasle'
        }
    }

    return (
        <div>
            <BaseLabel {...props} />
            <select
                {...props}
                value={value}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value=''>-------</option>
                {props.options && props.options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
            <BaseHelpText {...props} />
        </div>
    );
}