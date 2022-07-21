import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { IForeignKeyField } from './types';
import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';
import { getModelObjects } from '../../utils/api';
import LoadingSpinner from '../../../developer/components/LoadingSpinner';
import SelectField from './SelectField';
import { getModelById } from '../../core/models/model';

function formatItems(items: any) {
    let options: any = [];

    items.forEach((item: any) => {
        options.push({
            id: item.id, name: item.id
        })
    });

    return options;
}

export default function ForeignKeyField(props: IForeignKeyField) {
    const models = useSelector((state: any) => state.application.models);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const model = getModelById(models, props.modelschema_id);

        if (model) {
            getModelObjects(
                model.model_name_lower(),
                setItems,
                () => { },
                setIsLoaded,
                setError,
            )
        }
    }, [])

    return (
        <div>
            <BaseLabel {...props} />
            {error ? (
                <input
                    className="mt-1 block w-full border-gray-300 rounded shadow-sm text-gray-900 sm:text-sm focus:ring-primary focus:border-primary"
                    placeholder="Failed to load."
                    disabled
                />
            ) : !isLoaded ? (
                <div className="mt-1 block w-full border-gray-300 rounded shadow-sm text-gray-900 sm:text-sm focus:ring-primary focus:border-primary">
                    <LoadingSpinner />
                </div>
            ) : (
                <SelectField {...props} options={formatItems(items)} bare={true} />
            )
            }
            <BaseHelpText {...props} />
        </div >
    );
}