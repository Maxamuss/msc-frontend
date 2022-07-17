import { IHeader } from '../../components/types';
import Button from './Button';

export default function Header(props: IHeader) {
    return (
        <div className="sm:flex sm:items-center sm:justify-between bg-white p-6 border-200 border-b">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">{props.title}</h3>
                {props.subtitle &&
                    <p className="mt-2 text-sm text-gray-700">
                        {props.subtitle}
                    </p>
                }
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4 space-x-2">
                {props.tools?.map((tool: any, i) => (
                    <Button key={i} {...tool} />
                ))}
            </div>
        </div>
    )
}

