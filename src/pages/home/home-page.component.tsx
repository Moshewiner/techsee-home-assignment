import React, { useEffect, useState, useContext } from 'react';
import { config } from '../../config';
import { TesterData } from './home-page.types';
import { DataFormatterContext } from '../../services/data-formatters/data-formatters.context';
import { ColumnType } from '../../components/table/table.types';
import Table from '../../components/table/table.component';
import './home-page.component.scss';

export default function HomePage() {
    const [renderedTesterName, setRenderedTesterName] = useState('');
    const [internalTesterName, setInternalTesterName] = useState('all');
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
    }, [renderedTesterName, dataFormatter]);

    return (
        <div className='home-page'>
            <h1 className='heading'>Search bugs..</h1>
            <div className='controls-container'>
                <label htmlFor='TesterNameInput'>Tester Name:</label>
                <input
                    id='TesterNameInput'
                    placeholder='Enter the tester name'
                    className={`tester-name-input ${isValidTesterName ? 'valid' : 'error'}`}
                    onChange={
                        (e) => {
                            const testerNameToSearch: string = e.target.value;
                            setInternalTesterName(testerNameToSearch);
                            const isValid: boolean = validateTesterName(internalTesterName)
                            setIsValidTesterName(isValid);
                        }
                    } /><br />
                <button
                    className='fetch-button primary-button'
                    disabled={internalTesterName.length === 0 || !isValidTesterName}
                    onClick={
                        () => {
                            if (isValidTesterName) {
                                setRenderedTesterName(internalTesterName);
                            }
                        }
                    }
                >
                    Fetch
                </button>
            </div>
            {
                error && <span className='error-container'>Temporary error occurred, please try again later.</span>
            }
            {
                data.length > 0 &&
                <Table columns={columns} data={data} initialSortBy={{ columnId: 'firstName' }}></Table>
            }
            {
                data.length === 0 && !error && <span className='loading-container'>Loading..</span>
            }
        </div>
    );
}

async function getBugsByName(name: string = 'all'): Promise<TesterData[]> {
    const fetchOptions = {
        method: 'GET',
    };
    const url: string = `${config.ApiAddress}/${name}`;
    return fetch(url, fetchOptions as any).then((r) => r.json());
}

export function getColumnOfDataRow(row: TesterData): ColumnType {
    return Object.keys(row).map((dataColumn: string) => ({
        Header: `${dataColumn[0].toLocaleUpperCase()}${dataColumn.slice(1)}`,
        accessor: dataColumn,
    }));
}

function validateTesterName(testerName: string): boolean {
    return testerName.length >= config.testerName.validations.minLength && testerName.length <= config.testerName.validations.maxLength;
}
