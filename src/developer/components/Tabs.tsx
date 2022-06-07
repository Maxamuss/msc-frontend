import { useState } from 'react';
import { ITabs } from './types';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs(props: ITabs) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const isTabCurrent = (tabIdx: number) => tabIdx === activeTabIndex;

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
            </div>
            <div className="hidden sm:block">
                <div className='border-b border-gray-200 bg-white px-6'>
                    <nav className="-mb-px flex space-x-8">
                        {props.tabs.map((tab, tabIdx) => (
                            <button
                                key={tabIdx}
                                onClick={() => { setActiveTabIndex(tabIdx) }}
                                className={classNames(
                                    isTabCurrent(tabIdx) ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                            >
                                <span>{tab.tabName}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            <div>
                {props.tabs.map((tab, tabIdx) => {
                    if (isTabCurrent(tabIdx)) {
                        return <tab.tabContent key={tabIdx} />;
                    }
                })}
            </div>
        </div >
    )
}

