import Form from '../components/Form';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { IHeader, IForm, ITabs } from '../components/types';
import SchemaObjectWrapper, { SchemaContext } from '../components/SchemaObjectWrapper';
import { IInputField } from '../components/Fields/types';
import { TrashIcon } from '@heroicons/react/outline';
import { ROUTES } from '../utils/routing';
import { useContext } from 'react';

function TabConfiguration() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Function Configuration',
        subtitle: 'Configuration for this function.'
    }
    const formProps: IForm = {
        action: `/function/${schemaContext.schema.id}/`,
        method: 'PATCH',
        fields: [
            {
                name: 'function_name',
                fieldType: 'input',
                type: 'text',
                label: 'Function Name',

            } as IInputField
        ],
    }

    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    );
}
function TabImplementation() {
    const schemaContext = useContext(SchemaContext);

    const headerProps: IHeader = {
        title: 'Fucntion Implementation',
        subtitle: 'Implementation of this function in Python 3.'
    }
    const formProps: IForm = {
        action: `/function/${schemaContext.schema.id}/`,
        method: 'PATCH',
        fields: [
            {
                name: 'function_name',
                fieldType: 'code',
                type: 'text',
                label: 'Function Name',

            } as IInputField
        ],
    }

    return (
        <>
            <Header key='header' {...headerProps} />
            <Form {...formProps} />
        </>
    );
}

const headerProps: IHeader = {
    title: 'Function: ${function_name}',
    tools: [
        {
            children: 'Delete',
            icon: TrashIcon,
            to: ROUTES.function.delete,
        }
    ]
}
const tabsProps: ITabs = {
    tabs: [
        {
            tabName: 'Configuration',
            tabContent: TabConfiguration,
        },
        {
            tabName: 'Implementation',
            tabContent: TabImplementation,
        },
    ]
}

export default function FunctionDetail() {
    return (
        <SchemaObjectWrapper path='/function/${id}/'>
            <>
                <Header {...headerProps} />
                <Tabs {...tabsProps} />
            </>
        </SchemaObjectWrapper>
    )
}