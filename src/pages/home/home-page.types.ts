export interface Bug {
    id: number;
    title: string
}

export interface TesterData {
    firstName: string;
    lastName: string;
    country: string;
    device: string;
    bugs: Bug[]
}
