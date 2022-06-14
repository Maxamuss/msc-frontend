export interface IBaseHelpText {
    helpText?: string;
}

export interface IBaseLabel {
    id?: string;
    label?: string;
}

export interface IBaseField extends IBaseHelpText, IBaseLabel {
    name: string;
    fieldType: string;
    defaultValue?: string;
    placeholder?: string;
}

export interface IInputField extends IBaseField {
    type: string;
}

export interface ISelectField extends IBaseField {
    options?: Array<{
        id: string;
        name: any;
    }>;
    selected?: any;
}