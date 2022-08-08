import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import { IForm } from './types';

import TextField from './Fields/TextField';
import FloatField from './Fields/FloatField';
import DateTimeField from './Fields/DateTimeField';
import ForeignKeyField from './Fields/ForeignKeyField';
import { PageContext } from '../core/Page';
import { populateTo } from '../utils/routing';
import { sendModelObject } from '../utils/api';
import EmailField from './Fields/EmailField';
import DateField from './Fields/DateField';

const fieldWidgets: any = {
    'text': TextField,
    'email': EmailField,
    'float': FloatField,
    'date': DateField,
    'datetime': DateTimeField,
    'fk': ForeignKeyField,
}

export default function Form(props: IForm) {
    let navigate = useNavigate();
    const pageContext = useContext(PageContext);

    const { control, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResult, setFormResult] = useState(null);
    const [error, setError] = useState(null);

    const fields = props.fields ?? pageContext?.model?.getFields() ?? [];

    const onSubmit = (data: any) => {
        setIsSubmitting(true);

        const updatedData = {
            ...pageContext.resource,
            ...data,
        }

        sendModelObject(
            updatedData,
            props.method ?? 'POST',
            setFormResult,
            setIsSubmitting,
            setError,
            pageContext.model,
            pageContext.modelId,
        );
    }

    useEffect(() => {
        if (formResult) {

            if (props.to) {
                navigate(populateTo(props.to, pageContext.model, formResult));
            }

            setIsSubmitting(false);
            // if (props.to) {
            //     navigate(generateSchemaPath(props.to, formResult));
            // } else {
            //     schemaContext.setSchema(formResult);
            // }
        }
    }, [formResult])

    return (
        <div className='bg-white overflow-hidden border-200 border-b p-4'>
            {error && <div>{JSON.stringify(error)}</div>}
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {props.method !== 'DELETE' && fields.map((fieldConfig: any) => {
                        if (fieldWidgets[fieldConfig.field_type] !== 'undefined') {
                            const FieldWidget = fieldWidgets[fieldConfig.field_type];
                            const data = pageContext.resource ?? {};

                            const fieldProps = {
                                id: fieldConfig.id,
                                label: fieldConfig.label,
                                help_text: fieldConfig.help_text,
                                modelschema_id: fieldConfig.modelschema_id,
                            }

                            let defaultValue;

                            if (fieldConfig.field_type === 'datetime') {
                                defaultValue = new Date(Date.parse(data[fieldConfig.name]));
                            } else {
                                defaultValue = data[fieldConfig.name];
                            }


                            return <Controller
                                key={fieldConfig.name}
                                name={fieldConfig.name}
                                defaultValue={defaultValue}
                                control={control}
                                render={({ field }) => <FieldWidget {...field} {...fieldProps} />}
                            />;
                        }
                    })}
                </div>
                <Button text={props.submit_button_text ?? 'Submit'} type='submit' disabled={isSubmitting} />
            </form>
        </div >
    )
}