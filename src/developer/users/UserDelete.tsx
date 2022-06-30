import SchemaObjectDelete from "../components/SchemaObjectDelete";

export default function UserDelete() {
    return <SchemaObjectDelete
        resource='user'
        resourceName='User'
        resourcePrimaryField='email'
    />
}