import Header from '../components/Header';
import Table from '../components/Table';

const tableConfig = {
    fields: [
        {
            fieldName: 'function_name',
            headerName: 'Function Name'
        }
    ]
}

export default function FunctionList() {
    return (
        <>
            <Header title='Functions' />
            <Table {...tableConfig} />
        </>
    )
}