import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routing";

export default function ReleaseTopMenu() {
    const changeCount = useSelector((state: any) => state.release.changeCount);

    return (
        <nav className="bg-white z-10 flex-shrink-0 flex h-16 border-200 border-b">
            {changeCount > 0 &&
                <Link
                    to={ROUTES.release.changes}
                    className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex'
                >
                    Apply Changes
                    <ArrowRightIcon className='ml-2 h-6 w-6' aria-hidden='true' />
                </Link>
            }
        </nav>
    )
}