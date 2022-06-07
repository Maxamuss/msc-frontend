// This function replaces template arguments with the current page's syntax definition.
export const inject = (str: string, obj: any) => str.replace(/\${(.*?)}/g, (x, g) => obj[g]);

export function renderText(str: string, syntax: any) {
    if (str && syntax) {
        const renderedStr = inject(str, syntax);
        if (renderedStr) {
            return renderedStr;
        } else {
            return '***'
        }
    }
    return str;
}