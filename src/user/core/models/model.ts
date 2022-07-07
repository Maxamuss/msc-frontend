import { IModel } from "./types";


export default class Model {
    definition: IModel;

    constructor(definition: IModel) {
        this.definition = definition;
    }
}