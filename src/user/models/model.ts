interface IModelField {
    field_name: string;
    field_type: string;
    required?: boolean;
}

interface IModel {
    id: string;
    fields: any
}

export default class Model {
    modelschema: IModel;

    constructor(modelschema: IModel) {
        this.modelschema = modelschema;
    }
}