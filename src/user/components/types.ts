import React from 'react';
import Model from '../core/models/model';
import { IBaseField } from './Fields/types';

export interface IButton {
    text: string;
    to?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: 'button' | 'submit' | 'reset';
    onClick?: any;
    disabled?: boolean;
}

export interface IForm {
    model: Model;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    fields?: IBaseField[];
    resource?: any;
    to?: string;
    submitButtonText?: string;
}

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
export interface IInline {
    modelschema_id: string;
    actions?: IButton[];
}

export interface ITab {
    tab_name: string;
    tab_content: any;
}

export interface ITabs {
    tabs: ITab[];
}