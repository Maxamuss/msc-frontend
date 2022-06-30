export interface IGetLayoutData {
    path: string;
    setResults: Function;
    setIsLoaded: Function;
    setError: Function;
    wait?: number;
    useCache?: boolean;
}