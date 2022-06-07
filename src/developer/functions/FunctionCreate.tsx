import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import TextField from '../components/Fields/TextField';

const headerProps: IHeader = {
    title: 'Create Function',
}
const formProps: IForm = {
    action: '/function/',
    method: 'post',
    fields: [
        {
            fieldName: 'function_name',
            label: 'Function Name',
            widget: TextField,
        }
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