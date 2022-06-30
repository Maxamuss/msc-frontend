import { generatePath } from "react-router-dom";

export const ROUTES = {
    modelschema: {
        list: '/modelschema/',
        create: '/modelschema/create/',
        detail: '/modelschema/:id/',
        delete: '/modelschema/:id/delete/'
    },
    function: {
        list: '/function/',
        create: '/function/create/',
        detail: '/function/:id/',
    },
    package: {
        list: '/package/',
        create: '/package/create/',
        detail: '/package/:id/',
    },
    page: {
        list: '/page/',
        create: '/page/create/:modelId/',
        detail: '/page/edit/:id/',
    },
    release: {
        tree: '/releases/',
    },
    workflow: {
        list: '/workflow/',
        create: '/workflow/create/:modelId/',
        detail: '/workflow/edit/:id/',
    },
    user: {
        list: '/user/',
        create: '/user/create/',
        detail: '/user/edit/:id/',
    },
    group: {
        list: '/group/',
        create: '/group/create/',
        detail: '/group/edit/:id/',
    },
    permission: {
        list: '/permission/',
        create: '/permission/create/',
        detail: '/permission/edit/:id/',
    },
}

export function generateSchemaPath(to: string, data: any): string {
    return generatePath(to, data)
}