import { BugsFormatter } from './data-formatters/bugs-formatter/bugs-formatter.service';
export const Initialize = () => {
    return {
        bugsFormatter: new BugsFormatter()
    };
};