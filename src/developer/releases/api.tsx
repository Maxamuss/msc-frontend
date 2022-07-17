import { getBaseURL } from '../utils/api';

export interface IRelease {
    id: string;
    release_version: string;
    release_notes: string;
    released_at: string;
    current_release: boolean;
    parent: number | undefined;
    unapplied_changes: number;
}

export function publishRelease() {
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
