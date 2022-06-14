import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { IInputField } from '../components/Fields/types';

const headerProps: IHeader = {
    title: 'Create Function',
}
const formProps: IForm = {
    action: '/function/',
    method: 'POST',
    fields: [
        {
            name: 'function_name',
            fieldType: 'input',
            type: 'text',
            label: 'Function Name',

        } as IInputField
    ],
}

export default function FunctionCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}