import { render } from '@testing-library/react';
import { ArrayResponseFormatter } from '../../../../services/data-formatters/array-response-formatter/array-response.service';

test('array-response-formatter format object into array', () => {
    // arrange
    const arrayResponseFormatter = new ArrayResponseFormatter();

    const input = {
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
            }
        ]
    };

    const expectedOutput = [input];

    // act
    const output = arrayResponseFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});


test('array-response-formatter format array into array', () => {
    // arrange
    const arrayResponseFormatter = new ArrayResponseFormatter();

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
                }
            ]
        }
    ];

    const expectedOutput = input;

    // act
    const output = arrayResponseFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});