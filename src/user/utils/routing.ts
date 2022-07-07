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
        return ['edit', splittedPath[1]];
    } else {
        return [splittedPath[2], splittedPath[1]];
    }
}

export function parseURI(uri: string) {
    let path = '';

    uri.split(':').forEach(arg => {
        if (arg) {
            path += `${arg}/`
        }
    });

    return path;
}

// Navigate to the link specified location.
export function navigateLink(navigate: any, uri: string) {
    const path = parseURI(uri);
    navigate(path);
}