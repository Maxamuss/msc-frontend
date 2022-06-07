export interface ISchemaDataProps {
    path: string;
    setResults: Function;
    setIsLoaded: Function;
    setError: Function;
    fields?: Array<string>;
    wait?: number;
}