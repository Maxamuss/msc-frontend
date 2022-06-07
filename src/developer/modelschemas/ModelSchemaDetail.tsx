import TextField from '../components/Fields/TextField';
import Form from '../components/Form';
import Header from '../components/Header';
import SchemaObjectWrapper from '../components/SchemaObjectWrapper';
import Table from '../components/Table';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs, ITable } from '../components/types';
import { ROUTES } from '../utils/routing';

function TabConfiguration() {
    const headerProps: IHeader = {
        title: 'Model Configuration',
        subtitle: 'Configuration for this model.'
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

    return (
        <>
            <Header key='header' {...headerProps} />
            <Form key='form' {...formProps} />
        </>
    );
}
function TabFields() {
    const headerProps: IHeader = {
        title: 'Model Fields',
        subtitle: 'Fields belonging to this model.'
    }

    return (
        <Header key='header' {...headerProps} />
    );
}
function TabPages() {
    const headerProps: IHeader = {
        title: 'Model Pages',
        subtitle: 'Pages belonging to this model.'
    }
    const tableProps: ITable = {
        path: '/modelschema/',
        filterField: 'pages',
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