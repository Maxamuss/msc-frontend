import Model from '../core/models/model';
import { IGetLayoutData } from './types';

export const getBaseURL = () => {
    return 'http://localhost:8000/internal-api/application'
}

export function getLayoutData(args: IGetLayoutData) {
    let url = getBaseURL() + args.path;

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                args.setIsLoaded(true);
                args.setResults(result);
            },
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )

}

export function getModelObjects(modelName: string, setResults: Function, setIsLoaded: Function, setError: Function) {
    let url = getBaseURL() + `/data/${modelName}/`;

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setResults(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export function getModelObject(model: Model, modelId: string, setResource: Function, setIsLoaded: Function, setError: Function) {
    if (!modelId) {
        setIsLoaded(true);
        setResource(null);
    }

    let url = getBaseURL() + `/data/${model.model_name_lower()}/${modelId}/`;

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setResource(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}