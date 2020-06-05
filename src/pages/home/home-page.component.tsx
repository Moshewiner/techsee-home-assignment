import React, { useEffect, useState, useContext } from 'react';
import { config } from '../../config';
import { TesterData } from './home-page.types';
import { DataFormatterContext } from '../../services/data-formatters/data-formatters.context';
import { ColumnType } from '../../components/table/table.types';
import Table from '../../components/table/table.component';

export default function HomePage() {
    const [testerName, setTesterName] = useState('rob');
    const [data, setData] = useState<TesterData[]>([]);
    const [columns, setColumns] = useState<ColumnType>([]);
    const [error, setError] = useState<Error>();

    const dataFormatter = useContext(DataFormatterContext);

    useEffect(() => {
        (async function () {
            try {
                const response: TesterData[] = await getBugsByName(testerName);
                const formattedData: TesterData[] = dataFormatter.format(
                    response
                );
                console.log({ formattedData });
                setData(formattedData);
            } catch (error) {
                setError(error);
            }
        })();
    }, [testerName]);

    useEffect(() => {
        if (data.length > 0) {
            const newColumns: ColumnType = getColumnOfDataRow(data[0]);
            setColumns(newColumns);
        }
    }, [data]);

    return (
        <>
            {error && `Temporary error occurred, please try again later.`}
            {data.length > 0 ? (
                <Table columns={columns} data={data}></Table>
            ) : (
                <span>Loading..</span>
            )}
        </>
    );
}

async function getBugsByName(name: string = 'all'): Promise<TesterData[]> {
    const fetchOptions = {
        method: 'GET',
    };
    const url: string = `${config.ApiAddress}/${name}`;
    return fetch(url, fetchOptions as any).then((r) => r.json());
}

function getColumnOfDataRow(row: TesterData): ColumnType {
    return Object.keys(row).map((dataColumn: string) => ({
        Header: dataColumn,
        accessor: dataColumn,
    }));
}
