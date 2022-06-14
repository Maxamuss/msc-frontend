import { PlusCircleIcon } from '@heroicons/react/outline';

import Header from '../components/Header';
import Table from '../components/Table';
import { IHeader, ITable } from '../components/types';
import { ROUTES } from '../utils/routing';

const headerProps: IHeader = {
    title: 'Packages',
    tools: [
        {
            children: 'Add Package',
            icon: PlusCircleIcon,
            to: ROUTES.package.create,
        }
    ]
}
const tableProps: ITable = {
    path: '/package/',
    fields: [
        {
            fieldName: 'package_name',
            headerName: 'Package Name'
        }
    ],
    actions: []
}

export default function PackageList() {
    return (
        <>
            <Header {...headerProps} />
            <Table {...tableProps} />
        </>
    )
}