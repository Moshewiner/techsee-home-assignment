import { DataFormatter } from '../data-formatters.types';
import { TesterData } from '../../../pages/home/home-page.types';

export class BugsFormatter implements DataFormatter<TesterData[]> {
    public format(data: TesterData[]): TesterData[] {
        return Object.keys(data).map((rowIndex: string) => {
            const row = data[rowIndex];
            return {
                ...row,
                bugs: row.bugs ? this.formatBugs(row.bugs) : [],
            };
        });
    }

    private formatBugs(bugs): string {
        return bugs.map((bug) => bug.title).join(', ');
    }
}
