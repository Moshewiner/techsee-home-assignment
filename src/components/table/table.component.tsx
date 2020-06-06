import React from 'react';
import { useTable, useSortBy, Row, TableState } from 'react-table';
import { RowDataType, ColumnType } from './table.types';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './table.component.scss';

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
        <MaUTable className='table' {...getTableProps()}>
            <TableHead className='head'>
                {headerGroups.map((headerGroup) => (
                    <TableRow className='row'  {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell
                                className='cell'
                                {...column.getHeaderProps((column as any).getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span>
                                    {
                                        (column as any).isSorted
                                            ? (column as any).isSortedDesc
                                                ? ' 🠟'
                                                : ' 🠝'
                                            : ''}
                                </span>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody className='body' {...getTableBodyProps()}>
                {rows.map((row: Row) => {
                    prepareRow(row);
                    return (
                        <TableRow className='row' {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <TableCell
                                        className='cell'
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </MaUTable>
    );
}
