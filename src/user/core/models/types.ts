export interface IApplicationConfig {
    models: IModel[];
}

export interface IModelField {
    field_name: string;
    field_type: string;
    required?: boolean;
}

export interface IModel {
    id: string;
    model_name: string;
    fields: IModelField[];
}