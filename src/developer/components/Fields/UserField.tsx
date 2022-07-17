import { useEffect, useState } from 'react';

import { ISelectOption, ISelectField } from './types';
import { getBaseURL } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';
import SelectField from './SelectField';

export default function GroupField(props: ISelectField) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState<ISelectOption[]>([]);

    useEffect(() => {
        fetch(getBaseURL() + '/user/')
            .then(res => res.json())
            .then(
                (result) => {
                    let userList: ISelectOption[] = [];

                    result.forEach((user: any) => {
                        let name = user.email;

                        if (user.first_name || user.last_name) {
                            let userName = `${user.first_name} ${user.last_name}`;
                            userName = userName.trim();
                            name += ` (${userName})`;
                        }

                        userList.push({ id: user.id, name: name })
                    });

                    setUsers(userList);
                    setIsLoaded(true);
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
            <SelectField {...props} options={users} />
        )
    }

}