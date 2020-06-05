import React, { useEffect, useState } from 'react';
import Table, {
    DataType,
    ColumnType,
} from '../../components/table/table.component';
import { config } from '../../config';

function HomePage() {
    const [testerName, setTesterName] = useState('all');
    const [data, setData] = useState<DataType>([]);
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
            //TODO: handle bugs
            const newColumns: ColumnType = Object.keys(data[0]).filter(k => k !== 'bugs').map(
                (dataColumn: string) => {
                    return {
                        Header: dataColumn,
                        accessor: dataColumn,
                    };
                }
            );
            setColumns(newColumns);
        }
    }, [data]);

    if (error) {
        return <>Temporary error occurred, please try again later.</>;
    }

    if (data.length > 0) {
        return <Table columns={columns} data={data}></Table>;
    }
    else {
        return <>Loading</>;
    }
}

interface Bug { }

async function getBugsByName(name: string = 'all'): Promise<Bug[]> {
    const fetchOptions = {
        method: 'GET',
    };
    const url: string = `${config.ApiAddress}/${name}`;
    return fetch(url, fetchOptions as any).then(r => r.json());
}

export default HomePage;
