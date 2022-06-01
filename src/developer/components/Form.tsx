import { useState } from 'react';

import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { IForm } from './types';

export default function Form(props: IForm) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOnSubmit = () => {
        setIsSubmitting(true);
        // postData(model, resource.id, page, props.id, action, data, setFormResult, setIsSubmitting, setError);
    }

    return (
        <div className='bg-white overflow-hidden border-200 border-b p-4'>
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleOnSubmit}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {props.fields.map((field) => {
                        return <field.widget {...field} />
                        // const Field = formFields[field.widget];

                        // const name = field.field_name;
                        // const label = field.label;
                        // const helpText = field.help_text;
                        // const placeholder = field.placeholder;
                        // const defaultValue = resource[field.field_name] || props.defaultValue || null;
                        // const required = field.required || true;
                        // const options = field.options || [];

                        // const fieldProps = {
                        //     key: name,
                        //     name: name,
                        //     label: label,
                        //     helpText: helpText,
                        //     placeholder: placeholder,
                        //     default: defaultValue,
                        //     required: required,
                        //     options: options,
                        // }

                        // return (
                        //     <Controller
                        //         key={name}
                        //         name={name}
                        //         control={control}
                        //         render={({ field }) => <Field {...field} {...fieldProps} />}
                        //     />
                        // )

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