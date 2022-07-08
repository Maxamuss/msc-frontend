export interface IgetSchemaData {
    path: string;
    setResults: Function;
    setIsLoaded: Function;
    setError: Function;
    fields?: Array<string>;
    wait?: number;
}

export interface ISendSchemaData {
    path: string;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data: any;
    setIsLoaded: Function;
    setError: Function;
    setResults?: Function;
    wait?: number;
}