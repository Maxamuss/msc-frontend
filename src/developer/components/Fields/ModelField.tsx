import { useEffect, useState } from 'react';

import { ISelectOption, ISelectField } from './types';
import { getBaseURL } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';
import SelectField from './SelectField';

export default function ModelField(props: ISelectField) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [models, setModels] = useState<ISelectOption[]>([]);

    useEffect(() => {
        fetch(getBaseURL() + '/modelschema/')
            .then(res => res.json())
            .then(
                (result) => {
                    let options: any = [];

                    result.forEach((model: any) => {
                        options.push({
                            id: model.id, name: model.model_name
                        })
                    })

                    setIsLoaded(true);
                    setModels(options);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>error</div>
    } else if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        return (
            <SelectField {...props} options={models} />
        )
    }

}