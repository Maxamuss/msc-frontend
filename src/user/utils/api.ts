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

export function getModelObjects(modelName: string, setResults: Function, setPagination: Function, setIsLoaded: Function, setError: Function, params?: string) {
    let url = getBaseURL() + `/data/${modelName}/`;

    if (params) {
        url += params;
    }

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setResults(result.results);
                setPagination({ 'next': result.next, 'prev': result.previous, 'count': result.count })
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export function getModelObject(model: Model, modelId: string, setResource: Function, setIsLoaded: Function, setError: Function) {
    const url = getBaseURL() + `/data/${model.model_name_lower()}/${modelId}/`;

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

export function sendModelObject(data: any, method: string, setResource: Function, setIsSubmitting: Function, setError: Function, model?: Model, modelId?: string) {
    let url;

    if (model) {
        url = getBaseURL() + `/data/${model.model_name_lower()}/`;
    } else {
        setIsSubmitting(false);
        setError({});
        return
    }

    if (modelId) {
        url += `${modelId}/`;
    }
    console.log(url)

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(result => {
            setResource(result);
        })
        .catch(response => {
            response.json().then((json: any) => {
                setError(json);
                setIsSubmitting(false);
            })
        })
}