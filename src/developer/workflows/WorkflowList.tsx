import Header from '../components/Header';
import Table from '../components/Table';
import { ROUTES } from '../utils/routing';

const headerConfig = {
    title: 'Workflows',
}
const tableConfig = {
    path: '/workflow/',
    fields: [
        {
            fieldName: 'workflow_name',
            headerName: 'Workflow Name'
        },
    ],
    actions: [
        {
            children: 'View',
            to: ROUTES.workflow.detail,
        }
    ]
}

export default function WorkflowList() {
    return (
        <>
            <Header {...headerConfig} />
            <Table {...tableConfig} />
        </>
    )
}