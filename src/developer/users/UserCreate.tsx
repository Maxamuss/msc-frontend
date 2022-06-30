import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { IInputField } from '../components/Fields/types';
import { ROUTES } from '../utils/routing';

const headerProps: IHeader = {
    title: 'Add User',
}
const formProps: IForm = {
    action: '/user/',
    method: 'POST',
    to: ROUTES.user.detail,
    fields: [
        {
            name: 'email',
            fieldType: 'input',
            type: 'text',
            label: 'Email',

        } as IInputField,
        {
            name: 'first_name',
            fieldType: 'input',
            type: 'text',
            label: 'First Name',

        } as IInputField,
        {
            name: 'last_name',
            fieldType: 'input',
            type: 'text',
            label: 'Last Name',

        } as IInputField,
    ],
}

export default function UserCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}