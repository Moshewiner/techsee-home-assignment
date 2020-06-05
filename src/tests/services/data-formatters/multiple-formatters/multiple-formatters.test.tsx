import { render } from '@testing-library/react';
import { ArrayResponseFormatter } from '../../../../services/data-formatters/array-response-formatter/array-response.service';
import { BugsFormatter } from '../../../../services/data-formatters/bugs-formatter/bugs-formatter.service';
import { MultipleDataFormatter } from '../../../../services/data-formatters/multiple-formatters/multiple-formatters.service';

test('multiple-formatter format to array and then bugs', () => {
    // arrange
    const arrayResponseFormatter = new ArrayResponseFormatter();
    const bugsFormatter = new BugsFormatter();
    const multipleFormatter = new MultipleDataFormatter([arrayResponseFormatter, bugsFormatter]);

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
            },
            {
                "id": 6,
                "title": "Works only on 2 bugs"
            }
        ]
    };

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
    const output = multipleFormatter.format(input);

    // assert
    expect(output).toStrictEqual(expectedOutput);
});