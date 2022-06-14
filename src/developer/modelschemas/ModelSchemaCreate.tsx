import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';

const headerProps: IHeader = {
    title: 'Model Detail',
}
const formProps: IForm = {
    action: '/modelschema/',
    method: 'POST',
    fields: [
        {
            name: 'model_name',
            fieldType: 'input',
            type: 'text',
            label: 'Model Name',

        } as IInputField
    ],
    to: ROUTES.modelschema.detail,
}

export default function ModelSchemaCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}