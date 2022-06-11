import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import InputField from '../components/Fields/InputField';
import { IInputField } from '../components/Fields/types';
import { Controller } from 'react-hook-form';

const headerProps: IHeader = {
    title: 'Create Function',
}
const formProps: IForm = {
    action: '/function/',
    method: 'POST',
    fields: [
        // {
        //     name: 'function_name',
        //     label: 'Function Name',
        //     widget: InputField,
        // } as IInputField
    ],
}

export default function FunctionCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} >
                <InputField name='function_name' type='text' />
            </Form>
        </>
    )
}