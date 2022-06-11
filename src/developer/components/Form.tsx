import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { sendSchemaData } from '../utils/api';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { SchemaContext } from './SchemaObjectWrapper';
import { IForm, ISchemaContext } from './types';
import { generateSchemaPath } from '../utils/routing';

export default function Form(props: IForm) {
    let navigate = useNavigate();
    const schemaContext: ISchemaContext = useContext(SchemaContext);

    const { control, handleSubmit } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResult, setFormResult] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = (data: any) => {
        setIsSubmitting(true);
        sendSchemaData({
            path: props.action,
            method: props.method,
            data: data,
            setIsLoaded: setIsSubmitting,
            setResults: setFormResult,
            setError: setError,
        })
    }

    useEffect(() => {
        if (formResult && !error) {
            setIsSubmitting(false);

            if (props.navigate) {
                navigate(generateSchemaPath(props.navigate.to, props.navigate.keys, formResult));
            } else {
                schemaContext.setSchema(formResult);
            }
        }
    }, [formResult, error])

    return (
        <div className='bg-white overflow-hidden border-200 border-b p-4'>
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {/* {props.fields.map((fieldProps) => {
                        const FieldWidget = fieldProps.widget;
                        const data = schemaContext.schema ?? {};

                        
                    })} */}
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