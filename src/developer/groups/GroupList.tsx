import { PlusCircleIcon } from '@heroicons/react/outline';

import Header from '../components/Header';
import Table from '../components/Table';
import { IHeader, ITable } from '../components/types';
import { ROUTES } from '../utils/routing';

const headerProps: IHeader = {
    title: 'Groups',
    tools: [
        {
            children: 'Add Group',
            icon: PlusCircleIcon,
            to: ROUTES.group.create,
        }
    ]
}
const tableProps: ITable = {
    path: '/group/',
    fields: [
        {
            fieldName: 'name',
            headerName: 'Group Name'
        }
    ],
    actions: [
        {
            children: 'View',
            to: ROUTES.group.detail,
        }
    ]
}

export default function GroupList() {
    return (
        <>
            <Header {...headerProps} />
            <Table {...tableProps} />
        </>
    )
}