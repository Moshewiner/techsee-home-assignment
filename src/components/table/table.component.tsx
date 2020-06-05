import React from 'react';
import { useTable, useSortBy, HeaderGroup, Row, TableState } from 'react-table';

export type ColumnType = {
    Header: string;
    accessor: string;
}[];

export type RowDataType = object[];

function Table(props: { data: RowDataType; columns: ColumnType }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<any>(
        {
            columns: props.columns,
            data: props.data,
            initialState: {
                sortBy: [
                    {
                        id: 'firstName',
                        desc: false,
                    },
                ],
            } as TableState,
        },
        useSortBy
    );

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map((headerGroup: HeaderGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row: Row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;
