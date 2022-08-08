export interface IBaseHelpText {
    helpText?: string;
}

export interface IBaseLabel {
    id?: string;
    label?: string;
}
export interface IBaseErrorText {
    label?: string;
    error?: any;
    patternMsg?: string;
}

export interface IBaseField extends IBaseHelpText, IBaseLabel {
    name: string;
    fieldType: string;
    defaultValue?: string;
    placeholder?: string;
    value?: any;
}

export interface IInputField extends IBaseField {
    type: string;
}

export interface ISelectOption {
    id: string;
    name: any;
}

export interface ISelectField extends IBaseField {
    options?: ISelectOption[];
    selected?: any;
    onChange?: any;
    allowMultiple?: boolean;
}

export interface IIconField extends ISelectField {

}