import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';

import Form from '../components/Form';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs, ITable } from '../components/types';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import { IInputField } from '../components/Fields/types';
import { ROUTES } from '../utils/routing';
import { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import GroupModal from './components/GroupModal';
import { sendSchemaData } from '../utils/api';

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
    const schemaContext = useContext(SchemaContext);

    const [showModal, setShowModal] = useState(false);
    const [tableKey, setTableKey] = useState(1);

    const onSubmit = (data: any) => {
        sendSchemaData({
            path: `/user/${schemaContext.schema.id}/add-to-group/`,
            method: 'POST',
            data: data,
            setIsLoaded: () => { },
            setResults: () => { setShowModal(false); setTableKey(tableKey + 1) },
            setError: () => { },
        });
    }

    const removeFromGroup = (group: any) => {
        if (window.confirm(`Are you sure you want to remove this user from the ${group.name} group?`)) {
            sendSchemaData({
                path: `/user/${schemaContext.schema.id}/remove-from-group/`,
                method: 'POST',
                data: { group_id: group.id },
                setIsLoaded: () => { },
                setResults: () => { setShowModal(false); setTableKey(tableKey + 1) },
                setError: () => { },
            });
        }
    }

    const headerProps: IHeader = {
        title: 'Groups',
        subtitle: 'Groups this user belongs to.',
        tools: [
            {
                children: 'Add To Group',
                icon: PlusCircleIcon,
                onClick: () => setShowModal(true),
            }
        ]
    }
    const tableProps: ITable = {
        path: `/user/${schemaContext.schema.id}/groups/`,
        fields: [
            {
                fieldName: 'name',
                headerName: 'Group Name'
            }
        ],
        actions: [
            {
                children: 'Remove From Group',
                onClick: (row: any) => removeFromGroup(row),
            },
            {
                children: 'View Group',
                to: ROUTES.group.detail,
            },
        ]
    }

    return (
        <>
            <Header {...headerProps} />
            <Table key={tableKey} {...tableProps} />
            <GroupModal
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
        subtitle: 'Permissions this user belongs has.'
    }
    const tableProps: ITable = {
        path: `/user/${schemaContext.schema.id}/permissions/`,
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