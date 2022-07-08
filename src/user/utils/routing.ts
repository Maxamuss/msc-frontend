import Model from "../core/models/model";

export function splitPath(path: string): string[] {
    if (path[0] === '/') {
        path = path.substring(1);
    }
    if (path[path.length - 1] === '/') {
        path = path.substring(0, path.length - 1);
    }

    return path.split('/');
}

export function getModelNameFromPath(path: string): string {
    const splittedPath = splitPath(path);
    return splittedPath[0];
}

export function getPageNameFromPath(path: string): [string, string | undefined] {
    const splittedPath = splitPath(path);

    if (splittedPath.length === 1) {
        return ['list', undefined];
    } else if (splittedPath.length === 2) {
        if (splittedPath[1] === 'create') {
            return ['create', undefined];
        }
        return ['edit', splittedPath[1]];
    } else {
        return [splittedPath[2], splittedPath[1]];
    }
}

export function populateTo(to: string, model?: Model, resource?: any): string {
    if (model) {
        to = to.replace('<MODEL_NAME_LOWER>', model.model_name_lower())
    }


    if (resource) {
        console.log(resource)
        to = to.replace('<OBJECT_ID>', resource.id)
    }

    // Remove whitespace
    to = to.replace(/ /g, '');

    return to;
}