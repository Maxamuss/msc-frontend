export function renderText(str: string, syntax: any) {
    if (str && syntax) {
        let text = str;

        text = text.replace('<MODEL_NAME>', syntax.model_name);
        text = text.replace('<MODEL_NAME_PLURAL>', syntax.model_name);

        return text;
    }
    return str;
}