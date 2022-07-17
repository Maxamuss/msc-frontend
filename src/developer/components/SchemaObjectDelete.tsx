import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import { IHeader, ISchemaObjectDelete } from '../components/types';
import SchemaObjectWrapper from '../components/SchemaObjectWrapper';
import Button from './Button';
import { deleteSchemaData } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { inject } from '../utils/render';

export default function SchemaObjectDelete(props: ISchemaObjectDelete) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let params = useParams();
    const endpoint = `/${props.resource}/` + inject('${id}/', params);

    const handleDelete = () => {
        deleteSchemaData({
            path: endpoint,
            navigate: navigate,
            resource: props.resource,
            dispatch: dispatch,
        });
    }

    const headerProps: IHeader = {
        title: 'Delete ' + `${props.resourceName}` + ': ${' + `${props.resourcePrimaryField}` + '}',
        subtitle: `Are you sure you want to delete this ${props.resourceName} ? `
    }

    return (
        <SchemaObjectWrapper path={endpoint}>
            <>
                <Header {...headerProps} />
                <Button onClick={handleDelete} >Yes, I'm sure</Button>
            </>
        </SchemaObjectWrapper >
    )
}