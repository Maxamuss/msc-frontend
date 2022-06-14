import { generatePath } from "react-router-dom";

export const ROUTES = {
    modelschema: {
        list: '/modelschema/',
        detail: '/modelschema/:id/',
        create: '/modelschema/create/',
        delete: '/modelschema/:id/delete/'
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
    page: {
        editor: '/page/editor/'
    },
    release: {
        tree: '/releases/',
    },
}

export function generateSchemaPath(to: string, data: any): string {
    return generatePath(to, data)
}