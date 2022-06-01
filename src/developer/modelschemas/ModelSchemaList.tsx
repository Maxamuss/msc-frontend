import { PlusCircleIcon } from '@heroicons/react/outline';

import Header from '../components/Header';
import Table from '../components/Table';
import { IHeader, ITable } from '../components/types';
import ROUTES from '../core/routing';

const headerProps: IHeader = {
    title: 'Models',
    tools: [
        {
            text: 'Add Model',
            icon: PlusCircleIcon,
            to: ROUTES.modelschema.create
        }
    ]
}
const tableProps: ITable = {
    fields: [
        {
            fieldName: 'name',
            headerName: 'Model Name'
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