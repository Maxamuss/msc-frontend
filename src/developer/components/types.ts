import React from 'react';

export interface IButton {
    children: JSX.Element[] | JSX.Element | string;
    to?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: Function;
}

export interface IForm {
    action: string;
    fields: Array<{
        fieldName: string;
        label: string;
        widget: any;
    }>;
    method?: 'post' | 'get';
    submitButtonText?: string;
}

export interface IFormField {
    name: string;
    id: string;
    label: string;
    type?: string;
    default?: string;
    placeholder?: string;
    helpText?: string;
}

export interface IHeader {
    title: string;
    subtitle?: string;
    tools?: Array<IButton>;
}

export interface ILoadingSpinner {
    theme?: 'light' | 'dark';
}

export interface ITable {
    fields: Array<{
        fieldName: string;
        headerName: string;
    }>;
}