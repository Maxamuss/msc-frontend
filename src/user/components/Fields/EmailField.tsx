import { IInputField } from './types';
import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';

export default function EmailField(props: IInputField) {
    return (
        <div>
            <BaseLabel {...props} />
            <div className="mt-1">
                <input
                    {...props}
                    type="email"
                    defaultValue={props.default}
                    className="mt-1 block w-full border-gray-300 rounded shadow-sm text-gray-900 sm:text-sm focus:ring-primary focus:border-primary"
                />
            </div>
            <BaseHelpText {...props} />
        </div>
    );
}