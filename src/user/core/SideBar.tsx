import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { XIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

export default function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const models = useSelector((state: any) => state.application.models);

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as='div' className='fixed inset-0 flex z-40 md:hidden' onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter='transition ease-in-out duration-300 transform'
                        enterFrom='-translate-x-full'
                        enterTo='translate-x-0'
                        leave='transition ease-in-out duration-300 transform'
                        leaveFrom='translate-x-0'
                        leaveTo='-translate-x-full'
                    >
                        <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-in-out duration-300'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='ease-in-out duration-300'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                                    <button
                                        type='button'
                                        className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className='sr-only'>Close sidebar</span>
                                        <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className='flex-shrink-0 flex items-center px-4'>
                                <img
                                    className='h-8 w-auto'
                                    src='https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg'
                                    alt='Workflow'
                                />
                            </div>
                            <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                                {/* <nav className='px-2 space-y-1'>
                                    {props.layout.sidebar.map((item) => (
                                        { item.section_name }
                                        < a                                            key = { item.name }
                                            href = { item.to }
                                            className = {
                                            classNames(
                                                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                        >
                                    <item.icon className='mr-4 flex-shrink-0 h-6 w-6 text-indigo-300' aria-hidden='true' />
                                </>
                                    ))}
                            </nav> */}
                            </div>
                        </div>
                    </Transition.Child>
                    <div className='flex-shrink-0 w-14' aria-hidden='true'>
                    </div>
                </Dialog>
            </Transition.Root >

            {/* Static sidebar for desktop */}
            <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
                <div className='flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto'>
                    <div className='flex items-center flex-shrink-0 px-4'>
                        <img
                            className='h-8 w-auto'
                            src='https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg'
                            alt='Workflow'
                        />
                    </div>
                    <div className='mt-5 flex-1 flex flex-col'>
                        <nav className='flex-1 px-2 pb-4 space-y-2'>
                            {models.map((model: any) => (
                                <NavLink
                                    key={model.definition.model_name}
                                    to={model.model_name_lower()}
                                    className={isActive =>
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md' + (!isActive ? ' bg-indigo-800 text-white' : ' text-indigo-100 hover:bg-indigo-600')
                                    }

                                >
                                    {/* <link.icon className='mr-3 flex-shrink-0 h-6 w-6 text-indigo-300' aria-hidden='true' /> */}
                                    {model.definition.model_name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}