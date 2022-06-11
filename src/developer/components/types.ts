import React from 'react';
import { ISelectField, IInputField } from './Fields/types';

export interface IButton {
    children: JSX.Element[] | JSX.Element | string;
    to?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: Function;
}

export interface IForm {
    action: string;
    fields: Array<
        IInputField | ISelectField
    >;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: any;
    navigate?: {
        to: string;
        keys: Array<string>;
    };
    submitButtonText?: string;
    // onSubmit?: Function;
}

export interface IHeader {
    title: string;
    subtitle?: string;
    tools?: Array<IButton>;
}

export interface ILoadingSpinner {
    theme?: 'light' | 'dark';
}

// *** Table ***

export interface ITableField {
    fieldName: string;
    headerName: string;
}

export interface ITableAction {
    text: string;
    to: string;
    keys: Array<string>;
}

// If data present, Table does not retrieve data from path.
export interface ITable {
    path: string;
    data?: any;
    fields: Array<ITableField>;
    actions?: Array<ITableAction>;
    tools?: Array<IButton>;
}

export interface ITabs {
    tabs: Array<{
        tabName: string;
        tabContent: any;
    }>;
}

export interface ISchemaObjectWrapper {
    path: string;
    fields?: Array<string>;
    children: JSX.Element[] | JSX.Element | string;
}

export interface ISchemaContext {
    schema?: any;
    setSchema: Function;
}