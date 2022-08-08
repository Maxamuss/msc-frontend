import { createRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/Button"
import BaseErrorText from "../../../components/Fields/Base/BaseErrorText";
import ModelField from "../../../components/Fields/ModelField"
import { ISelectedComponentConfig } from "../PageEditor"

export default function InlineConfig(props: ISelectedComponentConfig) {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        let updatedLayout = [...props.layout];

        updatedLayout.forEach((comp) => {
            if (comp.component === 'core@Inline') {
                comp.config['modelschema_id'] = data.modelschema_id
            }
        })

        props.setLayoutComponents(updatedLayout)
    }

    return (
        <>
            <h3 className="text-xl font-semibold text-gray-900">{props.component.component}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <Controller
                    name='modelschema_id'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <ModelField
                        {...field}
                        name='modelschema_id'
                        fieldType='*'
                        label='Related Model'
                    />}
                />
                <BaseErrorText error={errors.modelschema_id} label={'Related Model'} />
                <Button type='submit'>Save</Button>
            </form>
        </>
    )
}
