import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm, ISchemaObjectDelete } from '../components/types';
import { ROUTES } from '../utils/routing';
import { IInputField } from '../components/Fields/types';
import SchemaObjectWrapper from '../components/SchemaObjectWrapper';



export default function SchemaObjectDelete(props: ISchemaObjectDelete) {
    const headerProps: IHeader = {
        title: 'Delete ' + `${props.resourceName}` + ': ${' + `${props.resourcePrimaryField}` + '}',
        subtitle: `Are you sure you want to delete this ${props.resourceName}?`
    }

    return (
        <SchemaObjectWrapper path={`/${props.resource}/` + '${id}/'}>
            <>
                <Header {...headerProps} />
            </>
        </SchemaObjectWrapper >
    )
}