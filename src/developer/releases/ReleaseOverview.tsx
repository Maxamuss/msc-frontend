import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { setReleaseData } from "../store/releaseSlice";
import { getBaseURL } from "../utils/api";
import { ROUTES } from "../utils/routing";

export default function ReleaseOverview() {
    const dispatch = useDispatch();
    const releaseData = useSelector((state: any) => state.release);

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setIsLoaded(false);

        fetch(getBaseURL() + '/releases/current/')
            .then(res => res.json())
            .then(result => {
                dispatch(setReleaseData(result))
                setIsLoaded(true);
            })
    }, [])

    if (!isLoaded) {
        return (
            <div className='mx-4 p-2 border rounded border-gray-200 text-black'>
                <LoadingSpinner />
            </div>
        )
    } else {
        return (
            <>
                <div className='mx-4 p-2 border rounded border-gray-200 text-black flex space-x-4'>
                    <div>
                        {releaseData.release?.release_version}
                    </div>
                    <div>
                        {releaseData.changeCount > 0 ? releaseData.changeCount + ' changes' : 'No changes'}
                    </div>
                    <Link
                        to={ROUTES.release.tree}
                        className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                        <ViewGridIcon className='h-6 w-6' aria-hidden='true' />
                    </Link>
                </div>
            </>
        )
    }

}