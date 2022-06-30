import { PlusCircleIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Table from '../components/Table';
import { ROUTES } from '../utils/routing';

const headerConfig = {
    title: 'Users',
    tools: [
        {
            children: 'Add User',
            icon: PlusCircleIcon,
            to: ROUTES.user.create
        }
    ]
}
const tableConfig = {
    path: '/user/',
    fields: [
        {
            fieldName: 'email',
            headerName: 'Email'
        },
        {
            fieldName: 'first_name',
            headerName: 'First Name'
        },
        {
            fieldName: 'last_name',
            headerName: 'Last Name'
        },
    ],
    actions: [
        {
            children: 'View',
            to: ROUTES.user.detail,
        }
    ]
}

export default function UserList() {
    return (
        <>
            <Header {...headerConfig} />
            <Table {...tableConfig} />
        </>
    )
}