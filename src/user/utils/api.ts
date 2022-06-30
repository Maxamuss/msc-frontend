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