import { PlusCircleIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Table from '../components/Table';
import { ROUTES } from '../utils/routing';

const headerConfig = {
    title: 'Function',
    tools: [
        {
            children: 'Add Function',
            icon: PlusCircleIcon,
            to: ROUTES.function.create
        }
    ]
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
            text: 'View',
            to: ROUTES.function.detail,
            keys: ['id'],
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