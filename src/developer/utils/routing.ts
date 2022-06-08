import { generatePath } from "react-router-dom";

export const ROUTES = {
    modelschema: {
        list: '/modelschema/',
        detail: '/modelschema/:id/',
        create: '/modelschema/create/',
    },
    function: {
        list: '/function/',
        detail: '/function/:id/',
        create: '/function/create/',
    },
    package: {
        list: '/package/',
        detail: '/package/:id/',
        create: '/package/create/',
    },
    release: {
        tree: '/releases/',
    },
}



export function generateSchemaPath(to: string, keys: Array<string>, data: any): string {
    let args: any = {};
    keys.forEach((key) => {
        args[key as keyof typeof args] = data[key];
    })

    return generatePath(to, args)
}