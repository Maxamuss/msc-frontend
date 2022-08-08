import { PlusCircleIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Table from '../components/Table';
import { ROUTES } from '../utils/routing';

const headerConfig = {
    title: 'Function',
}
const tableConfig = {
    path: '/function/',
    fields: [
        {
            fieldName: 'function_name',
            headerName: 'Function Name'
        }
    ],
    actions: [
        {
            children: 'View',
            to: ROUTES.function.detail,
        }
    ]
}

export default function FunctionList() {
    return (
        <>
            <Header {...headerConfig} />
            <Table {...tableConfig} />
        </>
    )
}