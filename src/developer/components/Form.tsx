import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { sendSchemaData } from '../utils/api';

import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { IForm } from './types';

export default function Form(props: IForm) {
    const { control, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (data: any) => {
        setIsSubmitting(true);
        console.log(data);
        // postData(model, resource.id, page, props.id, action, data, setFormResult, setIsSubmitting, setError);
        sendSchemaData({
            path: props.action,
            method: props.method,
            data: data,
            setIsLoaded: setIsSubmitting,
            setError: setError,
        })
        setIsSubmitting(false);
    }

    return (
        <div className='bg-white overflow-hidden border-200 border-b p-4'>
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {props.fields.map((field) => {
                        const FieldWidget = field.widget;
                        const data = props.data ?? {};
                        const fieldConfig = {
                            name: field.fieldName,
                            label: field.label,
                            value: data[field.fieldName]
                        };

                        return <Controller
                            key={fieldConfig.name}
                            name={fieldConfig.name}
                            control={control}
                            render={({ field }) => <FieldWidget {...field} {...fieldConfig} />}
                        />;
                    })}
                </div>
                <Button key='submitButton' type='submit'>
                    <>
                        {props.submitButtonText || 'Submit'}
                        {isSubmitting && <div className='ml-4'><LoadingSpinner /></div>}
                    </>
                </Button>
            </form>
        </div >
    )
}