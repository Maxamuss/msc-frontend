import SchemaObjectDelete from '../components/SchemaObjectDelete';

export default function ModelSchemaDelete() {
    return <SchemaObjectDelete
        resource='modelschema'
        resourceName='Model'
        resourcePrimaryField='model_name'
    />
}