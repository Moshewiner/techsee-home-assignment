import { MultipleDataFormatter } from './data-formatters/multiple-formatters/multiple-formatters.service';
import { BugsFormatter } from './data-formatters/bugs-formatter/bugs-formatter.service';
import { ArrayResponseFormatter } from './data-formatters/array-response-formatter/array-response.service';
export const Initialize = () => {
    const bugsFormatter = new BugsFormatter();
    const arrayResponseFormatter = new ArrayResponseFormatter();
    const multipleDataFormatter = new MultipleDataFormatter([
        arrayResponseFormatter,
        bugsFormatter,
    ]);

    return {
        bugsFormatter,
        arrayResponseFormatter,
        multipleDataFormatter,
    };
};
