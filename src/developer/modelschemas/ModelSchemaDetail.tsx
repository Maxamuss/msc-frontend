import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { ROUTES } from '../utils/routing';
import TextField from '../components/Fields/TextField';

const headerProps: IHeader = {
    title: 'Model Detail',
}
const formProps: IForm = {
    action: '',
    fields: [
        {
            fieldName: 'name',
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