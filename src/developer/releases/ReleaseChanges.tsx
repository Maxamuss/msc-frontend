import { Children, useEffect, useState } from "react";
import Header from "../components/Header";
import { getBaseURL } from "../utils/api";

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

interface IReleaseChange {
    change_type: string;
    model_type: string;
    syntax_json: any;
    created_at: Date;
    children?: IReleaseChange[];
}



export default function ReleaseChanges() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [changes, setChanges] = useState<IReleaseChange[] | undefined>(undefined);

    useEffect(() => {
        setIsLoaded(true);

        fetch(getBaseURL() + '/releases/changes/')
            .then(res => res.json())
            .then(result => {
                let groupedChanges: any = {};

                result.forEach((change: IReleaseChange) => {
                    if (!('modelschema_id' in change.syntax_json)) {
                        groupedChanges[change.syntax_json.id] = change;
                    }
                });

                result.forEach((change: IReleaseChange) => {
                    if ('modelschema_id' in change.syntax_json) {
                        let model = groupedChanges[change.syntax_json.modelschema_id]

                        if (model && 'children' in model) {
                            model['children'].push(change)
                        } else {
                            model['children'] = [change]
                        }
                    }
                });

                let finalChanges: any = [];

                Object.values(groupedChanges).map((groupedChange) => (
                    finalChanges.push(groupedChange)
                ))

                setChanges(finalChanges);
                setIsLoaded(true);
            })
    }, [])

    const mergeChanges = () => {
        fetch(getBaseURL() + '/releases/publish/', {
            method: 'post'
        })
            .then(res => res.json())
            .then(result => {
                // dispatch(setReleaseData(result))
                // setIsLoaded(true);
            })
    }

    const headerConfig = {
        title: 'Changes',
        tools: [
            {
                children: 'Merge Changes',
                // icon: PlusCircleIcon,
                onClick: mergeChanges
            }
        ]
    }

    return (
        <>
            <Header {...headerConfig} />
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {changes && changes.map((change, idx) => {
                        return (
                            <li key={idx}>
                                <div className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{toTitleCase(change.change_type)} {toTitleCase(change.model_type)}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {change.children && change.children.length > 0 &&
                                                        <>{change.children?.length} related changes</>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            {change.children && change.children?.map((childChange) => (
                                                <div>{toTitleCase(change.change_type)} {toTitleCase(childChange.model_type)}</div>
                                            ))}
                                        </div>
                                        {/* <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {position.department}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {position.location}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}