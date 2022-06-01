import { ISchemaList } from './types';

const getBaseURL = () => {
    return 'http://localhost:8000/internal-api/developer'
}

export function getSchemaList(args: ISchemaList) {
    fetch(getBaseURL() + args.path)
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