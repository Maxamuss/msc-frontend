import { useContext } from 'react';
import { renderText } from '../utils/render';
import Button from './Button';
import { SchemaContext } from './SchemaObjectWrapper';
import { IHeader, ISchemaContext } from './types';

export default function Header(props: IHeader) {
    const schemaContext: ISchemaContext = useContext(SchemaContext);
    const schema = schemaContext.schema;

    return (
        <div className="sm:flex sm:items-center sm:justify-between bg-white p-6 border-200 border-b">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">{renderText(props.title, schema)}</h3>
                {props.subtitle &&
                    <p className="mt-2 text-sm text-gray-700">
                        {renderText(props.subtitle, schema)}
                    </p>
                }
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4 space-x-2">
                {props.tools?.map((tool, i) => (
                    <Button key={i} {...tool} />
                ))}
            </div>
        </div>
    )
}

