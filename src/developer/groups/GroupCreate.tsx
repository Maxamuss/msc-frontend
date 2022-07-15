import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';

const headerProps: IHeader = {
    title: 'Create Group',
}
const formProps: IForm = {
    action: '/group/',
    method: 'POST',
    fields: [
        {
            name: 'name',
            fieldType: 'input',
            type: 'text',
            label: 'Group Name',

        } as IInputField
    ],
    to: ROUTES.group.detail,
}

export default function GroupCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}