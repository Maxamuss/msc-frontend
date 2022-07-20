import { IBaseField } from "../../components/Fields/types";
import { IModel } from "./types";


export default class Model {
    definition: IModel;

    constructor(definition: IModel) {
        this.definition = definition;
    }

    model_name(): string {
        return this.definition.model_name;
    }

    model_name_plural(): string {
        return this.definition.model_name + 's';
    }

    model_name_lower(): string {
        return this.definition.model_name.replace(' ', '').toLowerCase();
    }

    getPage(pageName: string): any {
        for (const page of (this.definition?.pages ?? [])) {
            if (page.page_name === pageName) {
                return page;
            }
        }
        return undefined;
    }

    getFields() {
        let fields: IBaseField[] = [];

        (this.definition.fields || []).forEach((field) => {
            if (field.field_name !== 'id') {
                fields.push({
                    name: field.field_name,
                    id: 'id_' + field.field_name,
                    label: field.field_name,
                    field_type: field.field_type ?? 'text',
                    modelschema_id: field.modelschema_id,
                })
            }
        })

        return fields;
    }
}

export function getModel(models: Model[], modelName: string): Model | undefined {
    for (const model of models) {
        if (model.model_name_lower() === modelName) {
            return model;
        }
    }
    return undefined;
}

export function getModelById(models: Model[], modelId: string): Model | undefined {
    for (const model of models) {
        if (model.definition.id === modelId) {
            return model;
        }
    }
    return undefined;
}