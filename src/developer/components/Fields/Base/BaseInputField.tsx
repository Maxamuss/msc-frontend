import { IFormField } from '../../types';
import BaseHelpText from './BaseHelpText';
import BaseLabel from './BaseLabel';


export default function BaseInputField(props: IFormField) {
    return (
        <div>
            <BaseLabel {...props} />
            <div className="mt-1">
                <input
                    {...props}
                    className="mt-1 block w-full border-gray-300 rounded shadow-sm text-gray-900 sm:text-sm focus:ring-primary focus:border-primary"
                />
            </div>
            <BaseHelpText {...props} />
        </div>
    );
}