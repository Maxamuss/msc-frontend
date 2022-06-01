import Header from '../components/Header';
import { IHeader, IForm } from '../components/types';

const headerProps: IHeader = {
    title: 'Add Model',
}

export default function ModelSchemaCreate() {
    return (
        <>
            <Header {...headerProps} />
        </>
    )
}