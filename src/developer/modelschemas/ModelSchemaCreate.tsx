import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import TextField from '../components/Fields/TextField';

const headerProps: IHeader = {
    title: 'Model Detail',
}
const formProps: IForm = {
    action: '/modelschema/',
    method: 'post',
    fields: [
        {
            fieldName: 'model_name',
            label: 'Model Name',
            widget: TextField,
        }
    ],
}

export default function ModelSchemaDetail() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}