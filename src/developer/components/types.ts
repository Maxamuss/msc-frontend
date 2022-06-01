export interface IButton {
    text: string;
    to: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: Function;
}

export interface IHeader {
    title: string;
    subtitle?: string;
    tools?: Array<IButton>;
}

export interface ITable {
    fields: Array<{
        fieldName: string;
        headerName: string;
    }>
}