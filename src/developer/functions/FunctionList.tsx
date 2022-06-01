import Header from '../components/Header';
import Table from '../components/Table';

const tableConfig = {
    path: '',
    fields: [
        {
            fieldName: 'function_name',
            headerName: 'Function Name'
        }
    ],
    actions: []
}

export default function FunctionList() {
    return (
        <>
            <Header title='Functions' />
            <Table {...tableConfig} />
        </>
    )
}