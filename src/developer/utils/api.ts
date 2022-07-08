import { IGetSchemaData, ISendSchemaData } from './types';

export const getBaseURL = () => {
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
                const data = result.results;

                args.setIsLoaded(true);
                args.setResults(data);
            },
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )

}

export function sendSchemaData(args: ISendSchemaData) {
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

                if (args.setResults) {
                    args.setResults(result)
                }
            },
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )
}