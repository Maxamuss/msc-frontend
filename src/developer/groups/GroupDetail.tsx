import Form from '../components/Form';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs, ITable } from '../components/types';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import { IInputField } from '../components/Fields/types';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { ROUTES } from '../utils/routing';
import { useContext, useState } from 'react';
import Table from '../components/Table';
import { sendSchemaData } from '../utils/api';
import UserModal from './components/UserModal';

function TabConfiguration() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Group Configuration',
        subtitle: 'Configuration for this group.'
    }
    const formProps: IForm = {
        action: `/group/${schemaContext.schema.id}/`,
        method: 'PATCH',
        fields: [
            {
                name: 'name',
                fieldType: 'input',
                type: 'text',
                label: 'Group Name',

            } as IInputField
        ],
    }

    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    );
}
function TabUsers() {
    const schemaContext = useContext(SchemaContext);

    const [showModal, setShowModal] = useState(false);
    const [tableKey, setTableKey] = useState(1);

    const onSubmit = (data: any) => {
        sendSchemaData({
            path: `/group/${schemaContext.schema.id}/add-user/`,
            method: 'POST',
            data: data,
            setIsLoaded: () => { },
            setResults: () => { setShowModal(false); setTableKey(tableKey + 1) },
            setError: () => { },
        });
    }

    const removeGroup = (user: any) => {
        if (window.confirm(`Are you sure you want to remove ${user.email} from this group?`)) {
            sendSchemaData({
                path: `/group/${schemaContext.schema.id}/remove-user/`,
                method: 'POST',
                data: { user_id: user.id },
                setIsLoaded: () => { },
                setResults: () => { setShowModal(false); setTableKey(tableKey + 1) },
                setError: () => { },
            });
        }
    }

    const headerProps: IHeader = {
        title: 'Users',
        subtitle: 'Users belonging to this group.',
        tools: [
            {
                children: 'Add User',
                icon: PlusCircleIcon,
                onClick: () => { setShowModal(true) }
            }
        ]
    }

    const tableProps: ITable = {
        path: `/group/${schemaContext.schema.id}/users/`,
        fields: [
            {
                fieldName: 'email',
                headerName: 'Email'
            },
            {
                fieldName: 'first_name',
                headerName: 'First Name'
            },
            {
                fieldName: 'last_name',
                headerName: 'Last Name'
            },
        ],
        actions: [
            {
                children: 'Remove',
                onClick: (row: any) => removeGroup(row),
            },
            {
                children: 'View User',
                to: ROUTES.user.detail,
            },
        ]
    }

    return (
        <>
            <Header {...headerProps} />
            <Table key={tableKey} {...tableProps} />
            <UserModal
                onSubmit={onSubmit}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}
function TabPermissions() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Permissions',
        subtitle: 'Permissions assigned to this group.'
    }
    const tableProps: ITable = {
        path: `/group/${schemaContext.schema.id}/permissions/`,
        fields: [
            {
                fieldName: 'name',
                headerName: 'Permision Name'
            }
        ],
        actions: [
            {
                children: 'View',
                to: ROUTES.permission.detail,
            }
        ]
    }

    return (
        <>
            <Header {...headerProps} />
            <Table {...tableProps} />
        </>
    );
}
const headerProps: IHeader = {
    title: 'Group: ${name}',
    tools: [
        {
            children: 'Delete',
            icon: TrashIcon,
            to: ROUTES.group.delete,
        }
    ]
}
const tabsProps: ITabs = {
    tabs: [
        {
            tabName: 'Configuration',
            tabContent: TabConfiguration,
        },
        {
            tabName: 'Users',
            tabContent: TabUsers,
        },
        {
            tabName: 'Permissions',
            tabContent: TabPermissions,
        },
    ]
}

export default function GroupDetail() {
    return (
        <SchemaObjectWrapper path='/group/${id}/'>
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}