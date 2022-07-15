import SchemaObjectDelete from '../components/SchemaObjectDelete';

export default function GroupDelete() {
    return <SchemaObjectDelete
        resource='group'
        resourceName='group'
        resourcePrimaryField='name'
    />
}