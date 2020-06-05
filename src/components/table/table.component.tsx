import React from 'react';
import { useTable, useSortBy, Row, TableState } from 'react-table';
import { RowDataType, ColumnType } from './table.types';

//TODO: Add Generics types
export default function Table(props: {
    data: RowDataType[];
    columns: ColumnType;
    initialSortBy?: {
        columnId: string;
        desc?: boolean;
    };
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<RowDataType>(
        {
            columns: props.columns,
            data: props.data,
            initialState: {
                sortBy: [
                    {
                        id: props.initialSortBy?.columnId,
                        desc: !!props.initialSortBy?.desc,
                    },
                ],
            } as TableState,
        },
        useSortBy
    );

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps((column as any).getSortByToggleProps())}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                                <span>
                                    {
                                        (column as any).isSorted
                                            ? (column as any).isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                </span>
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
