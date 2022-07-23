import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import BaseErrorText from '../../components/Fields/Base/BaseErrorText';
import InputField from '../../components/Fields/InputField';
import ModelField from '../../components/Fields/ModelField';
import SelectField from '../../components/Fields/SelectField';

export interface IModelSchemaField {
    field_name: string;
    field_type?: string;
    required?: boolean;
    modelschema_id?: string;
}

export interface IFieldModal {
    isOpen: boolean;
    onClose: any;
    onSubmit: any;
    fieldData?: IModelSchemaField | null;
    handleRemoveField?: Function;
}

export default function FieldModal(props: IFieldModal) {
    const cancelButtonRef = useRef(null);

    const { control, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            field_name: props.fieldData?.field_name,
            field_type: props.fieldData?.field_type,
            required: props.fieldData?.required,
            modelschema_id: props.fieldData?.modelschema_id,
        }
    });
    const watchFieldType = watch('field_type');

    return (
        <Transition.Root show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-15 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" style={{ minHeight: '400px' }}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h1 className='text-xl font-semibold text-gray-900 mb-4'>{props.fieldData?.field_name ? <>Edit Field</> : <>Add Field</>}</h1>
                                    <form onSubmit={handleSubmit(props.onSubmit)} className='space-y-4'>
                                        <Controller
                                            name='field_name'
                                            control={control}
                                            rules={{ required: true, pattern: /^[a-z_]+$/ }}
                                            render={({ field }) => <InputField
                                                {...field}
                                                name='field_name'
                                                type='text'
                                                fieldType='*'
                                                label='Field Name'
                                            />}
                                        />
                                        <BaseErrorText error={errors.field_name} label={'Field Name'} patternMsg={'lowercase letters and underscores'} />
                                        <Controller
                                            name='field_type'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => <SelectField
                                                {...field}
                                                options={[
                                                    { id: "text", name: "Text" },
                                                    { id: "email", name: "Email" },
                                                    { id: "float", name: "Float" },
                                                    { id: "date", name: "Date" },
                                                    { id: "datetime", name: "Datetime" },
                                                    { id: "fk", name: "Link" },
                                                ]}
                                                name='field_type'
                                                fieldType='*'
                                                label='Field Type'
                                            />}
                                        />
                                        <BaseErrorText error={errors.field_type} label={'Field Type'} />
                                        <Controller
                                            name='required'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => <SelectField
                                                {...field}
                                                options={[
                                                    { id: "0", name: "No" },
                                                    { id: "1", name: "Yes" },
                                                ]}
                                                name='required'
                                                fieldType='boolean'
                                                label='Required'
                                            />}
                                        />
                                        <BaseErrorText error={errors.required} label={'Required'} />
                                        {watchFieldType === 'fk' && (
                                            <>
                                                <Controller
                                                    name='modelschema_id'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => <ModelField
                                                        {...field}
                                                        name='modelschema_id'
                                                        fieldType='*'
                                                        label='Model'
                                                    />}
                                                />
                                                <BaseErrorText error={errors.modelschema_id} label={'Model'} />
                                            </>
                                        )}
                                        <div className='space-x-4'>
                                            {props.fieldData?.field_name && <Button type='button' onClick={() => props.handleRemoveField && props.handleRemoveField(props.fieldData)}>Remove Field</Button>}
                                            <Button type='submit'>{props.fieldData?.field_name ? <>Save Field</> : <>Add Field</>}</Button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}