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
    method: 'post' | 'get';
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
    register?: any;
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
    path: string;
    fields: Array<{
        fieldName: string;
        headerName: string;
    }>;
    actions: Array<{
        text: string;
        to: string;
        keys: Array<string>;
    }>;
}

export interface ITabs {
    tabs: Array<{
        tabName: string;
        tabContent: any;
    }>;
}

export interface ISchemaObjectWrapper {
    path: string;
    children: JSX.Element[] | JSX.Element | string;
}