interface ITable { }

export default function Table(props: ITable) {
    return (
        <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
                <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 border-b'>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                {/* {props.fields.map((field, idx) => (
                                    <th
                                        key={idx}
                                        scope='col'
                                        className={(idx == 0 ? 'pl-6 pr-3' : 'px-3 ') + 'py-3.5 text-left text-sm font-semibold text-gray-900'}
                                    >
                                        {field.headerName}
                                    </th>
                                ))}
                                {actions.length > 0 &&
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                } */}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
