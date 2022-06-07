import { ISchemaDataProps } from './types';

const getBaseURL = () => {
    return 'http://localhost:8000/internal-api/developer'
}

export function getSchemaData(args: ISchemaDataProps) {
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
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )

}