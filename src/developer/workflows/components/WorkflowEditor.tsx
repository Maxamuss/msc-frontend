import Button from '../../components/Button';
import ProcessFlow from './ProcessFlow';

interface IWorkflowEditor {
    modelId?: string;
    workflowData?: any;
}

// If an id is in the url
export default function WorkflowEditor(props: IWorkflowEditor) {
    return (
        <>
            <nav className="bg-white z-10 flex-shrink-0 h-16 border-200 border-b">
                <div className='flex'>
                    <Button>Save Workflow</Button>
                </div>
            </nav>
            <div className="relative flex flex-col" style={{ height: 'calc(100vh - 127px)' }}>
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200 bg-white">
                        <div className="h-full pl-4 pr-6 py-6 sm:pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">Triggers</h3>
                            <div className='space-y-4'>
                                <button
                                    type='button'
                                    // onClick={() => handleAddComponent(component.componentName)}
                                    className="w-full rounded-lg shadow border border-gray-200 text-left p-2"
                                >
                                    <h1>Model Created</h1>
                                    <p>Trigger a workflow when a model object is created.</p>
                                </button>
                                <button
                                    type='button'
                                    // onClick={() => handleAddComponent(component.componentName)}
                                    className="w-full rounded-lg shadow border border-gray-200 text-left p-2"
                                >
                                    <h1>Model Updated</h1>
                                    <p>Trigger a workflow when a model object is updated.</p>
                                </button>
                                <button
                                    type='button'
                                    // onClick={() => handleAddComponent(component.componentName)}
                                    className="w-full rounded-lg shadow border border-gray-200 text-left p-2"
                                >
                                    <h1>Model Created</h1>
                                    <p>Trigger a workflow when a model object is deleted.</p>
                                </button>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Functions</h3>
                        </div>
                    </div>

                    <div className="bg-white lg:min-w-0 lg:flex-1">
                        <div className="h-full">
                            <ProcessFlow workflowData={props.workflowData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
