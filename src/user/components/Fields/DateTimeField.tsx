import { IInputField } from './types';
import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';

export default function DateTimeField(props: IInputField) {
    console.log(props.default ?? props.value)
    return (
        <div>
            <BaseLabel {...props} />
            <div className="mt-1">
                <input
                    {...props}
                    type="datetime-local"
                    defaultValue={props.default ?? props.value}
                    className="mt-1 block w-full border-gray-300 rounded shadow-sm text-gray-900 sm:text-sm focus:ring-primary focus:border-primary"
                />
            </div>
            <BaseHelpText {...props} />
        </div>
    );
}