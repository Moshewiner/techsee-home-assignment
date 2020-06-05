import { DataFormatter } from '../data-formatters.types';
import { TesterData } from '../../../pages/home/home-page.types';

export class ArrayResponseFormatter
    implements DataFormatter<TesterData | TesterData[], TesterData[]> {
    format(data: TesterData): TesterData[] {
        return Array.isArray(data) ? data : [data];
    }
}
