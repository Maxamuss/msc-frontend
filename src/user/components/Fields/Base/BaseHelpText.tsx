import { IBaseHelpText } from '../types';

export default function BaseHelpText(props: IBaseHelpText) {
    return (
        <>
            {props.help_text &&
                <p className="mt-1 text-sm text-blue-gray-500">
                    {props.help_text}
                </p>
            }
        </>
    );
}