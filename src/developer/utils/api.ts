import { IGetSchemaData, ISendSchemaData } from './types';

const getBaseURL = () => {
    return 'http://localhost:8000/internal-api/developer'
}

export function getSchemaData(args: IGetSchemaData) {
    let url = getBaseURL() + args.path;

    if (args.fields) {
        url += '?fields=';
        args.fields.forEach((field, i) => {
            if (args.fields?.length == i + 1) {
                url += field
            } else {
                url += `${field}&`
            }
        })
    }

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

export function sendSchemaData(args: ISendSchemaData) {
    const setResults = args.setResults ? args.setResults : () => { };

    fetch(getBaseURL() + args.path, {
        method: args.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args.data),
    })
        .then(res => res.json())
        .then(
            (result) => {
                args.setIsLoaded(true);
                setResults(result);
            },
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )
}