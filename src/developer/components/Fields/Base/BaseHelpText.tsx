import { IBaseHelpText } from '../types';

export default function BaseHelpText(props: IBaseHelpText) {
    return (
        <>
            {props.helpText &&
                <p className="mt-1 text-sm text-blue-gray-500">
                    {props.helpText}
                </p>
            }
        </>
    );
}