import React, { useEffect, useState, useContext } from 'react';
import { config } from '../../config';
import { TesterData } from './home-page.types';
import { DataFormatterContext } from '../../services/data-formatters/data-formatters.context';
import { ColumnType } from '../../components/table/table.types';
import Table from '../../components/table/table.component';
import './home-page.component.scss';

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
                    className='fetch-button primary-button'
                    disabled={internalTesterName.length === 0}
                    onClick={
                        () => {
                            setRenderedTesterName(internalTesterName);
                        }
                    }
                >
                    Fetch
                </button>
            </div>
            {
                error && <span className='error-container'>`Temporary error occurred, please try again later.`</span>
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
    // return fetch(url, fetchOptions as any).then((r) => r.json());

    return [{ "firstName": "Melisa", "lastName": "Kadosh", "country": "Israel", "device": "iPhone 6", "bugs": [{ "id": 1, "title": "button misplaced" }, { "id": 4, "title": "incorrect home page" }] }, { "firstName": "Lynda", "lastName": "Golumb", "country": "New Zealand", "device": "Huawei P10", "bugs": [{ "id": 2, "title": "device is stuck" }, { "id": 3, "title": "can't load application" }, { "id": 5, "title": "no input validation" }] }, { "firstName": "Artem", "lastName": "Puzailov", "country": "Ukraine", "device": "Galaxy S7", "bugs": [{ "id": 7, "title": "Chrome displays jibberish" }] }, { "firstName": "Rob", "lastName": "Rabbi", "country": "UK", "device": "Xiomi Note 5", "bugs": [{ "id": 11, "title": "invalid text" }, { "id": 21, "title": "shifted display" }, { "id": 13, "title": "mis aligned buttons" }, { "id": 15, "title": "server crash" }] }, { "firstName": "Neved", "lastName": "Dorsell", "country": "Sweden", "device": "Nokia D56", "bugs": [{ "id": 13, "title": "slow loading" }, { "id": 16, "title": "pixeled video" }] }, { "firstName": "Silvi", "lastName": "Rushfeld", "country": "Germany", "device": "LG G5", "bugs": [{ "id": 11, "title": "blank end page" }] }, { "firstName": "Will", "lastName": "Debill", "country": "US", "device": "iPhone X", "bugs": [{ "id": 11, "title": "login stuck" }, { "id": 21, "title": "shifted display" }] }];
}

export function getColumnOfDataRow(row: TesterData): ColumnType {
    return Object.keys(row).map((dataColumn: string) => ({
        Header: dataColumn,
        accessor: dataColumn,
    }));
}

function validateTesterName(testerName: string): boolean {
    return testerName.length >= config.testerName.validations.minLength && testerName.length <= config.testerName.validations.maxLength;
}
