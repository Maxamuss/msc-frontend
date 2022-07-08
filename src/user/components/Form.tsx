import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import { IForm } from './types';

import TextField from './Fields/TextField';
import { PageContext } from '../core/Page';
import { populateTo } from '../utils/routing';
import { sendModelObject } from '../utils/api';

const fieldWidgets: any = {
    'text': TextField,
}

export default function Form(props: IForm) {
    let navigate = useNavigate();
    const pageContext = useContext(PageContext);

    const { control, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResult, setFormResult] = useState(null);
    const [error, setError] = useState(null);

    const fields = props.fields ?? pageContext?.model?.getField() ?? [];

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
            {error && <div>error</div>}
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {fields.map((fieldConfig: any) => {
                        if (fieldWidgets[fieldConfig.field_type] !== 'undefined') {
                            const FieldWidget = fieldWidgets[fieldConfig.field_type];
                            const data = pageContext.resource ?? {};

                            const fieldProps = {
                                id: fieldConfig.id,
                                label: fieldConfig.label,
                                help_text: fieldConfig.help_text,
                            }

                            return <Controller
                                key={fieldConfig.name}
                                name={fieldConfig.name}
                                defaultValue={data[fieldConfig.name]}
                                control={control}
                                render={({ field }) => <FieldWidget {...field} {...fieldProps} />}
                            />;
                        }
                    })}
                </div>
                <Button text={props.submitButtonText ?? 'Submit'} type='submit' disabled={isSubmitting} />
            </form>
        </div >
    )
}