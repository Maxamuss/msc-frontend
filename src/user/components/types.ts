import React from 'react';

export interface IButton {
    text: string;
    to?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: 'button' | 'submit' | 'reset';
    onClick?: any;
}

// export interface IForm {
//     action: string;
//     fields: Array<IBaseField>;
//     method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//     data?: any;
//     to?: string;
//     submitButtonText?: string;
//     // onSubmit?: Function;
// }

export interface IHeader {
    title: string;
    subtitle?: string;
    tools?: IButton[];
}

// *** Table ***

export interface ITableField {
    field_name: string;
    header_name: string;
}

export interface ITable {
    fields: ITableField[];
    model_name?: string;
    actions?: IButton[];
}

export interface ITab {
    tab_name: string;
    tab_content: any;
}

export interface ITabs {
    tabs: ITab[];
}