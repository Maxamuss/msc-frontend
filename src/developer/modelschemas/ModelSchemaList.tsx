import { PlusCircleIcon } from '@heroicons/react/outline';

import Header from '../components/Header';
import Table from '../components/Table';
import { IHeader, ITable } from '../components/types';
import { ROUTES } from '../utils/routing';

const headerProps: IHeader = {
    title: 'Models',
    tools: [
        {
            children: 'Add Model',
            icon: PlusCircleIcon,
            to: ROUTES.modelschema.create
        }
    ]
}
const tableProps: ITable = {
    path: '/modelschema/',
    fields: [
        {
            fieldName: 'model_name',
            headerName: 'Model Name'
        }
    ],
    actions: [
        {
            text: 'View',
            to: ROUTES.modelschema.detail,
            keys: ['id']
        }
    ]
}

export default function ModelSchemaList() {
    return (
        <>
            <Header {...headerProps} />
            <Table {...tableProps} />
        </>
    )
}