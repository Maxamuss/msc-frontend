import { useEffect, useState } from 'react';

import { ISelectOption, ISelectField } from './types';
import { getBaseURL } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';
import SelectField from './SelectField';

export default function GroupField(props: ISelectField) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState<ISelectOption[]>([]);

    useEffect(() => {
        fetch(getBaseURL() + '/group/')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setGroups(result);
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
            <SelectField {...props} options={groups} />
        )
    }

}