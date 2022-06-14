import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';
import SchemaObjectWrapper from '../components/SchemaObjectWrapper';

const headerProps: IHeader = {
    title: 'Delete Model: ${model_name}',
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
}

export default function ModelSchemaDelete() {
    return (
        <SchemaObjectWrapper
            path='/modelschema/${id}/'
            fields={['model_name']}
        >
            <>
                <Header {...headerProps} />
            </>
        </SchemaObjectWrapper>
    )
}