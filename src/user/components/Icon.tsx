import * as HeroIcons from '@heroicons/react/outline';

interface IIcons {
    [key: string]: any;
}

const ICONS: IIcons = { ...HeroIcons };

interface IIconsProps {
    iconName: string;
    className?: string;
}

export default function Icon(props: IIconsProps) {
    const Icon = ICONS[props.iconName];

    return (
        <Icon className={props.className} />
    )
}