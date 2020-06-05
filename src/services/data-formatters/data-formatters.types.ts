export interface DataFormatter<T> {
    format(data: T): T;
}
