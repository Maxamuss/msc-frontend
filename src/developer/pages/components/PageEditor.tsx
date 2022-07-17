import { useState } from "react";
import Button from "../../components/Button";
import Header from "./Header";
import Table from "./Table";

interface IPageEditor {
    modelId?: string;
    pageLayout?: any;
}

const components = [
    { name: 'Header', description: 'Caption a page' },
    { name: 'Table', description: 'Display model data' },
];

const componentMapping: any = {
    'core@Header': Header,
    'core@Table': Table,
}

export default function PageEditor(props: IPageEditor) {
    const [layoutComponents, setLayoutComponents] = useState(props.pageLayout.layout);
    const [selectedComponent, setSelectedCompontent] = useState();

    const handleComponentClick = (component: any) => {
        if (component !== selectedComponent) {
            setSelectedCompontent(component)
        } else {
            setSelectedCompontent(undefined)
        }
    }

    return (
        <>
            <nav className="bg-white z-10 flex-shrink-0 h-16 border-200 border-b">
                <div className='flex'>
                    <Button>Save Workflow</Button>
                </div>
            </nav>
            <div className="relative flex flex-col" style={{ height: 'calc(100vh - 127px)' }}>
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200 bg-white">
                        <div className="h-full pl-4 pr-6 py-6 space-y-3">
                            {selectedComponent && (
                                <div className="p-2">
                                    {/* <h1>{selectedComponent}</h1> */}
                                    {/* <p>{selectedComponent.description}</p> */}
                                </div>
                            )}
                            {!selectedComponent && components.map((component: any) => (
                                <div key={component.name} className="rounded-lg shadow border border-gray-200 p-2">
                                    <h1>{component.name}</h1>
                                    <p>{component.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white lg:min-w-0 lg:flex-1">
                        <div className="h-full">
                            {layoutComponents.map((layout: any) => {
                                if (layout.component in componentMapping) {
                                    const Component = componentMapping[layout.component];

                                    return (
                                        <div
                                            onClick={() => handleComponentClick(layout)}
                                            className={layout === selectedComponent ? 'border border-blue-600' : 'cursor-help '}
                                        >
                                            <div
                                                className={'pointer-events-none select-none'}
                                            >
                                                <Component {...layout.config} />
                                            </div>
                                        </div>
                                    )
                                }
                                return <div></div>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
