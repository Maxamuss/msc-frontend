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
        for (const page of this.definition.pages) {
            if (page.page_name === pageName) {
                return page;
            }
        }
        return undefined;
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