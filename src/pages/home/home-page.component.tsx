import React, { useEffect, useState, useContext } from 'react';
import { config } from '../../config';
import { TesterData } from './home-page.types';
import { DataFormatterContext } from '../../services/data-formatters/data-formatters.context';
import { ColumnType } from '../../components/table/table.types';
import Table from '../../components/table/table.component';
import './home-page.component.css';

export default function HomePage() {
    const [renderedTesterName, setRenderedTesterName] = useState('all');
    const [internalTesterName, setInternalTesterName] = useState(renderedTesterName);
    const [isValidTesterName, setIsValidTesterName] = useState(false);

    const [data, setData] = useState<TesterData[]>([]);
    const [columns, setColumns] = useState<ColumnType>([]);
    const [error, setError] = useState<Error>();

    const dataFormatter = useContext(DataFormatterContext);

    useEffect(() => {
        (async function () {
            try {
                const response: TesterData[] = await getBugsByName(internalTesterName);
                const formattedData: TesterData[] = dataFormatter.format(
                    response
                );

                setData(formattedData);

                if (formattedData.length > 0) {
                    const newColumns: ColumnType = getColumnOfDataRow(formattedData[0]);
                    setColumns(newColumns);
                }
            } catch (error) {
                setError(error);
            }
        })();
    }, [renderedTesterName, dataFormatter, internalTesterName]);

    return (
        <>
            <h1>Search bugs..</h1>
            <label htmlFor='TesterNameInput'>Tester Name</label>
            <input
                id='TesterNameInput'
                placeholder='Enter the tester name'
                className={isValidTesterName ? 'valid' : 'error'}
                value={internalTesterName}
                onChange={
                    (e) => {
                        const testerNameToSearch: string = e.target.value;
                        setInternalTesterName(testerNameToSearch);
                        const isValid: boolean = validateTesterName(internalTesterName)
                        setIsValidTesterName(isValid);
                    }
                } /><br />
            <button
                disabled={internalTesterName.length === 0}
                onClick={
                    () => {
                        setRenderedTesterName(internalTesterName);
                    }
                }
            >
                Fetch
                </button>
            {error && `Temporary error occurred, please try again later.`}
            {data.length > 0 ? (
                <Table columns={columns} data={data} initialSortBy={{ columnId: 'firstName' }}></Table>
            ) : !error && (
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

function validateTesterName(testerName: string): boolean {
    return testerName.length >= config.testerName.validations.minLength && testerName.length <= config.testerName.validations.maxLength;
}
