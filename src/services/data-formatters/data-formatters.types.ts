export interface IDataFormatter {
    format(data: any): any;
}

export interface DataFormatter<T, V = T> extends IDataFormatter {
    format(data: T): V;
}
