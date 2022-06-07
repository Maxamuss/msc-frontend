import { getBaseURL } from '../utils/api';

export function publishRelease() {
    console.log(getBaseURL() + '/releases/publish/', {
        method: 'POST'
    });
    return
    fetch(getBaseURL() + '/releases/publish/')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
            (error) => {
                console.log(error)
            }
        )
}
