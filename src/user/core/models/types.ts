export interface IApplicationConfig {
    models: IModel[];
}

export interface IPage {
    page_name: string;
    layout: any;
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
    pages: IPage[];
}