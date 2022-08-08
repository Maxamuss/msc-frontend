import { IBaseErrorText } from '../types';

export default function BaseErrorText(props: IBaseErrorText) {
    return (
        <div className="text-sm text-red-600">
            {props.error?.type === 'required' && `${props.label} is required`}
            {props.error?.type === 'pattern' && (`${props.label} can only contain ` + (props.patternMsg ? props.patternMsg : `lower case letters and underscores`))}
        </div>
    );
}