import { useEffect, useState } from 'react';

import { ISelectOption, ISelectField } from './types';
import { getBaseURL } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';
import SelectField from './SelectField';

export default function PermissionField(props: ISelectField) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [permissions, setpermissions] = useState<ISelectOption[]>([]);

    useEffect(() => {
        fetch(getBaseURL() + '/permission/')
            .then(res => res.json())
            .then(
                (result) => {
                    let options: any = [];

                    result.forEach((permission: any) => {
                        console.log(permission)
                        options.push({
                            id: permission.id, name: permission.permission_name
                        })
                    })

                    setIsLoaded(true);
                    setpermissions(options);
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
            <SelectField {...props} options={permissions} />
        )
    }

}