import { useState } from "react";
import Button from "../../components/Button";
import Header from "./Header";
import Inline from "./Inline";
import Table from "./Table";
import InlineConfig from './config/InlineConfig';
import { sendSchemaData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface IPageEditor {
    model: any;
    pageLayout?: any;
    pageId?: string;
}

export interface ISelectedComponentConfig {
    component: any;
    layout: any;
    setLayoutComponents: Function;
}

const components = [
    { name: 'Header', description: 'Caption a page', componentName: 'core@Header' },
    { name: 'Table', description: 'Display model data', componentName: 'core@Table' },
    { name: 'Inline', description: 'Display related data', componentName: 'core@Inline' },
];


const componentMapping: any = {
    'core@Header': Header,
    'core@Table': Table,
    'core@Inline': Inline,
}

function SelectedComponentConfig(props: ISelectedComponentConfig) {
    if (props.component.component === 'core@Inline') {
        return <InlineConfig {...props} />
    }
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-900">{props.component.component}</h3>
            <div>Nothing to setup for this component</div>
        </>
    )
}

export default function PageEditor(props: IPageEditor) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [layoutComponents, setLayoutComponents] = useState(props.pageLayout?.layout);
    const [selectedComponent, setSelectedComponent] = useState<any>();

    const handleComponentClick = (component: any) => {
        if (component !== selectedComponent) {
            setSelectedComponent(component)
        } else {
            setSelectedComponent(undefined)
        }
    }

    const handleAddComponent = (componentName: any) => {
        let updatedLayoutComponents = [...layoutComponents];
        updatedLayoutComponents.push({
            component: componentName,
            config: {}
        });

        setLayoutComponents(updatedLayoutComponents);
    }

    const handleSave = () => {
        const data = {
            ...props.pageLayout,
            layout: layoutComponents,
        }

        sendSchemaData({
            path: `/page/${props.pageId}/`,
            method: 'PUT',
            data: data,
            setIsLoaded: () => { },
            setResults: (result: any) => {
                navigate(`/modelschema/${props.model.id}`)
            },
            setError: () => { },
            dispatch: dispatch,
        });
    }

    return (
        <>
            {/* <Header /> */}
            <nav className="bg-white z-10 flex-shrink-0 h-16 border-200 border-b">
                <div className='flex pl-auto'>
                    {props.model.model_name}
                    <Button type={'button'} onClick={handleSave}>Save Page</Button>
                </div>
            </nav>
            <div className="relative flex flex-col" style={{ height: 'calc(100vh - 127px)' }}>
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200 bg-white">
                        <div className="h-full pl-4 pr-6 py-6 space-y-3">
                            {selectedComponent && (
                                <div className="p-2">
                                    <SelectedComponentConfig component={selectedComponent} layout={layoutComponents} setLayoutComponents={setLayoutComponents} />
                                </div>
                            )}
                            {!selectedComponent && components.map((component: any) => (
                                <button
                                    key={component.name}
                                    type='button'
                                    onClick={() => handleAddComponent(component.componentName)}
                                    className="w-full rounded-lg shadow border border-gray-200 text-left p-2"
                                >
                                    <h1>{component.name}</h1>
                                    <p>{component.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white lg:min-w-0 lg:flex-1">
                        <div className="h-full">
                            {layoutComponents?.map((layout: any) => {
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
                                                <Component {...layout.config} model={props.model} />
                                            </div>
                                        </div>
                                    )
                                }
                                return <></>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

