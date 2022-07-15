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
                        <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                            {/* Start left column area */}

                            {/* End left column area */}
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
