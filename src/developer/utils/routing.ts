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
        delete: '/function/:id/delete/',
    },
    package: {
        list: '/package/',
        create: '/package/create/',
        detail: '/package/:id/',
        delete: '/package/:id/delete/',
    },
    page: {
        list: '/page/',
        create: '/page/:id/create/',
        detail: '/page/:id/',
    },
    release: {
        tree: '/releases/',
        changes: '/releases/changes/',
    },
    workflow: {
        list: '/workflow/',
        create: '/workflow/create/',
        detail: '/workflow/:id/',
    },
    user: {
        list: '/user/',
        create: '/user/create/',
        detail: '/user/:id/',
        delete: '/user/:id/delete/',
    },
    group: {
        list: '/group/',
        create: '/group/create/',
        detail: '/group/:id/',
        delete: '/group/:id/delete/',
    },
    permission: {
        list: '/permission/',
        create: '/permission/:id/create/',
        detail: '/permission/:id/edit/',
    },
}

export function generateSchemaPath(to: string, data: any): string {
    return generatePath(to, data)
}