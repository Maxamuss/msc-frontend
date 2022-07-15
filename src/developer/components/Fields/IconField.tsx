import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import * as HeroIcons from '@heroicons/react/outline';

import BaseLabel from './Base/BaseLabel';
import BaseHelpText from './Base/BaseHelpText';
import { IIconField } from './types';

interface IIcons {
    [key: string]: any;
}

export const ICONS: IIcons = { ...HeroIcons };

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function IconField(props: IIconField) {
    const [selected, setSelected] = useState(props.selected ?? props.value ?? null);
    const [query, setQuery] = useState('')

    const filteredOptions =
        query === ''
            ? ICONS
            : Object.keys(ICONS)
                .filter(key => key.toLowerCase().includes(query.toLowerCase()))
                .reduce((obj: IIcons, key) => {
                    if (typeof obj === 'undefined') obj = {};
                    obj[key] = ICONS[key];
                    return obj;
                }, {})

    return (
        <>
            <Combobox {...props} value={selected} onChange={(e) => { props.onChange(e); setSelected(e) }} as="div">
                <BaseLabel {...props} />
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden border border-gray-300 rounded-md bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(option: any) => option}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {Object.keys(filteredOptions).length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                Object.keys(filteredOptions).map((iconName) => (
                                    <Combobox.Option
                                        key={iconName}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-500' : 'text-gray-900'
                                            }`
                                        }
                                        value={iconName}
                                    >
                                        {({ selected, active }) => {
                                            const Icon = ICONS[iconName];
                                            return <>
                                                <span className='text-gray-600 absolute inset-y-0 left-0 flex items-center pr-4 ml-2'>
                                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                <span
                                                    className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                                                >
                                                    {iconName}
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
                                        }}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                    <BaseHelpText {...props} />
                </div>
            </Combobox>
        </>
    );
}