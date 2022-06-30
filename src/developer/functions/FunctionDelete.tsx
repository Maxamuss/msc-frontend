import SchemaObjectDelete from '../components/SchemaObjectDelete';

export default function FunctionDelete() {
    return <SchemaObjectDelete
        resource='function'
        resourceName='function'
        resourcePrimaryField='function_name'
    />
}