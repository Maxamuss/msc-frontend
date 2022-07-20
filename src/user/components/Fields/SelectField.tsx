import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';
import { ISelectField } from './types';


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectField(props: ISelectField) {
    const [selected, setSelected] = useState(props.selected);

    return (
        <>
            <Listbox {...props} value={selected} onChange={(e) => { setSelected(e) }}>
                {({ open }) => (
                    <>
                        <div className="mt-1 relative">
                            {!props.bare && <BaseLabel {...props} />}
                            <Listbox.Button className="h-10 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-ring-blue-500 focus:border-ring-blue-500 sm:text-sm">
                                <span className="block truncate">{selected ? selected.name : ''}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="z-10 absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" style={{ zIndex: 99999 }}>
                                    {props.options && props.options.map((option) => (
                                        <Listbox.Option
                                            key={option.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-blue-500' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {option.name}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-blue-500',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                            {!props.bare && <BaseHelpText {...props} />}
                        </div>
                    </>
                )}
            </Listbox>
        </>
    )
}