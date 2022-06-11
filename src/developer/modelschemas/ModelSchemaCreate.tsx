import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import TextField from '../components/Fields/InputField';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';
import InputField from '../components/Fields/InputField';

const headerProps: IHeader = {
    title: 'Model Detail',
}
const formProps: IForm = {
    action: '/modelschema/',
    method: 'POST',
    fields: [
        {
            name: 'model_name',
            widget: InputField,
            type: 'text',
            label: 'Model Name',

        } as IInputField
    ],
    navigate: { to: ROUTES.modelschema.detail, keys: ['id'] }
}

export default function ModelSchemaCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}