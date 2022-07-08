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
        detail: '/function/edit/:id/',
        delete: '/function/delete/:id/',
    },
    package: {
        list: '/package/',
        create: '/package/create/',
        detail: '/package/edit/:id/',
        delete: '/package/delete/:id/',
    },
    page: {
        list: '/page/',
        create: '/page/create/:id/',
        detail: '/page/edit/:id/',
    },
    release: {
        tree: '/releases/',
        changes: '/releases/changes/',
    },
    workflow: {
        list: '/workflow/',
        create: '/workflow/create/:id/',
        detail: '/workflow/edit/:id/',
    },
    user: {
        list: '/user/',
        create: '/user/create/',
        detail: '/user/edit/:id/',
        delete: '/user/delete/:id/',
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