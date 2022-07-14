import TextField from '../components/Fields/InputField';
import Form from '../components/Form';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs } from '../components/types';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import InputField from '../components/Fields/InputField';
import { IInputField } from '../components/Fields/types';
import { ROUTES } from '../utils/routing';
import { TrashIcon } from '@heroicons/react/outline';
import { useContext } from 'react';

function TabAccountDetails() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Account Details',
        subtitle: 'Account information for this user.'
    }
    const formProps: IForm = {
        action: `/user/${schemaContext.schema.id}/`,
        method: 'PATCH',
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

    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    );
}
function TabGroups() {
    const headerProps: IHeader = {
        title: 'Groups',
    }

    return (
        <Header {...headerProps} />
    );
}
function TabPermissions() {
    const headerProps: IHeader = {
        title: 'Permissions',
    }

    return (
        <Header {...headerProps} />
    );
}

const headerProps: IHeader = {
    title: 'User: ${email}',
    tools: [
        {
            children: 'Delete',
            icon: TrashIcon,
            to: ROUTES.user.delete,
        }
    ]
}
const tabsProps: ITabs = {
    tabs: [
        {
            tabName: 'Account Details',
            tabContent: TabAccountDetails,
        },
        {
            tabName: 'Groups',
            tabContent: TabGroups,
        },
        {
            tabName: 'Permissions',
            tabContent: TabPermissions,
        },
    ]
}

export default function UserDetail() {
    return (
        <SchemaObjectWrapper path='/user/${id}/'>
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}