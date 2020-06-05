import { render } from '@testing-library/react';
import { BugsFormatter } from '../../../../services/data-formatters/bugs-formatter/bugs-formatter.service';

test('bugs-formatter works with no bugs', () => {
    // arrange
    const bugsFormatter = new BugsFormatter();

    const input = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": []
        }
    ];

    const expectedOutput = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": ""
        }
    ];

    // act
    const output = bugsFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});



test('bugs-formatter works with one bug', () => {
    // arrange
    const bugsFormatter = new BugsFormatter();

    const input = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": [
                {
                    "id": 6,
                    "title": "Can't run several times on the same port"
                }
            ]
        }
    ];

    const expectedOutput = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": "Can't run several times on the same port"
        }
    ];

    // act
    const output = bugsFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});


test('bugs-formatter works with 3 bugs', () => {
    // arrange
    const bugsFormatter = new BugsFormatter();

    const input = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": [
                {
                    "id": 6,
                    "title": "Can't run several times on the same port"
                },
                {
                    "id": 6,
                    "title": "Works only on localhost"
                },
                {
                    "id": 6,
                    "title": "Works only on 2 bugs"
                }
            ]
        }
    ];

    const expectedOutput = [
        {
            "firstName": "Moshe",
            "lastName": "Wainner",
            "country": "Israel",
            "device": "One plus 6",
            "bugs": "Can't run several times on the same port, Works only on localhost, Works only on 2 bugs"
        }
    ];

    // act
    const output = bugsFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});