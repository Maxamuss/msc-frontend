import internal from "stream";

export interface ISchemaList {
    path: string;
    setResults: Function;
    setIsLoaded: Function;
    setError: Function;
    wait?: number;
}