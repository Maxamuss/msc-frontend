import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { setChangeCount } from "../store/releaseSlice";
import { getBaseURL } from "../utils/api";

export default function ReleaseOverview() {
    const dispatch = useDispatch();
    const changeCount = useSelector((state: any) => state.release.changeCount);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!changeCount) {
            setIsLoading(true);

            fetch(getBaseURL() + '/releases/change-count/')
                .then(res => res.json())
                .then(result => {
                    dispatch(setChangeCount(result))
                    setIsLoading(false);
                })
        }
    }, [])

    const text = changeCount ? `${changeCount} changes` : 'No changes';

    return (
        <div className='mx-4 p-2 border rounded border-gray-200 text-black'>
            {isLoading
                ? <LoadingSpinner />
                : text
            }
        </div>
    )
}