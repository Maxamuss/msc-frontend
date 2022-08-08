import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';
import { ISelectField } from './types';


export default function SelectField(props: ISelectField) {
    console.log(props.value)
    return (
        <div>
            <BaseLabel {...props} />
            <select
                {...props}
                value={props.allowMultiple ? [...props.value] : props.value}
                multiple={props.allowMultiple}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {!props.allowMultiple && <option value=''>-------</option>}
                {props.options && props.options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
            <BaseHelpText {...props} />
        </div >
    );
}