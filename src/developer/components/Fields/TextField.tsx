import { IFormField } from '../types';
import BaseInputField from './Base/BaseInputField';

export default function TextField(props: IFormField) {
    return <BaseInputField type='text' {...props} />
}