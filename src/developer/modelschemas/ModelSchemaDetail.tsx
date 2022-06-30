import { useContext, useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';

import Form from '../components/Form';
import Header from '../components/Header';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import Table from '../components/Table';
import Tabs from '../components/Tabs';
import FieldModal, { IModelSchemaField } from './components/FieldModal';
import { IHeader, IForm, ITabs, ITable } from '../components/types';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';
import { sendSchemaData } from '../utils/api';

function TabConfiguration() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Model Configuration',
        subtitle: 'Configuration for this model.'
    }
    const formProps: IForm = {
        action: `/modelschema/${schemaContext.schema.id}/`,
        method: 'PUT',
        fields: [
            {
                name: 'model_name',
                fieldType: 'input',
                type: 'text',
                label: 'Model Name',

            } as IInputField
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
    const schemaContext = useContext(SchemaContext);

    const [showFieldModal, setShowFieldModal] = useState(false);
    const [modalField, setModalField] = useState(null);

    const [formResult, setFormResult] = useState(null);
    const [error, setError] = useState(null);

    const openModal = (field: any) => {
        setModalField(field);
        setShowFieldModal(true);
    }

    const onSubmit = (data: any) => {
        let schema = schemaContext.schema;
        let selectedField: IModelSchemaField | null = modalField;

        if (schema.fields === undefined) {
            schema.fields = [];
        }

        if (selectedField === null) {
            schema.fields.push(data);
        } else {
            let fields = schema.fields;
            schema.fields = fields.filter((field: IModelSchemaField) => field.field_name !== selectedField!.field_name);
            schema.fields.push(data);
        }

        sendSchemaData({
            path: `/modelschema/${schemaContext.schema.id}/`,
            method: 'PUT',
            data: schema,
            setIsLoaded: () => { },
            setResults: setFormResult,
            setError: setError,
        });

    }

    useEffect(() => {
        if (formResult && !error) {
            schemaContext.setSchema(formResult);
            setShowFieldModal(false);
        }
    }, [formResult, error])

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
        data: schemaContext.schema.fields ?? [],
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
        actions: [
            {
                children: 'Edit',
                onClick: (result: any) => { openModal(result) }
            }
        ]
    }

    return (
        <>
            <Header {...headerProps} />
            <Table {...tableProps} />
            <FieldModal
                onSubmit={onSubmit}
                fieldData={modalField}
                isOpen={showFieldModal}
                onClose={() => setShowFieldModal(false)}
                key={modalField ? modalField['field_name'] : ''}
            />
        </>
    );
}
function TabPages() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Model Pages',
        subtitle: 'Pages belonging to this model.',
        tools: [
            {
                children: 'Create Page',
                icon: PlusCircleIcon,
                to: ROUTES.page.create,
            }
        ]
    }
    const tableProps: ITable = {
        path: `/page/>/${schemaContext.schema.id}/`,
        fields: [
            {
                fieldName: 'page_name',
                headerName: 'Page Name'
            }
        ],
        actions: [
            {
                children: 'Edit',
                to: ROUTES.page.detail,
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
function TabWorkflows() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Model Workflows',
        subtitle: 'Workflows belonging to this model.',
        tools: [
            {
                children: 'Create Workflow',
                icon: PlusCircleIcon,
                to: ROUTES.workflow.create,
            }
        ]
    }
    const tableProps: ITable = {
        path: `/workflow/>/${schemaContext.schema.id}/`,
        fields: [
            {
                fieldName: 'workflow_name',
                headerName: 'Workflow Name'
            }
        ],
        actions: [
            {
                children: 'Edit',
                to: ROUTES.workflow.detail,
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
    tools: [
        {
            children: 'Delete',
            icon: TrashIcon,
            to: ROUTES.modelschema.delete,
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
        <SchemaObjectWrapper path='/modelschema/${id}/'>
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}