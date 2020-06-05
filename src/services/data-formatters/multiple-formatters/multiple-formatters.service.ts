import { DataFormatter, IDataFormatter } from './../data-formatters.types';
export class MultipleDataFormatter<T, V = T> implements DataFormatter<T, V> {
    constructor(private formatters: IDataFormatter[]) { }

    format(data: T): V {
        return this.formatters.reduce((currData: unknown, formatter: IDataFormatter) => {
            return formatter.format(currData);
        }, data) as V;
    }
}
