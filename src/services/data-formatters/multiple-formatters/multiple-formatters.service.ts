import { DataFormatter, IDataFormatter } from './../data-formatters.types';
export class MultipleDataFormatter<T, V> implements DataFormatter<T, V> {
    constructor(private formatters: IDataFormatter[]) {}

    format(data: any): any {
        return this.formatters.reduce((currData, formatter) => {
            return formatter.format(currData);
        }, data);
    }
}
