# Home Assignment

**Background**

Your goal will be to write a simple UI page that searches for a tester and presents a sorted list of results.

# Assignment

Write an application that will approach a backend to fetch the information about a particular tester.

The page will look as follows:

**Title** :

Search Bugs

**Below** : a text input field. Label: Tester Name, watermark: &quot;Enter the tester name&quot;

**Below** : a button with the label &quot;Fetch&quot;

The text field cannot be empty, the &quot;Fetch&quot; button will be enabled only if the field is filled.

The minimum input length is 2 characters, and maximum input length is 12 characters. The text field will be colored red if violated.

**Search**

- The search request is an HTTPs GET request to the server (see address below), taking 1 input parameter. The input param, **testerName** , represents the first name of the requested tester (case insensitive)
- Invalid requests with no testerName or with wrong URL will return HTTP 4XX error codes
- A valid request is approaching the correct URL with an input param. It will return HTTP 200 code, with the following data:
  - If the requested tester is found, it will return a json object of the following format (example given):
```
{
    firstName: 'xxx',
    lastName: 'yyy',
    country: 'Israel',
    bugs: [
        {
            id: 1,
            title: 'sample bug'
        },
        {
            id: 2,
            title: 'sample bug 2'
        }
    ]
}
```
  - If the requested tester is not found, the response will be empty
  - A special case – where the input is the word &quot;all&quot; (case insensitive), a list of all testers is returned

**Results Display**

Create a results table with the following columns:

First Name, Last Name, Country, Bugs

Follow the below rules:

1. If the response includes an error, display a red error message above the table: &quot;Temporary error occurred, please try again later&quot;
2. If the response is OK, display the results in the table. The &quot;Bugs&quot; column will display a comma-delimited list of the bug titles
3. The table will be sorted by default by tester first name (ascending), and it should be enabled to sort the table by last name or country

**Server URL:**

https://test-api.techsee.me/api/ex/{testerName}