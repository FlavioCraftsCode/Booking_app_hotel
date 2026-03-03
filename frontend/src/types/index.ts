export interface SearchOptions {
    adult: number;
    children: number;
    room: number;
}

export interface SearchState {
    city: string;
    dates: {
        startDate: Date;
        endDate: Date;
        key: string;
    }[];
    options: SearchOptions;
}