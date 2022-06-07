import TextField from '../components/Fields/TextField';
import Form from '../components/Form';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs } from '../components/types';
import SchemaObjectWrapper from '../components/SchemaObjectWrapper';

function TabConfiguration() {
    const headerProps: IHeader = {
        title: 'Model Configuration',
        subtitle: 'Configuration for this model.'
    }
    const formProps: IForm = {
        action: '/modelschema/',
        method: 'POST',
        fields: [
            {
                fieldName: 'model_name',
                label: 'Model Name',
                widget: TextField,
            }
        ],
    }

    return (
        <>
            <Header key='header' {...headerProps} />
            {/* <Form key='form' {...formProps} /> */}
        </>
    );
}
function TabFields() {
    const headerProps: IHeader = {
        title: 'Model Fields',
        subtitle: 'Fields belonging to this model.'
    }

    return (
        <Header key='header' {...headerProps} />
    );
}

const headerProps: IHeader = {
    title: 'Function: ${function_name}',
}
const tabsProps: ITabs = {
    tabs: [
        {
            tabName: 'Configuration',
            tabContent: TabConfiguration,
        },
        {
            tabName: 'Implementation',
            tabContent: TabFields,
        },
    ]
}

export default function FunctionDetail() {
    return (
        <SchemaObjectWrapper
            path='/function/${id}/'
        >
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}