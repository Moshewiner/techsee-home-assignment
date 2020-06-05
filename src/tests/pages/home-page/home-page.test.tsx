import { render } from '@testing-library/react';
import { getColumnOfDataRow } from './../../../pages/home/home-page.component';

test('column calculated of data correctly', () => {
    // arrange

    const input = {
        "firstName": "Moshe",
        "lastName": "Wainner",
        "country": "Israel",
        "device": "One plus 6",
        "bugs": []
    };

    const expectedOutput = [
        {
            Header: 'firstName',
            accessor: 'firstName',
        },
        {
            Header: 'lastName',
            accessor: 'lastName',
        },
        {
            Header: 'country',
            accessor: 'country',
        },
        {
            Header: 'device',
            accessor: 'device',
        },
        {
            Header: 'bugs',
            accessor: 'bugs',
        }
    ];

    // act
    const output = getColumnOfDataRow(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});