import { ITable } from './types';

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

export default function Table(props: ITable) {
    return (
        <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
                <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 border-b'>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                {props.fields.map((field, idx) => (
                                    <th key={idx} scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                        {field.headerName}
                                    </th>
                                ))}
                                <th
                                    scope='col'
                                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                                >
                                    Name
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Title
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Email
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Role
                                </th>
                                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'>
                                    <span className='sr-only'>Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {people.map((person) => (
                                <tr key={person.email}>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                        {person.name}
                                    </td>
                                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{person.title}</td>
                                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{person.email}</td>
                                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{person.role}</td>
                                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                                            Edit<span className='sr-only'>, {person.name}</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
