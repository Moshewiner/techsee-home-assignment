import React, { useEffect, useState } from 'react';
import Table, { ColumnType } from '../../components/table/table.component';
import { config } from '../../config';
import { TesterData } from './home-page.types';

function HomePage() {
    const [testerName, setTesterName] = useState('all');
    const [data, setData] = useState<TesterData[]>([]);
    const [columns, setColumns] = useState<ColumnType>([]);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async function () {
            try {
                const response = await getBugsByName(testerName);
                setData(response);
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
    return (
        Object.keys(row)
            //TODO: Handle Bugs
            .filter((k) => k !== 'bugs')
            .map((dataColumn: string) => {
                return {
                    Header: dataColumn,
                    accessor: dataColumn,
                };
            })
    );
}

export default HomePage;
