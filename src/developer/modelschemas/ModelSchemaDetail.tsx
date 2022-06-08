import { useContext, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';

import TextField from '../components/Fields/TextField';
import Form from '../components/Form';
import Header from '../components/Header';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import Table from '../components/Table';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs, ITable, ISchemaContext } from '../components/types';
import { ROUTES } from '../utils/routing';
import FieldModal from './components/FieldModal';

function TabConfiguration() {
    const schemaContext: ISchemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Model Configuration',
        subtitle: 'Configuration for this model.'
    }
    const formProps: IForm = {
        action: `/modelschema/${schemaContext.schema.id}/`,
        method: 'PUT',
        fields: [
            {
                fieldName: 'model_name',
                label: 'Model Name',
                widget: TextField,
            }
        ],
    }

    return (
        <>
            <Header key='header' {...headerProps} />
            <Form key='form' {...formProps} />
        </>
    );
}
function TabFields() {
    const [showFieldModal, setShowFieldModal] = useState(false);

    const openModal = (field: any) => {
        setShowFieldModal(true)
    }

    const schemaContext = useContext(SchemaContext);
    const headerProps: IHeader = {
        title: 'Model Fields',
        subtitle: 'Fields defined for this model.',
        tools: [
            {
                children: 'Add Field',
                icon: PlusCircleIcon,
                onClick: () => { openModal(null) }
            }
        ]
    }
    const tableProps: ITable = {
        path: '',
        data: schemaContext.schema.fields || [],
        fields: [
            {
                fieldName: 'field_name',
                headerName: 'Field Name',
            },
            {
                fieldName: 'field_type',
                headerName: 'Field Type',
            },
            {
                fieldName: 'required',
                headerName: 'Required',
            },
        ],
        tools: [
            {
                children: 'Edit',
                onClick: () => { openModal(null) }
            }
        ]
    }

    return (
        <>
            <Header key='header' {...headerProps} />
            <Table key='table' {...tableProps} />
            <FieldModal key='modal' isOpen={showFieldModal} onClose={() => setShowFieldModal(false)} />
        </>
    );
}
function TabPages() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Model Pages',
        subtitle: 'Pages belonging to this model.'
    }
    const tableProps: ITable = {
        path: '/page/',
        fields: [
            {
                fieldName: 'page_name',
                headerName: 'Page Name'
            }
        ],
        actions: [
            {
                text: 'Edit',
                to: ROUTES.modelschema.detail,
                keys: ['id']
            }
        ]
    }

    return (
        <>
            <Header key='header' {...headerProps} />
            <Table key='table' {...tableProps} />
        </>
    );
}
function TabWorkflows() {
    const headerProps: IHeader = {
        title: 'Model Workflows',
        subtitle: 'Workflows belonging to this model.'
    }

    return (
        <Header key='header' {...headerProps} />
    );
}
function TabPermissions() {
    const headerProps: IHeader = {
        title: 'Model Permissions',
        subtitle: 'Permissions belonging to this model.'
    }

    return (
        <Header key='header' {...headerProps} />
    );
}

const headerProps: IHeader = {
    title: 'Model: ${model_name}',
}
const tabsProps: ITabs = {
    tabs: [
        {
            tabName: 'Configuration',
            tabContent: TabConfiguration,
        },
        {
            tabName: 'Fields',
            tabContent: TabFields,
        },
        {
            tabName: 'Pages',
            tabContent: TabPages,
        },
        {
            tabName: 'Workflows',
            tabContent: TabWorkflows,
        },
        {
            tabName: 'Permissions',
            tabContent: TabPermissions,
        },
    ]
}

export default function ModelSchemaDetail() {
    return (
        <SchemaObjectWrapper
            path='/modelschema/${id}/'
            fields={['model_name']}
        >
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}