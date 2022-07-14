import { useDispatch } from 'react-redux';
import { IgetSchemaData, ISendSchemaData } from './types';

export const getBaseURL = () => {
    return 'http://localhost:8000/internal-api/developer'
}

export function getSchemaData(args: IgetSchemaData) {
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
                let data;

                if ('release_change_count' in result) {
                    data = result.data;
                    const changeCount = result.release_change_count;
                } else {
                    data = result;
                }

                if (args.setResults) {
                    args.setResults(data)
                }

                args.setIsLoaded(true);
            },
            (error) => {
                args.setIsLoaded(true);
                args.setError(error);
            }
        )
}