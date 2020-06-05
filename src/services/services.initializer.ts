import { MultipleDataFormatter } from './data-formatters/multiple-formatters/multiple-formatters.service';
import { BugsFormatter } from './data-formatters/bugs-formatter/bugs-formatter.service';
import { ArrayResponseFormatter } from './data-formatters/array-response-formatter/array-response.service';
import { TesterData } from '../pages/home/home-page.types';

export const Initialize = () => {
    const bugsFormatter = new BugsFormatter();
    const arrayResponseFormatter = new ArrayResponseFormatter();
    const multipleDataFormatter = new MultipleDataFormatter<TesterData | TesterData[], TesterData[]>([
        arrayResponseFormatter,
        bugsFormatter,
    ]);

    //Dependency injection - change this values and all should work with the new functionality
    return {
        dataFormatter: multipleDataFormatter,
    };
};
